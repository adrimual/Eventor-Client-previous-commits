import React, { Component } from 'react'
import AuthService from '../../../../services/AuthService';
import '../auth-page.css'
//import bootstrap elements
import {Button, Form} from 'react-bootstrap';


class AuthForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
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
        event.preventDefault()
        this.authService[authMethod](this.state)
            .then(response => {
                console.log('res', response)
                const message = this.props.location.pathname === "/signup" && response.data ? `Thanks for joining Go-Ride, ${response.data.username}!`
                    : `Greetings, ${response.data.username}!`
                this.props.setTheUser(response.data)
                response.data && this.props.handleToast(true, message)
                this.props.history.push('/')
            })
             .catch(err => !err.response ? null :
                (err.response.status === 400 || err.response.status === 401) ?
                    this.setState({ errorMsg: err.response.data.message }) :
                    this.props.handleToast(true, err.response.data.message))
    }
    render() {
        return (
                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">At least four characters.</Form.Text>
                            </Form.Group>
                
                            {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                            <Button className='button' size="lg" variant="dark" type="submit">{this.props.isSignup ? "Sign up" : "Log in"}</Button>
                        </Form>

        )
    }
}

export default AuthForm