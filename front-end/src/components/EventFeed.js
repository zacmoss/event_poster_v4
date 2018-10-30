import React from 'react';
import axios from 'axios';
import '../style.css';
import DotOne from './DotOne';
import DotTwo from './DotTwo';

class EventFeed extends React.Component {
    /*
    constructor(props) {
        super(props);

        this.state = {
            array: undefined,
            signedIn: undefined
        }

       this.interestedHandler = this.interestedHandler.bind(this);
       this.goingHandler = this.goingHandler.bind(this);

    }
    */
    
    state = {
        array: undefined,
        signedIn: undefined
    }
    
    
    componentWillMount() {
        let self = this;
        // get signIn variable stored on server
        axios.get('/getSignedInVar').then(function(result) {

            console.log(result.data);
            if (result.data === true) {
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
                let mapArray = response.data.array.map(function(ele) {

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

                    // map through response.going
                    // if val === ele._id then dotTwo.onOff = true
                    
                    return (
                        <div className="event_container" key={ele._id}><p>{ele.title}</p>
                        <p>{ele.location}</p>
                        <p>{ele.description}</p>
                        {response.data.loggedIn && <DotOne onOff={dotOne.onOff} eventId={ele._id} />}
                        {response.data.loggedIn && <DotTwo onOff={dotTwo.onOff} eventId={ele._id} />}</div>
                    );
                });
                   
                self.setState(() => ({ array: mapArray }));
        
            });
        }).catch(function(err) {
            console.log("error: " + err);
        })

        
    }
    render() {
        return (
            <div className="mid_section">
                <h2>Event Feed</h2>
                <div>{this.state.array}</div>
            </div>
        )
    }
}

export default EventFeed;