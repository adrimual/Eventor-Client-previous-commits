import React, { Component } from 'react'
import "./main-page-event.css"
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
                    !this.state.events ? <h1>Loading</h1> :
                        <main className="main-bg">
                            <Container as="main" >
                                {/* {Falta la searchbar aun}  */}
                                <EventList events={this.state.events} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} />
                            </Container>
                        </main>
                }
            </>

        )
    }
}

export default EventPage 