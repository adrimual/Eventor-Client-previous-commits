import React, { Component } from 'react'
import AuthService from '../../services/AuthService';

//import bootstrap elements
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class LogInForm extends Component {
    constructor(props) {
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
    handleInputFormSubmit = event => {
        event.preventDefault();
        this.authService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data);
                this.props.handleToast(true, 'Logged in');
                this.props.history.push('/coasters')
            })
        .catch(error => console.log(error.response.data.message))
    }
    render() {
        return (
            <Container as="main">
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h3>Logging in</h3>

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
                                <Form.Text className="text-muted">At least 4 characters.</Form.Text>
                            </Form.Group>

                            <Button variant="dark" type="submit">Log In</Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginForm