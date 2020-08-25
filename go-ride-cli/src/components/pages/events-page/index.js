import React, { Component } from 'react'

import EventService from '../../../services/EventService'
import Container from 'react-bootstrap/esm/Container'
import EventList from "./event-list/"

class EventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.updateEventList()

    updateEventList = () => this.getAllEvents()

    getAllEvents = () => {
        this.eventService
            .getAllEvents()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {
                    !this.state.events ? <h2>Loading</h2> :
                        <Container as="main">
                            {/* {to do the searchbar}  */}
                            <EventList events={this.state.events} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser}/>
                        </Container>
                }
            </>

        )
    }
}

export default EventPage 