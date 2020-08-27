import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Container, Col, Row, Button} from 'react-bootstrap'
import Calendar from "./calendar"
import EventService from "../../../services/EventService"
import SpinnerContainer from "../../ui/Spinner"
import "./calendar-page.css"
class CalendarPage extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: []
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.updateEvents()
    }
    updateEvents = () => {
        if(this.props.match.params.userId ){
            this.getAllUserEvents(this.props.match.params.userId)
        }
    }

    getAllUserEvents = id => {
        this.eventService.getAllEventsUser(id)
            .then(response => {
                this.setState({ events: response.data })
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(() => this.updateEvents())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }
    render() {
        return (
            <>
                { this.state.events.length > 0 ?
                    <Container as = "main" className = "calendar-bg" >
                        <Calendar events={this.state.events} updateCalendarEvents={this.updateEvents} loggedInUser={this.props.loggedInUser}  handleToast={this.props.handleToast} updateEvents={this.updateEvents} {...this.props}/>
                    </Container> : <SpinnerContainer />
                }
            </> 
        )
    }
}

export default CalendarPage 