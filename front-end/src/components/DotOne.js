import React from 'react';
import '../style.css';

class DotOne extends React.Component {
    constructor(props) {
        super(props);
        
        /*
        this.state = {
            eventId: props.eventId
        }
        */
    }

    render() {
        return (
            <div>
                <p onClick={this.handler}><span className="dot"></span>Interested{this.props.eventId}</p>
            </div>
        )
    }

    /* on click, get user id
        get this event id from hoc
        check if user events array contains this event id
        if so, make color green or yellow and highlight interested or going
    */
    handler() {
        // works
        alert('test');
        /*
        axios.post('/interestedCheck', data).then(function(response) {
            console.log("response: " + response.data);
            alert(response.data.title);
            self.props.history.push('/');
        }).catch(function(err) {
            console.log("error: " + err);
        })
        */
    }
}

export default DotOne;