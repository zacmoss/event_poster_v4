import React from 'react';
import axios from 'axios';


// Use a simple toggle for Login / SignUp
// Where at bottom we say, if you already have an account, login here
// Form will then link to Login page

// Need to sanitize the inputs here
// If no user or password or confirmed password, error message

// Need to redirect to HomePage with User id after submit

class SignUpPage extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();

        let user = e.target.elements.user.value;
        let password = e.target.elements.password.value;

        let data = {
            "user": user,
            "password": password
        }
        console.log(data);
        
        if (password == e.target.elements.confirm.value) {
            axios.post('/createUser', data).then(function(response) {
                console.log("response: " + response.data);
                alert(response.data);
            }).catch(function(err) {
                console.log("error: " + err);
            })
        } else {
            alert('Passwords do not match');
        }
        
    }

    render() {
        return (
            <div>
                <h1>Sign Up Here</h1>
                <form onSubmit={this.onSubmit}>
                <input name="user" placeholder="name" required></input>
                <input name="password" placeholder="password" required></input>
                <input name="confirm" placeholder="confirm password" required></input>
                <button>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUpPage;