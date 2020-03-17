import React, { Component } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import logo from './assets/images/react.png';
import './header.css';
import Auth from './auth';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
        this.dashboard=this.dashboard.bind(this);
    }

    login(){
        Auth.authenticate('login');
    }
    logout() {
        Auth.signout();
    }
    dashboard() {
        Auth.authenticate('dashboard');
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">
                <img src={logo} width="40" height="30"/>React
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav nav-pills mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={this.dashboard} to="/dashboard">Dashboard</Link>
                        </li>
                        
                    </ul>
                    <span className="navbar-text m-r-20">
                        <Link to="/login" onClick={this.login}>Login</Link>
                    </span>
                    <span className="navbar-text">
                        <Link to="/" onClick={this.logout}>Logout</Link>
                    </span>
                </div>
            </nav>
        )
    }
}

export default Header;