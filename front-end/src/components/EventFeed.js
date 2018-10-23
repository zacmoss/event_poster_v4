import React from 'react';
import axios from 'axios';

class EventFeed extends React.Component {
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
                // below must have key for generated ('iterated') data which is returned
                let mapArray = response.data.map(function(ele) {
                    return (
                        <div key={ele._id}><p>{ele.title}</p>
                        <p>{ele.location}</p>
                        <p>{ele.description}</p></div>
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
            <div>
                <h1>Event Feed</h1>
                <div>{this.state.array}</div>
            </div>
        )
    }
}

export default EventFeed;