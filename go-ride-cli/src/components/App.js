import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from "../services/AuthService";
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from "./pages/auth-page";
import NavBar from "./ui/NavBar";
import ProfilePage from "./pages/profile-page";
import PersonEdit from "./pages/profile-page/personProfile/person-form";
import EventForm from './pages/event-page/event-form'
import EventsPage from './pages/events-page'
import EventDetails from './pages/events-page/event-list';
import CalendarPage from "./pages/calendar-page";

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
    isTheUserAllowed = (userAllowedId) => this.state.loggedInUser && this.state.loggedInUser._id === userAllowedId
    fetchUser = () => {
        this.AuthService
            .isLoggedIn()
            .then(response => {
                this.state.loggedInUser === null && this.setState({ loggedInUser: response.data })
            })
            .catch(err => console.log({err}))
    }
    render() {
        this.fetchUser()
        return (
            <>
                <NavBar loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />
                <Switch>
                    
                    <Route path="/signup" render={props => <AuthPage setTheUser={this.setTheUser} {...props} />}></Route>
                    <Route path="/login" render={props => <AuthPage setTheUser={this.setTheUser} {...props} />}></Route>

                    <Route exact path="/user/:id/event/create" render={props => this.state.loggedInUser && this.isUserAllowed(this.state.loggedInUser._id, props.match.params.id)? <EventForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} /> : <Redirect to='/login' />} />
                    <Route exact path="/user/:id/event/edit/:eventId" render={props => this.state.loggedInUser ? <EventForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} /> : <Redirect to='/login' />} />
                    <Route exact path="/events" render={props => <EventsPage loggedInUser={this.state.loggedInUser} {...props} />} />
                    <Route exact path="/user/:userId/events/:eventId" render={props => <EventDetails loggedInUser={this.state.loggedInUser} {...props} />} />
                    
                    <Route path="/profile/edit/:id" render={props => this.isTheUserAllowed (props.match.params.id) ? <PersonEdit setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to='/login' />}></Route>
                    <Route path="/profile/:userId/calendar" render={props => <CalendarPage  loggedInUser={this.state.loggedInUser} {...props} /> } />
                    <Route exact path="/profile/:userId" render={props => this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to="/login" />} />

                </Switch>

            </>
        )
    }
}
export default App;