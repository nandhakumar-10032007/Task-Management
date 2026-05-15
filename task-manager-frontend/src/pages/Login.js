import { useState } from 'react';

function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');



  const handleLogin = async () => {

    try {

      const response = await fetch(
        'https://task-management-8k74.onrender.com/api/login',
        {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            email,
            password

          })

        }
      );



      const data = await response.json();

      console.log(data);



      if (response.ok) {

        localStorage.setItem(
          'token',
          data.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );

        alert('Login Successful');

        window.location.reload();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert('Login Failed');

    }

  };



  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Welcome Back 👋
      </h1>

      <p style={styles.subtitle}>
        Login to continue
      </p>



      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />



      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />



      <button
        onClick={handleLogin}
        style={styles.button}
      >
        Login
      </button>

    </div>

  );
}



const styles = {

  container: {

    width: '100%',

    backgroundColor: 'white',

    padding: '50px',

    borderRadius: '20px',

    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',

    display: 'flex',

    flexDirection: 'column',

    gap: '20px',

    boxSizing: 'border-box'
  },



  title: {

    textAlign: 'center',

    color: '#243b55',

    margin: 0,

    fontSize: '45px'
  },



  subtitle: {

    textAlign: 'center',

    color: 'gray',

    marginBottom: '20px',

    fontSize: '18px'
  },



  input: {

    padding: '18px',

    borderRadius: '12px',

    border: '1px solid #ccc',

    fontSize: '17px',

    outline: 'none',

    backgroundColor: '#f1f5f9'
  },



  button: {

    padding: '18px',

    borderRadius: '12px',

    border: 'none',

    backgroundColor: '#243b55',

    color: 'white',

    fontSize: '18px',

    fontWeight: 'bold',

    cursor: 'pointer'
  }

};

export default Login;