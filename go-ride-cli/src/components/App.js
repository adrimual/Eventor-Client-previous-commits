import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../services/AuthService";
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthForm from "./auth-form";
import NavBar from "./ui/NavBar";
import ProfilePage from "./profile";
import PersonEdit from "./editPersonProfile";
import PersonProfile from "./personProfile";
class App extends Component {
    constructor() {
        super()
        this.state = {
            loggedInUser: null,
        }
        this.AuthService = new AuthService()
    }
    setTheUser = user => {
        this.setState({ loggedInUser: user }, () => this.state)
    }
    fetchUser = () => {
        this.AuthService
            .isLoggedIn()
            .then(response => {
                this.state.loggedInUser === null && this.setState({loggedInUser: response.data})
            })
            .catch(err => console.log({err}))
    }
    render() {
        this.fetchUser()
        return (
            <>
                <NavBar loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/>
                <Switch>
                    <Route path="/signup" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
                    <Route path="/login" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
                    <Route exact path="/person/profile" render={props => <PersonProfile loggedUser={this.setState.loggedInUser} />}></Route>
                    <Route exact path="/person/profile/edit" render={props => <PersonEdit loggedUser={this.setState.loggedInUser} />}></Route>
                </Switch>

            </>
        )
    }
}
export default App;