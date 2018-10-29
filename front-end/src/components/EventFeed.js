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

                // below must have key for generated ('iterated') data which is returned
                let mapArray = response.data.array.map(function(ele) {

                    let dotOne = {
                        "color": "white",
                        "title": "this is a test"
                    }
                    let dotTwo = {
                        "color": "white",
                        "title": "this is a test"
                    }

                    // if response.data.array.going.length > 0
                    // if response.data.array.interested.length > 0
                    // map through ele.interested and ele.going
                    // if val === ele._id color = yellow or green
                    //if ()
                    return (
                        <div className="event_container" key={ele._id}><p>{ele.title}</p>
                        <p>{ele.location}</p>
                        <p>{ele.description}</p>
                        {response.data.loggedIn && <DotOne message=" test" eventId={ele._id} />/*<p><span className="dot" style={{backgroundColor: dotOne.color}} title={dotOne.title}></span></p>*/}
                    {response.data.loggedIn && <DotTwo />/*<p><span className="dot" style={{backgroundColor: dotTwo.color}} title={dotTwo.title}></span></p>*/}</div>
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