import { useState } from 'react';

function Register() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');



  const handleRegister = async () => {

    try {

      const response = await fetch(
        'http://localhost:5000/api/register',
        {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            name,
            email,
            password

          })

        }
      );



      const data = await response.json();

      console.log(data);



      if (response.ok) {

        alert('Registration Successful');

      } else {

        alert(data.message || 'Registration Failed');

      }

    } catch (error) {

      console.log(error);

      alert('Server Error');

    }

  };



  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        Create Account 🚀
      </h1>

      <p style={styles.subtitle}>
        Register to continue
      </p>



      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />



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
        onClick={handleRegister}
        style={styles.button}
      >
        Register
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

export default Register;