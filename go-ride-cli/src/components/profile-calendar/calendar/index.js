import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

//services
import EventService from '../../../services/EventService'
//import bootstrap
import { Modal, Container } from "react-bootstrap";

import EventForm from "../../event/form";
class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            events: [],
            showModal: false,
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => this.updateEvents()
    updateEvents = () => {
        const id = this.props.match.params.userId
        this.eventService.getAllEventsUser(id)
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }
    handleModal = status => this.setState({ showModal: status })

    handleEventSubmit = () => {
        this.handleModal(false)
        this.updateEvents()
    }
    obtainDateInFormat = date => {
        let newDate = new Date(date)
        const dd = String(newDate.getDate()).padStart(2, '0')
        const mm = String(newDate.getMonth() + 1).padStart(2, '0')
        const yyyy = newDate.getFullYear()
        newDate = yyyy + '-' + mm + '-' + dd
        return newDate
    }
    render() {
        const formattedEvents = this.state.events.length > 0 && this.state.events.map(event => { return { title: event.name, date: this.obtainDateInFormat(event.date) } })
        return (
            <>
                <Container>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        events={formattedEvents}
                        dateClick={() => this.handleModal(true)}
                        eventClick={() => alert("touching an event")}
                        headerToolbar={{ start: "dayGridMonth,timeGridWeek" }}
                    />
                </Container>
                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EventForm loggedInUser={this.props.loggedInUser} handleModal={this.handleEventSubmit} {...this.props}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Calendar