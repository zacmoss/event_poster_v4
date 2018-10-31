import React from 'react';
import '../style.css';
import axios from 'axios';

class DotTwo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "transparent"
        }
    }
    componentWillMount() {
        if (this.props.onOff) {
            this.setState(() => ({backgroundColor: "green"}));
        }
    }
    render() {
        return (
            <div>
                <p><span className="dot" style={{backgroundColor: this.state.backgroundColor}} onClick={this.state.backgroundColor === "green" ? () => this.turnOff(this.props.eventId) : () => this.turnOn(this.props.eventId)}></span> Going</p>
            </div>
        )
    }

    turnOn(eventId) {
        let data = {
            "eventId": eventId
        }
        axios.post('/going', data).then(function(result) {
            console.log(result);
        })
        this.setState(() => ({backgroundColor: "green"}));
    }
    turnOff(eventId) {
        let data = {
            "eventId": eventId
        }
        axios.post('/notGoing', data).then(function(result) {
            console.log(result);
        })
        this.setState(() => ({backgroundColor: "transparent"}));
    }
}

export default DotTwo;