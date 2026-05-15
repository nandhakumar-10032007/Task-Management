import { useState } from 'react';

function Login() {

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');



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



            const data =
                await response.json();

            console.log(data);



            if (data.token) {

                localStorage.setItem(
                    'token',
                    data.token
                );

                localStorage.setItem(
                    'user',
                    JSON.stringify(data.user)
                );

                alert('Login Success');

                window.location.reload();

            } else {

                alert(
                    data.message ||
                    'Login Failed'
                );

            }

        } catch (error) {

            console.log(error);

            alert('Server Error');

        }

    };



    return (

        <div style={styles.container}>

            <h1 style={styles.heading}>
                Welcome Back 👋
            </h1>

            <p style={styles.subheading}>
                Login to continue
            </p>



            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                style={styles.input}
            />



            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
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

        padding: '40px',

        borderRadius: '20px',

        boxShadow:
            '0 10px 30px rgba(0,0,0,0.2)',

        display: 'flex',

        flexDirection: 'column',

        gap: '20px'
    },



    heading: {

        margin: 0,

        color: '#243b55',

        textAlign: 'center',

        fontSize: '45px'
    },



    subheading: {

        margin: 0,

        textAlign: 'center',

        color: '#666',

        fontSize: '20px'
    },



    input: {

        padding: '18px',

        borderRadius: '12px',

        border: '1px solid #ccc',

        fontSize: '17px',

        outline: 'none',

        backgroundColor: '#f5f7fa'
    },



    button: {

        padding: '18px',

        border: 'none',

        borderRadius: '12px',

        backgroundColor: '#243b55',

        color: 'white',

        fontSize: '18px',

        fontWeight: 'bold',

        cursor: 'pointer'
    }

};

export default Login;