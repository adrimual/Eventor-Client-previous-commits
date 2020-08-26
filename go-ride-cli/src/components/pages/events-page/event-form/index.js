import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import "./form.css"
import EventService from '../../../../services/EventService'

//Bootstrap
import {Container, Form, Button} from 'react-bootstrap/'

class EventForm extends Component {
    constructor (props){
        super (props)
        this.state = {
            owner: this.props.loggedInUser._id,
            name: '',
            description: '',
            date: "",
            city: "",
            participants: [this.props.loggedInUser._id],
            startTime: "",
            endTime: ""
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.eventId
        if (id) {
            this.eventService
                .getOneEvent(id)
                .then(response => this.updateEventState(response.data))
                .catch(err => console.log(err))
        }
        this.props.calendarDate && this.setState({ startTime: this.props.calendarDate, endTime: this.props.calendarDate})
    }
    formatDate = date => {
        const newDate = new Date(date);
        const hh = String(newDate.getHours()).padStart(2, '0');
        const min = String(newDate.getMinutes()).padStart(2, '0');
        let dd = String(newDate.getDate()).padStart(2, '0');
        let mm = String(newDate.getMonth() + 1).padStart(2, '0');
        let yyyy = newDate.getFullYear();
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`
    }
    updateEventState = data => {
        this.setState({
            name: data.name || "",
            description: data.description || "",
            startTime: this.formatDate(data.startTime) || "",
            endTime: this.formatDate(data.endTime) || "",
            city: data.city || "",
        })
    }
    enterUsernameStateValue = user => this.setState({ username: user.username })

    handleInputChange = event => event.target.type !== "checkbox" ? this.setState({ [event.target.name]: event.target.value })
        : this.handleCheckbox(event.target)

    handleCheckbox = (target) => {
        const stateToChange = [...this.state[target.name]]
        const index = stateToChange.indexOf(target.value)
        index === -1 ? stateToChange.push(target.value) : stateToChange.splice(index, 1)
        this.setState({ [target.name]: stateToChange })
    }
    handleFormSubmit = event => {
           event.preventDefault()
           const id = this.props.match.params.eventId
           this.props.location.pathname.includes("edit") ? this.editEvent(id, this.state) : this.createEvent()
    }
    setErrorMessage = errorMsg => this.setState({ errorMsg })
    createEvent = () => {
        this.eventService
            .createEvent(this.state, this.props.match.params._id)
            .then(() => {
                this.props.handleEventSubmit ? this.props.handleEventSubmit() :
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
            .catch(err => err.response && this.setErrorMessage(err.response.data.message))
    }
    editEvent = (id, newEvent) => {
        this.eventService
            .editEvent(id, newEvent)
            .then(() => this.props.history.push(`/profile/${this.props.loggedInUser._id}`))  
            .catch(err => err.response && this.setErrorMessage(err.response.data.message))
    }
    render () {
        return (
            <>
                {this.state.name === undefined ? <h2>Loading</h2> :
                   <main className="main-bg">
                        <Container>
                            <Form className="white-form" onSubmit={this.handleFormSubmit}>
                                {this.props.location.pathname.includes("edit") ? <h1>Edit Event</h1> :<h1>Create Event</h1>}
                                <Form.Group>
                                    <Form.Label className="color-text-black">Name</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="color-text-black">Description</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                                    <Form.Text className="text-muted">No more than 500 characters</Form.Text>
                                </Form.Group>
                                <div className="small-input-container">
                                    <Form.Group>
                                        < Form.Label className = "color-text-black" > Start time </Form.Label>
                                        <Form.Control className="small-input" onChange={this.handleInputChange} type="datetime-local" name="startTime" value={this.state.startTime} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className="color-text-black">End time</Form.Label>
                                        <Form.Control className="small-input" onChange={this.handleInputChange} type="datetime-local" name="endTime" value={this.state.endTime} min={this.state.startTime} />
                                    </Form.Group>
                                    <Form.Group>
                                        < Form.Label className = "small-input"> City </Form.Label>
                                        <Form.Control className="small-input" onChange={this.handleInputChange} value={this.state.city} name="city" type="text" />
                                    </Form.Group>
                                </div>
                                {this.state.errorMsg && <p className="errorMsg">{this.state.errorMsg}</p>}
                                <Button variant="dark" type="submit">Submit</Button>
                            </Form>
                        </Container>
                    </main>
                }
            </>
        )
    }
}

export default EventForm