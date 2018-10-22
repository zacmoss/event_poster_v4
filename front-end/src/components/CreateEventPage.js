import React from 'react';
import axios from 'axios';

class CreateEventPage extends React.Component {
    
  
    //this.handleOutsideClick = this.handleOutsideClick.bind(this);
  
    /*
    state = {
        title: undefined,
        location: undefined,
        description: undefined
    };
    */

    onSubmit = (e) => {
        e.preventDefault();

        let title = e.target.elements.title.value;
        let location = e.target.elements.location.value;
        let description = e.target.elements.description.value;

        let data = {
            "title": title,
            "location": location,
            "description": description
        }

        axios.post('/createEvent', data).then(function(response) {
            console.log("response: " + response.data);
            alert(response.data.title);
        }).catch(function(err) {
            console.log("error: " + err);
        })


    
        /*
        this.setState(() => ({ 
            title: 'test title',
            location: 'test location',
            description: 'test description'
        }));
        */
    }
    

    render() {
        return (
            <div>
                <h1>Create Event</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Title</label>
                    <input name="title" placeholder="Enter a title"></input>
                    <label>Location</label>
                    <input name="location" placeholder="Enter a location"></input>
                    <label>Description</label>
                    <input name="description" placeholder="Description"></input>
                    <button>A button</button>
                </form>
            </div>
        )
    }
}

export default CreateEventPage;