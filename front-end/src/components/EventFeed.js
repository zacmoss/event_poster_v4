import React from 'react';
import axios from 'axios';

class EventFeed extends React.Component {
    state = {
        array: undefined
    }
    
    componentWillMount() {
        axios.get('/eventFeed').then(response => {
            
        // below must have key for generated ('iterated') data which is returned
        let mapArray = response.data.map(function(ele) {
            return (
                <div key={ele._id}><p>{ele.title}</p>
                <p>{ele.location}</p>
                <p>{ele.description}</p></div>
            );
        });
           
        this.setState(() => ({ array: mapArray }));

        });
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