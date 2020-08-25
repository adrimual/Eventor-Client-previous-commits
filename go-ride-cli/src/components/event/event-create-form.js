import React, { Component } from 'react';
import UserService from '../../services/UserService';
//Import bootstrap
import { Container, Form, Button } from 'react-bootstrap';

//Event form
class EventForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            owner: this.props.personDetails,
            name: "",
            description: "",
            date: undefined,
            city: undefined
        }
        this.UserService = new UserService()
    }
    handleInputChange = event => event.target.type !== "checkbox" ? this.setState({ [event.target.name]: event.target.value }) : this.handleCheckbox(event.target)
    handleCheckbox = (target) => {
        const stateToChange = [...this.state[target.name]]
        const index = stateToChange.indexOf(target.value);
        index === -1 ? stateToChange.push(target.value) : stateToChange.splice(index, 1)
        this.setState({[target.name]: stateToChange})
    }
        handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleFormSubmit = event => {
        event.preventDefault()
        this.UserService
            .createEvent(this.state)
            .then(() => this.props.history.push('/profile'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Container as='main'>
                <Form onSubmit={this.handleFormSubmit}>
                <h1>Create an Event</h1>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control  onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                        <Form.Text className="text-muted">Maximum 500 characters</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.date} name="date" type="date" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.city} name="city" type="text" />
                    </Form.Group>

                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
        )
    };
};

export default EventForm;