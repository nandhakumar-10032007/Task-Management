import {
  useEffect,
  useState,
  useCallback
} from 'react';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const [token, setToken] = useState(
    localStorage.getItem('token')
  );

  const [showRegister, setShowRegister] =
    useState(false);

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');



  // ================= FETCH TASKS =================

  const fetchTasks = useCallback(async () => {

    if (!token) return;

    const response = await fetch(
      'https://task-management-8k74.onrender.com/api/tasks',
      {

        headers: {
          Authorization: token
        }

      }
    );

    const data = await response.json();

    setTasks(data);

  }, [token]);



  useEffect(() => {

    fetchTasks();

  }, [fetchTasks]);




  // ================= ADD TASK =================

  const addTask = async () => {

    if (!title) return;

    await fetch(
      'https://task-management-8k74.onrender.com/api/tasks',
      {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

          Authorization: token

        },

        body: JSON.stringify({
          title
        })

      }
    );

    setTitle('');

    fetchTasks();
  };




  // ================= DELETE TASK =================

  const deleteTask = async (id) => {

  await fetch(
    `https://task-management-8k74.onrender.com/api/tasks/${id}`,
    {

      method: 'DELETE',

      headers: {

        Authorization: token

      }

    }
  );

  fetchTasks();
};


  // ================= UPDATE STATUS =================

  const updateStatus = async (id) => {

  await fetch(
    `https://task-management-8k74.onrender.com/api/tasks/${id}`,
    {

      method: 'PUT',

      headers: {

        Authorization: token

      }

    }
  );

  fetchTasks();
};

  // ================= LOGOUT =================

  const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    setToken(null);

    window.location.reload();
  };




  // ================= AUTH PAGE =================

  if (!token) {

    return (

      <div style={styles.authContainer}>

        <div style={styles.authCard}>

          {showRegister ? (

            <>

              <Register />

              <div style={styles.bottomSwitch}>

                <p style={styles.bottomText}>
                  Already have an account?
                </p>

                <button
                  style={styles.bottomButton}
                  onClick={() =>
                    setShowRegister(false)
                  }
                >
                  Login
                </button>

              </div>

            </>

          ) : (

            <>

              <Login />

              <div style={styles.bottomSwitch}>

                <p style={styles.bottomText}>
                  Don't have an account?
                </p>

                <button
                  style={styles.bottomButton}
                  onClick={() =>
                    setShowRegister(true)
                  }
                >
                  Create Account
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    );
  }




  // ================= TASK PAGE =================

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <div style={styles.topBar}>

          <h1 style={styles.heading}>
            Task Manager
          </h1>

          <button
            onClick={logout}
            style={styles.logoutButton}
          >
            Logout
          </button>

        </div>



        <div style={styles.inputContainer}>

          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            style={styles.input}
          />

          <button
            onClick={addTask}
            style={styles.addButton}
          >
            Add Task
          </button>

        </div>




        <div style={styles.taskList}>

          {tasks.map((task) => (

            <div
              key={task._id}
              style={styles.taskCard}
            >

              <div>

                <h2 style={styles.taskTitle}>
                  {task.title}
                </h2>

                <p style={styles.taskStatus}>

                  Status:

                  <span
                    style={{

                      color:
                        task.status ===
                        'Completed'
                          ? 'green'
                          : 'orange',

                      marginLeft: '8px',

                      fontWeight: 'bold'
                    }}
                  >
                    {task.status}
                  </span>

                </p>
              </div>




              <div style={styles.buttonGroup}>

                <button
                  onClick={() =>
                    updateStatus(task._id)
                  }
                  style={styles.updateButton}
                >
                  Change Status
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  style={styles.deleteButton}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}



const styles = {

  authContainer: {

    minHeight: '100vh',

    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    background:
      'linear-gradient(to right, #141e30, #243b55)',

    padding: '20px'
  },



  authCard: {

    width: '100%',

    maxWidth: '500px',

    display: 'flex',

    flexDirection: 'column',

    alignItems: 'center'
  },



  bottomSwitch: {

    marginTop: '20px',

    display: 'flex',

    flexDirection: 'column',

    alignItems: 'center',

    gap: '10px'
  },



  bottomText: {

    color: 'white',

    margin: 0,

    fontSize: '16px'
  },



  bottomButton: {

    padding: '10px 25px',

    border: 'none',

    borderRadius: '10px',

    backgroundColor: '#ffc107',

    color: '#000',

    fontWeight: 'bold',

    cursor: 'pointer',

    fontSize: '15px'
  },



  container: {

    minHeight: '100vh',

    background:
      'linear-gradient(to right, #141e30, #243b55)',

    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    padding: '30px'
  },



  card: {

    width: '100%',

    maxWidth: '900px',

    backgroundColor: '#ffffff',

    borderRadius: '20px',

    padding: '30px',

    boxShadow:
      '0 10px 30px rgba(0,0,0,0.3)'
  },



  topBar: {

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: '30px'
  },



  heading: {

    color: '#243b55',

    fontSize: '40px',

    margin: 0
  },



  logoutButton: {

    padding: '10px 20px',

    border: 'none',

    borderRadius: '10px',

    backgroundColor: '#dc3545',

    color: 'white',

    cursor: 'pointer'
  },



  inputContainer: {

    display: 'flex',

    gap: '15px',

    marginBottom: '30px'
  },



  input: {

    flex: 1,

    padding: '15px',

    borderRadius: '10px',

    border: '1px solid #ccc',

    fontSize: '16px',

    outline: 'none'
  },



  addButton: {

    padding: '15px 25px',

    backgroundColor: '#243b55',

    color: 'white',

    border: 'none',

    borderRadius: '10px',

    cursor: 'pointer',

    fontSize: '16px',

    fontWeight: 'bold'
  },



  taskList: {

    display: 'flex',

    flexDirection: 'column',

    gap: '20px'
  },



  taskCard: {

    backgroundColor: '#f5f7fa',

    padding: '20px',

    borderRadius: '15px',

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'center',

    boxShadow:
      '0 5px 15px rgba(0,0,0,0.1)'
  },



  taskTitle: {

    margin: 0,

    color: '#243b55'
  },



  taskStatus: {

    marginTop: '10px',

    color: '#555'
  },



  buttonGroup: {

    display: 'flex',

    gap: '10px'
  },



  updateButton: {

    padding: '10px 15px',

    backgroundColor: '#28a745',

    color: 'white',

    border: 'none',

    borderRadius: '8px',

    cursor: 'pointer'
  },



  deleteButton: {

    padding: '10px 15px',

    backgroundColor: '#dc3545',

    color: 'white',

    border: 'none',

    borderRadius: '8px',

    cursor: 'pointer'
  }

};

export default App;