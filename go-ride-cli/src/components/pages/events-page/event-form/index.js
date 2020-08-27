import React, {
    Component
} from 'react'
import "./form.css"

import EventService from '../../../../services/EventService'
import FilesService from '../../../../services/FIlesService'

//Bootstrap
import {
    Form,
    Button
} from 'react-bootstrap/'

class EventForm extends Component {
    constructor(props) {
        super(props)
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
        this.filesService = new FilesService()
    }
    componentDidMount = () => {
        const id = this.props.eventToEdit;
        if (id) {
            this.eventService
                .getOneEvent(id)
                .then(response => this.updateEventState(response.data))
                .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
        }
        this.props.calendarDate && this.setState({
            startTime: this.props.calendarDate,
            endTime: this.props.calendarDate
        })
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
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])
        this.filesService.handleUpload(uploadData)
            .then(response => {
                console.log(response.data.secure_url)
                this.setState({
                    avatar: response.data.secure_url
                })
            })
            .catch(err => console.log(err))
    }

    enterUsernameStateValue = user => this.setState({
        username: user.username
    })

    handleInputChange = event => event.target.type !== "checkbox" ? this.setState({
            [event.target.name]: event.target.value
        }) :
        this.handleCheckbox(event.target)

    handleCheckbox = (target) => {
        const stateToChange = [...this.state[target.name]]
        const index = stateToChange.indexOf(target.value)
        index === -1 ? stateToChange.push(target.value) : stateToChange.splice(index, 1)
        this.setState({
            [target.name]: stateToChange
        })
    }
    handleFormSubmit = event => {
        event.preventDefault()
        const id = this.props.eventToEdit
        this.props.eventToEdit ? this.editEvent(id, this.state) : this.createEvent()
    }
    setErrorMessage = errorMsg => this.setState({
        errorMsg
    })
    createEvent = () => {
        this.eventService
            .createEvent(this.state, this.props.loggedInUser._id)
            .then(() => {
                debugger
                this.props.handleEventSubmit()
                debugger
            })
            .catch(err => err.response && err.response.status === 400 ? this.setState({
                    errorMsg: err.response.data.message
                }) :
                this.props.handleToast(true, err.response.data.message))
    }
    editEvent = (id, newEvent) => {
        this.eventService
            .editEvent(id, newEvent, this.props.loggedInUser._id)
            .then(() => this.props.handleEventSubmit())
            .catch(err => err.response && err.response.status === 400 ? this.setState({
                    errorMsg: err.response.data.message
                }) :
                this.props.handleToast(true, err.response.data.message))
    }
    render() {
        return ( <
            > {
                this.state.name === undefined ? null :
                    <
                    main className = "main-bg" >
                    <
                    Form className = "event-form-container"
                onSubmit = {
                    this.handleFormSubmit
                } > {
                    this.props.eventToEdit ? < h1 className = 'color-text' > Edit Event < /h1> :<h1 className='color-text'>Create Event</h1 >
                } <
                Form.Group >
                <
                Form.Label className = "color-text-black" > Name < /Form.Label> <
                Form.Control onChange = {
                    this.handleInputChange
                }
                value = {
                    this.state.name
                }
                name = "name"
                type = "text" / >
                <
                /Form.Group> <
                Form.Group >
                <
                Form.Label className = "color-text-black" > Description < /Form.Label> <
                Form.Control onChange = {
                    this.handleInputChange
                }
                value = {
                    this.state.description
                }
                name = "description"
                type = "textarea" / >
                <
                Form.Text className = "text-muted" > No more than 500 characters < /Form.Text> <
                /Form.Group> <
                Form.Group >
                <
                Form.Label > Main image < /Form.Label> <
                Form.Control onChange = {
                    this.handleFileUpload
                }
                name = "avatar"
                type = "file" / >
                <
                /Form.Group> <
                div className = "small-input-container" >
                <
                Form.Group >
                <
                Form.Label className = "color-text-black" > Start time < /Form.Label> <
                Form.Control className = "small-input"
                onChange = {
                    this.handleInputChange
                }
                type = "datetime-local"
                name = "startTime"
                value = {
                    this.state.startTime
                }
                /> <
                /Form.Group> <
                Form.Group >
                <
                Form.Label className = "color-text-black" > End time < /Form.Label> <
                Form.Control className = "small-input"
                onChange = {
                    this.handleInputChange
                }
                type = "datetime-local"
                name = "endTime"
                value = {
                    this.state.endTime
                }
                min = {
                    this.state.startTime
                }
                /> <
                /Form.Group> <
                Form.Group >
                <
                Form.Label className = "small-input" > City < /Form.Label> <
                Form.Control className = "small-input"
                onChange = {
                    this.handleInputChange
                }
                value = {
                    this.state.city
                }
                name = "city"
                type = "text" / >
                <
                /Form.Group> <
                /div> {
                    this.state.errorMsg && < p className = "errorMsg" > {
                            this.state.errorMsg
                        } < /p>} <
                        Button variant = "dark"
                    type = "submit" > Submit < /Button> <
                        /Form> <
                        /main>
                } <
                />
            )
        }
    }

    export default EventForm