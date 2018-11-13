import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style.css';
import DotOne from './DotOne';
import DotTwo from './DotTwo';
//import convertDate from '../dateConverter';
import sortEvents from '../functions/sortEvents';

class EventFeed extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            array: undefined,
            signedIn: undefined,
            feed: "all",
            eventCount: 0
        }
        this.allFilterHandler = this.allFilterHandler.bind(this);
        this.interestedFilterHandler = this.interestedFilterHandler.bind(this);
        this.goingFilterHandler = this.goingFilterHandler.bind(this);
    }

    componentWillMount() {
        //testFunc("2012-01-11");
        let self = this;
        // get signIn variable stored on server
        axios.get('/getSignedInVar').then(function(result) {

            console.log(result.data);
            if (result.data.signedIn === true) {
                self.setState(() => ({ signedIn: true }));
            } else {
                self.setState(() => ({ signedIn: false }));
            }
            
           self.renderEvents();

        }).catch(function(err) {
            console.log("error: " + err);
        })

        
    }
    
    renderEvents() {
        let self = this;
        // get signIn variable stored on server
        axios.get('/getSignedInVar').then(function(result) {

            if (result.data.signedIn === true) {
                self.setState(() => ({ signedIn: true }));
            } else {
                self.setState(() => ({ signedIn: false }));
            }
            
            axios.get('/eventFeed').then(response => {
                // in server check if user signedIn, if so send back user's 
                // going and interested array
                // interested at response.interested
                // going at response.going
                
                // below must have key for generated ('iterated') data which is returned
                let eventCount = 0;
                let newArray = sortEvents(response.data.array);
                //let mapArray = response.data.array.map(function(ele) {
                let mapArray = newArray.map(function(ele) {

                    let displayEvent = true;
                    //let date = convertDate(ele.date);

                    let dotOne = {
                        "onOff": false
                    }
                    let dotTwo = {
                        "onOff": false
                    }

                    // iterate through response.interested
                    // if val === ele._id then dotOne.onOff = true
                    if (response.data.interested && response.data.interested.length > 0) {
                        let i = 0;
                        for (i = 0; i < response.data.interested.length; i++) {
                            if (response.data.interested[i] === ele._id) {
                                dotOne.onOff = true;
                            }
                        }
                    }
                    if (response.data.going && response.data.going.length > 0) {
                        let i = 0;
                        for (i = 0; i < response.data.going.length; i++) {
                            if (response.data.going[i] === ele._id) {
                                dotTwo.onOff = true;
                            }
                        }
                    }
                    
                    if (self.state.feed === "interested") {
                        if (dotOne.onOff === false) {
                            displayEvent = false;
                            //console.log('display switch to false');
                        }
                    }
                    if (self.state.feed === "going") {
                        if (dotTwo.onOff === false) {
                            displayEvent = false;
                        }
                    }
                    
                    if (displayEvent === true) {
                        eventCount += 1;
                        return (
                            <div className="event_container" key={ele._id}>
                            <div className="row">
                                <div className="event_top_left_space">
                                <p className="event_title">{ele.title}</p>
                                </div>
                                <div className="event_top_right_space">
                                    {response.data.loggedIn && <DotOne onOff={dotOne.onOff} eventId={ele._id} />}
                                    {response.data.loggedIn && <DotTwo onOff={dotTwo.onOff} eventId={ele._id} />}
                                </div>
                            </div>
                            
                            <p>{ele.description}</p>
                            <p>{ele.location}<span>|</span>{ele.time}<span>|</span>{ele.date}</p>
                            </div>
                        );
                    } else {
                        return null;
                    }
                });
                
                self.setState(() => ({ array: mapArray, eventCount: eventCount }));
        
            }); // for request 'eventFeed'
        }).catch(function(err) { // for request 'getSignedInVar'
            console.log("error: " + err);
        })
    }
    
    render() {
        return (
            <div className="mid_section">
                <h2>Upcoming Events</h2>
                {this.state.signedIn && <div className="event_feed_tab_container">
                    
                        <span className="tab" style={{color: this.state.feed === "all" ? "black" : "rgba(100, 100, 100, .4)"}} onClick={this.allFilterHandler}>All</span>
                        <span className="interestedTab" style={{color: this.state.feed === "interested" ? "black" : "rgba(100, 100, 100, .4)"}} onClick={this.interestedFilterHandler} title="Only show events you're interested in">Interested</span>
                        <span className="tab" style={{color: this.state.feed === "going" ? "black" : "rgba(100, 100, 100, .4)"}} onClick={this.goingFilterHandler} title="Only show events you're going to">Going</span>
                    
                </div>}
                {!this.state.signedIn && <Link className="message_link" to="/login"><p className="message">Sign in to access more features.</p></Link>}
                {this.state.eventCount === 0 && <div className="event_container"><p style={{textAlign: "center"}}>No events to show</p></div>}
                <div className="events_array"><div>{this.state.array}</div></div>
                
            </div>
        )
    }

    allFilterHandler() {
        this.setState(() => ({feed: "all"}));
        this.renderEvents();
    }
    interestedFilterHandler() {
        this.setState(() => ({feed: "interested"}));
        this.renderEvents();
    }
    goingFilterHandler() {
        this.setState(() => ({feed: "going"}));
        this.renderEvents();
    }
}

export default EventFeed;