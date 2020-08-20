import React, { Component } from 'react'
import AuthService from '../../services/AuthService';

//import bootstrap elements
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AuthForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email:'',
            password: ''
        }
        this.authService = new AuthService()
    }
    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({[name]: value})
    }
    handleFormSubmit = event => {
        const authMethod = this.props.location.pathname === "/signup" ? "signup" : "login"
        event.preventDefault();
        this.authService[authMethod](this.state)
            .then(response => {
                console.log("User created",response.data)
                this.props.setTheUser(response.data);
                // this.props.handleToast(true, 'Logged in');
                this.props.history.push('/')
            })
        .catch(error => console.log(error.response.data.message))
    }
    render() {
        const isSignup = this.props.location.pathname === "/signup"
        return (
            <Container as="main">
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h3>{isSignup ? "Sign up" : "Log in"}</h3>

                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.email} name="email" type="email" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">At least four characters.</Form.Text>
                            </Form.Group>

                            <Button variant="dark" type="submit">{isSignup ? "Sign up" : "Log in"}</Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AuthForm