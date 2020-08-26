import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css"
import EventService from "../../../../services/EventService"
import EventForm from '../../events-page/event-form'
import EventCard from "../../events-page/event-list/card"
import Modal from "../../../ui/Modal"

class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
        }
        this.eventService = new EventService()
    }
    handleFormModal = (status, e) => !this.props.events ? null :
        e ? this.setState({ showModal: status, calendarDate: `${e.dateStr}T00:00` }) :
        this.setState({ showModal: status })

        handleEventDetailModal = status => {
            this.setState({
                showModal: status,
                calendarDate: undefined
            })
        }
    handleEventSubmit = () => {
        this.handleFormModal(false)
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
    showDetailsModal = e => {
        this.eventService
            .getEventByName(e.event._def.title)
            .then(response => {
                this.handleEventDetailModal(true)
                this.setState({ eventDetail: response.data })
            })
        .catch(err => console.log(err))
        }
    getEventsToRender = () =>         this.props.events.length > 0 && this.props.events.map(event => {
            return { title: event.name, start: this.obtainDateInFormat(event.startTime), end: this.obtainDateInFormat(event.endTime) }})
    render() {
        const formattedInfo = this.getEventsToRender()
        return (
            <>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    events={formattedInfo}
                    dateClick={e => this.handleFormModal(true, e)}
                    eventClick={e=> this.showDetailsModal(e)}
                    headerToolbar={{ start: "dayGridMonth, timeGridWeek" }}
                     />
                    <Modal handleModal={this.handleFormModal} handleEventDetailModal={this.handleEventDetailModal} show={this.state.showModal} >
                    {this.state.calendarDate ?
                        <EventForm calendarDate={this.state.calendarDate} {...this.props} loggedInUser={this.props.loggedInUser} handleEventSubmit={this.handleEventSubmit} /> : 
                        this.state.eventDetail ? 
                        <EventCard {...this.state.eventDetail} /> : null}       
                </Modal>
            </>
        )
    }
}

export default Calendar