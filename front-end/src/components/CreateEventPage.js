import React from 'react';
import axios from 'axios';


// Need to redirect to Event Feed or clear inputs after submit

class CreateEventPage extends React.Component {

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