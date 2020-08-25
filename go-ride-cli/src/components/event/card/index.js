import { React, Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Import bootstrap
import { Card, Button, Col } from 'react-bootstrap'

import EventService from '../../../services/EventService'
class EventCard extends Component {
    constructor (props){
        super (props)
        this.state = {
            owner: undefined,
            buttons: undefined
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        this.setOwner(this.props._id)
    }
    deleteEvent = eventId =>{
        this.eventService
            .deleteEvent(eventId)
            .then(() => this.props.updateEvents())
            .catch(err => console.log(err))
    }
    isUserTheProfileOwner = () => {
            return this.props.paramId ? this.props.loggedInUser._id === this.props.paramId : false
    }
    setOwner = eventId => {
        this.eventService
            .getEventOwner(eventId)
            .then((response) => this.setState({owner: response.data.owner.username}))
            .catch(err => console.log(err))
    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(()=> this.props.updateEventList())
            .catch(err => console.log(err))
    }

    leaveEvent = (eventId, userId) => {
        this.eventService
            .leaveEvent(eventId, userId)
            .then(()=> this.props.updateEventList())
            .catch(err => console.log(err))
    }

    setButtons = () => {
        if (!this.props.loggedInUser) return
        console.log('Checking buttons: ', this.props.loggedUserEvents)
        console.log('Checking buttons mapped: ', this.props.loggedUserEvents.map(event => event._id))
        console.log('EventId looked: ', this.props._id)
        if (this.props.owner == this.props.loggedInUser._id) {
            this.state.buttons = 
            <>
            <Button variant="primary" onClick={() => this.deleteEvent(this.props._id) && <Redirect to='/profile' />}>Delete</Button>
            <Link to={`/user/${this.props.loggedInUser._id}/event/edit/${this.props._id}`} ><Button variant="primary">Edit</Button></Link>
            </>;
        } else if(this.props.loggedUserEvents.map(event => event._id).includes(this.props._id)){
            this.state.buttons = 
            <Button variant="danger" onClick={() => {this.leaveEvent(this.props._id, this.props.loggedInUser._id) && this.props.updateEventList()}}>Leave Event</Button>
        } else {
            this.state.buttons = 
            <Button variant="primary" onClick={() => {this.joinEvent(this.props._id, this.props.loggedInUser._id) && this.props.updateEventList()}}>Join Event</Button>
        }
    }
    render() {
        this.setButtons()
        return (
            <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.city}</Card.Title>
                    <Card.Subtitle>Creator: {this.state.owner}</Card.Subtitle>
                    <Card.Text>Participants:{this.props.participants.length}</Card.Text>
                    <Card.Text>City:{this.props.city}</Card.Text>
                    <Card.Text>Date: {this.props.date}</Card.Text>
                    <Card.Text>Description: {this.props.description}</Card.Text>
                    {!this.props.owner ? <h2>Loading</h2> : this.state.buttons}

                    {/* {this.isUserTheProfileOwner() &&
                        <>
                            <Link to={`/user/${this.props.loggedInUser._id}/event/edit/${this.props._id}`} ><Button variant="primary">Edit</Button></Link>
                            <Button variant="primary" onClick={() => this.deleteEvent(this.props._id) && <Redirect to='/profile' />}>Delete</Button>
                        </>
                    }  
                    }   */}
                </Card.Body>
            </Card>
            </Col>
        )
    }
}

export default EventCard 