import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
    <div>
        <h1>Header</h1>
        <Link to="/login" onClick={this.handleClick}>Articles</Link>
    </div>
);

export default Header;