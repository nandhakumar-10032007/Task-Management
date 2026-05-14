import { useEffect, useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');



  // FETCH TASKS
  const fetchTasks = async () => {

    const response = await fetch('http://localhost:5000/api/tasks');

    const data = await response.json();

    setTasks(data);
  };



  useEffect(() => {

    fetchTasks();

  }, []);




  // ADD TASK
  const addTask = async () => {

    if (!title) return;

    await fetch('http://localhost:5000/api/tasks', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        title
      })

    });

    setTitle('');

    fetchTasks();
  };




  // DELETE TASK
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/api/tasks/${id}`, {

      method: 'DELETE'

    });

    fetchTasks();
  };




  // UPDATE STATUS
  const updateStatus = async (id) => {

    await fetch(`http://localhost:5000/api/tasks/${id}`, {

      method: 'PUT'

    });

    fetchTasks();
  };




  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.heading}>
          Task Manager
        </h1>



        <div style={styles.inputContainer}>

          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                        task.status === 'Completed'
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
                  onClick={() => updateStatus(task._id)}
                  style={styles.updateButton}
                >
                  Change Status
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
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

  container: {

    minHeight: '100vh',

    background: 'linear-gradient(to right, #141e30, #243b55)',

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

    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },



  heading: {

    textAlign: 'center',

    marginBottom: '30px',

    color: '#243b55',

    fontSize: '40px'
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

    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
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