import React from 'react';
import '../style.css';
import axios from 'axios';

/* 
    get this event id from hoc
    check if user user array contains this event id (on server)
    if so, make color green or yellow and highlight interested or going
*/

class DotOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "transparent"
        }
    }
    componentWillMount() {
        if (this.props.onOff) {
            this.setState(() => ({backgroundColor: "yellow"}));
        }
    }
    render() {
        return (
            <div>
                <p><span className="dot" style={{backgroundColor: this.state.backgroundColor}} onClick={this.state.backgroundColor === "yellow" ? () => this.turnOff(this.props.eventId) : () => this.turnOn(this.props.eventId)}></span> Interested</p>
            </div>
        )
    }

    turnOn(eventId) {
        let data = {
            "eventId": eventId
        }
        axios.post('/interested', data).then(function(result) {
            console.log(result);
        })
        this.setState(() => ({backgroundColor: "yellow"}));
    }
    turnOff(eventId) {
        let data = {
            "eventId": eventId
        }
        axios.post('/notInterested', data).then(function(result) {
            console.log(result);
        })
        this.setState(() => ({backgroundColor: "transparent"}));
    }
}

export default DotOne;