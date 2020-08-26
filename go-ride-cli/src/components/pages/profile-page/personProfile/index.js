import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../../../pages/events-page/event-list';
import EventService from '../../../../services/UserService';
//Boostrap
import { Button, Row} from 'react-bootstrap';
import "./profile.css"
class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: undefined
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => this.updateEventList()
    updateEventList = () => this.getProfileUserEvents(this.props.paramId)
    getProfileUserEvents = userId => {
        this.eventService.
            getAllEventsUser(userId)
                .then(response => this.setState({ events: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId;
    filterEvents = role =>
        !this.state.events ? null : role === "owner" ?
        this.state.events.filter(event => event.owner === this.props.paramId) :
        this.state.events.filter(event => event.participants.includes(this.props.paramId) && event.owner !== this.props.paramId)
    
    render() {
        return (
            <>
                {!this.props.loggedInUser ? <h2>Loading</h2> :
                    <section className="general-info">
                        <div className="age-genre-cont">
                            <p className="profile-data"><span className="color-text">Age: </span>{this.props.userDetails.personDetails.age || "?"}</p>
                            <p className="profile-data" ><span className="color-text">Genre: </span>{this.props.userDetails.personDetails.genre || "?"}</p>
                        </div>
                        <hr></hr>
                        <article className="event-section">
                            <h3> Joined events </h3>
                            <EventList loggedInUser={this.props.loggedInUser} updateEventList={this.updateEventList} {...this.props} events={this.filterEvents("participant")} paramId={this.props.paramId} />
                            <h3> Created events </h3>    
                            <EventList loggedInUser={this.props.loggedInUser} updateEventList={this.updateEventList} {...this.props} events={this.filterEvents("owner")} paramId={this.props.paramId} />
                        </article>
                        < article className = "main-button-container" >
                                {this.isUserTheProfileOwner() && 
                                    <>
                                        <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                                        <Link to={`/user/${this.props.loggedInUser._id}/event/create`} ><Button variant="dark" type="submit">Create a new event!</Button></Link>
                                        <Link to={`/profile/${this.props.loggedInUser._id}/calendar`} ><Button variant="dark" type="submit">See your calendar</Button></Link>
                                    </>
                            }
                        </article>
                    </section>
                }
            </>
        )
    }
}

export default Profile