import React from 'react';
import '../style.css';
import axios from 'axios';
import Header from './Header';


// Not anywhere near complete and subject to a reorganization which will
// include it on the event feed page

class SearchResultsPage extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className="home_page_container">
                    <div className="mid_section">
                    <h2>Search Results</h2>
                        
                        {!this.state.signedIn && <p className="message"><Link className="message_link" to="/login">Sign in</Link> to access more features.</p>}
                        {this.state.eventCount === 0 && <div className="event_container"><p style={{textAlign: "center"}}>No events to show</p></div>}
                        <div className="events_array"><div>{this.state.array}</div></div>
                        <div className="message_bottom">
                            <p>Showing {this.state.eventCount} events out of {this.state.totalEvents} total events. 
                            {this.state.previousButton ? <span className="next_button" onClick={this.previousHandler}>&#x3c; Previous</span> : null}
                                {this.state.nextButton ? <span className="next_button" onClick={this.nextHandler}>Next &#x3e;</span> : null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResultsPage;