import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
    <div>
        <h1>Header</h1>
        <Link to="/">Home</Link>
        <Link to="/login">Login / SignUp</Link>
    </div>
);

export default Header;