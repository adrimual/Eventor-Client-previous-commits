import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../services/AuthService";
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthForm from "./auth-form";
import NavBar from "./ui/NavBar";
import ProfilePage from "./profile";
import PersonEdit from "./profile/personProfile/person-form";
import PersonProfile from './profile/personProfile'

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
                this.state.loggedInUser === null && this.setState({ loggedInUser: response.data })
            })
            .catch(err => console.log({err}))
    }
    personProfile = () => {
        this.PersonService
            .getPersonDetails(this.props.loggedInUser.personDetails)
            .then()
    }
    render() {
        this.fetchUser()
        return (
            <>
                <NavBar loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />
                <hr></hr>
                <Switch>
                    <Route path="/signup" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
                    <Route path="/login" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
                    <Route path="/profile/edit/:userId" render={props => this.state.loggedInUser ? <PersonEdit setTheUser={this.state.loggedInUsert} {...props} />: <Redirect to='/signup' />}></Route>
                    <Route path="/profile" render={() => this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} /> : <Redirect to='/signup' />} />
                </Switch>

            </>
        )
    }
}
export default App;