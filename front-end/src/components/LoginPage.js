import React from 'react';
import axios from 'axios';
import Header from './Header';


// Use a simple toggle for Login / SignUp
// Where at bottom we say, if you don't have an account, sign up here
// Form will then link to SignUp page

class LoginPage extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();

        let user = e.target.elements.user.value;
        let password = e.target.elements.password.value;

        let data = {
            "user": user,
            "password": password
        }

        let self = this;

        axios.post('/loginUser', data).then(function(response) {
            if (response.data.error === 0) {
                alert(response.data.message);
                self.props.history.push('/');
            } else {
                alert(response.data.message);
            }
            console.log(response.data);
        }).catch(function(err) {
            console.log("error: " + err);
        });
    }

    render() {
        return (
            <div>
                <Header />
                <hr />
                <h1>Login Here</h1>
                <form onSubmit={this.onSubmit}>
                    <input name="user" placeholder="name"></input>
                    <input name="password" placeholder="password"></input>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;