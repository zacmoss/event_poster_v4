import React from 'react';
import '../style.css';
import EventFeed from './EventFeed';
import axios from 'axios';
import Header from './Header';

class HomePage extends React.Component {

    
    componentDidMount() {
        console.log('rendered');
        axios.get('/testGet').then(function(result) {
            console.log(result.data);
        }).catch(function(err) {
            console.log("error: " + err);
        })
    }
    


    render() {
        return (
            <div>
                <Header />
                <div className="home_page_container">
                    <div className="first_section"></div>
                    <EventFeed />
                    <div className="last_section"></div>
                </div>
            </div>
        )
    }
}

export default HomePage;