import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

//services

import Modal from "../../../ui/Modal"
class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            events: [],
            showModal: false,
        }
        this.eventService = new EventService()
    }
    handleModal = (status, e) => !this.props.events ? null :
        e ? this.setState({ showModal: status, calendarDate: `${e.dateStr}T00:00` }) :
        this.setState({ showModal: status })

    handleEventSubmit = () => {
        this.handleModal(false)
        this.updateEvents()
    }
    obtainDateInFormat = date => {
        let newDate = new Date(date);
        const hh = String(newDate.getHours()).padStart(2, '0');
        const min = String(newDate.getMinutes()).padStart(2, '0');
        const dd = String(newDate.getDate()).padStart(2, '0');
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const yyyy = newDate.getFullYear();
        return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`
    }
    getEventsToRender = () => this.props.events.length > 0 && this.props.events.map(event => { return { title: event.name, start: this.obtainDateInFormat(event.startTime), end: this.obtainDateInFormat(event.endTime) } })
    render() {
        const formattedInfo = this.getEventsToRender()
        return (
            <>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    events={formattedInfo}
                    dateClick={() => this.handleModal(true, e)}
                    eventClick={() => alert("touching an event")}
                    headerToolbar={{ start: "dayGridMonth,timeGridWeek" }}
                     />
                <Modal handleEventSubmit={this.handleEventSubmit} handleModal={this.handleModal} {...this.props} calendarDate={this.state.calendarDate} show={this.state.showModal} loggedInUser={this.props.loggedInUser}/>  
            </>
        )
    }
}

export default Calendar