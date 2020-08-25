import React, {Component} from 'react';

import EventService from '../../../services/EventService';
import EventCard from '../card';
import Container from 'react-bootstrap/esm/Container';

class EventList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            loggedUserEvents: []
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        this.updateEventList()
    }
    updateEventList = () => {
        this.setLoggedUserEvents(this.props.loggedInUser._id)
        this.eventService
            .getAllEvents()
            .then(response => {
                this.setState({ events: response.data })
                console.log("EVENTOS: ",this.state.events)
            })
            .catch(err => console.log(err))
    }
    setLoggedUserEvents = userId => {
        let loggedUserEventsCopy = [] //guardo copia y le empujo los datos de la respuesta
        this.eventService
            .getOwnedEvents(userId)
            .then(response => loggedUserEventsCopy.push(...response.data)) 
            .then(() => this.eventService.getParticipantEvents(userId))
            .then(response => loggedUserEventsCopy.push(...response.data))
            .then(() => this.setState({loggedUserEvents: loggedUserEventsCopy}))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                {!this.state.events ? <h2>Loading</h2>: 
                    <Container as='div'>
                        {this.state.events.map(event => <EventCard loggedUserEvents={this.state.loggedUserEvents} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event}/>)}
                    </Container>
                }
            </>
        )
    }
}
export default EventList