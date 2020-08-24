import React, { Component } from "react";

import UserService from '../../../../services/UserService';


//import Bootstrap
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class profilePerson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: ""
        }
        this.userService = new UserService()
    }
    componentDidMount = () => this.enterUsernameStateValue(this.props.loggedInUser)
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
                console.log("response from the api", response);
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
                            <Button variant="dark" type="submit">Submit</Button>
                        </Form>
                    </Container>
                };
            </>                   
        );
    };
};

export default profilePerson