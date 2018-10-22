import React from 'react';


// Use a simple toggle for Login / SignUp
// Where at bottom we say, if you don't have an account, sign up here
// Form will then link to SignUp page

class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <h1>Login Here</h1>
                <input placeholder="name"></input>
                <input placeholder="password"></input>
                <button>Login</button>
            </div>
        )
    }
}

export default LoginPage;