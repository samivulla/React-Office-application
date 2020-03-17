import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Login from './login';
import Dashboard from './dashboard';
import Home from './home';
import Auth from './auth';
import AddNewItem from './addNewItem';
import Maps from './maps';
import Highcharts from './highcharts';
import Fileupload from './fileupload';
import SideNav from './sidenav';
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/"
                        }}
                    />
                )
        }
    />
);

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                {/* <chart-controller ref="hg38" title-text="Genome Browser" group-id-list='["genes","interaction"]'></chart-controller> */}
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        {/* <PrivateRoute path="/protected" component={Protected} />
                        <Route exact path="/dashboard" component={Dashboard} /> */}
                        <Route exact path="/login" component={Login} />
                        <Route exact path='/addItem' component={AddNewItem} />
                        <Route exact path='/maps' component={Maps} />
                        <Route exact path='/highcharts' component={Highcharts} />
                        <Route exact path='/fileupload' component={Fileupload} />
                        <Route exact path='/sidenav' component={SideNav} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
