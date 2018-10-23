import React from 'react';
import EventFeed from './EventFeed';
//import axios from 'axios';
import Header from './Header';

class HomePage extends React.Component {

    /*
    componentDidMount() {
        console.log('rendered');
        axios.get('/getSignedIn').then(function(result) {
            console.log(result.data);
        }).catch(function(err) {
            console.log("error: " + err);
        })
    }
    */

    render() {
        return (
            <div>
                <Header />
                <hr />
                <h1>Home Page</h1>
                <EventFeed />
            </div>
        )
    }
}

export default HomePage;