import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../../../pages/events-page/event-list';
import EventService from '../../../../services/UserService';
import UserService from "../../../../services/UserService";
import UiModal from "../../../ui/Modal";
import EventForm from "../../events-page/event-form";
import SpinnerContainer from "../../../ui/Spinner";
//Boostrap
import Button from 'react-bootstrap/Button';
import "./profile.css"
class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: undefined,
            showModal:false,
            owner: undefined
        }
        this.eventService = new EventService()
        this.UserService = new UserService()
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.updateUserDetails(this.props.match.params.userId)
    }

    updateEventInfo = () => {
        this.getProfileUserEvents(this.props.paramId)
        this.getUserDetails(this.props.loggedInUser._id)
    }

    handleFormModal = status => this.setState({ showModal: status })
    
    handleEventSubmit = () => {
        this.handleFormModal(false)
        this.updateEventInfo()
    }
    getProfileUserEvents = userId => {
        this.eventService
            .getAllFutureUserEvents(userId)
                .then(response => this.setState({ events: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId;
    filterEvents = role =>
        !this.state.events ? null : role === "owner" ?
        this.state.events.filter(event => event.owner === this.props.paramId) :
        this.state.events.filter(event => event.participants.includes(this.props.paramId) && event.owner !== this.props.paramId)
    getUserDetails = id => {
        this.UserService.getUserDetails(id)
            .then(response => this.setState({ owner: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
        render() {
        const profile = this.state.userDetails && this.getProfile()
        return (
            <>
                {this.state.userDetails && profile ?
                    <main className="main-bg main-profile">
                        <Container className="profile-container">
                            <h1 className="big-title">{this.state.userDetails.username} profile</h1>
                            <div className="sub-profile-container">
                                <small className="subtitle">{this.state.userDetails.personDetails ? "Event-lover" : "Event-maker"}</small>
                                <div className="image-container">
                                    <img className="profile-image" alt={this.state.userDetails.username} src={this.state.userDetails.avatar} />
                                </div>
                            </div>

                            {profile}
                        </Container>

                    </main>
                : <SpinnerContainer/>
            }
            </>     
        )
    }
}

export default Profile