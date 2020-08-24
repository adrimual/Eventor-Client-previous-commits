import React, { Component } from "react";

//MultiSelector for Motorbike or Car
import SelectVehicle from '../selectVehicle/index';
import UserService from '../../../../services/UserService';
//import Bootstrap
import { Container, Form, Button } from 'react-bootstrap';

class profilePerson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            genre: undefined,
            age: undefined,
            vehicle: []
        }
        this.userService = new UserService()
    }
    componentDidMount = () => {
        this.enterUsernameStateValue(this.props.loggedInUser)
        const id = this.props.loggedInUser._id;
        this.userService
            .getUserDetails(id)
            .then((res)=> this.setState({age: res.data.personDetails.age, genre: res.data.personDetails.genre, vehicle: [res.data.personDetails.vehicle]}))
    }
    enterUsernameStateValue = user => this.setState({username: user.username})    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({[name]:value})
    }
    handleFormSubmit = event => {
        event.preventDefault()
        this.userService
            .editUserProfile(this.props.loggedInUser._id, this.state)
            .then(response => {
                this.props.setTheUser(response.data);
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <>
                {!this.props.loggedInUser ? <h2>Loading</h2> :
                    <Container as='main'>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control readOnly={true} onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onCharge={this.handleInputChange}
                                    value={this.setState.state.email}
                                    name="email"
                                    type="email">
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInputChange}
                                    value={this.state.password}
                                    name="password"
                                    type="password" />
                                <Form.Text className="text-muted">At least four characters</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.age} name="age" type="number" />
                            </Form.Group>
                            <Form.Group>
                                <Form.label>Male</Form.label>
                                <Form.Control onChange={this.handleInputChange} checked={this.state.genre === "Male"} value="Male" name="genre" type="radio" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Female</Form.Label>
                                <Form.Control onChange={this.handleInputChange} checked={this.state.genre === "Female"} value="Female" name="genre" type="radio" />
                            </Form.Group>
                            <Button variant="dark" type="submit">Submit</Button>
                            <Form.Group>
                                <SelectVehicle onChange={this.handleInputChange}></SelectVehicle>
                            </Form.Group>
                        </Form>
                    </Container>
                };
            </>                   
        );
    };
};

export default profilePerson