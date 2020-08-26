import React, { Component } from "react";
//MultiSelector for Motorbike or Car
import UserService from '../../../../../services/UserService';
import FilesService from '../../../../../services/FIlesService';
//import Bootstrap
import { Container, Form, Button } from 'react-bootstrap';
import SpinnerContainer from "../../../../ui/Spinner"
class profilePerson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            genre: undefined,
            age: undefined,
            previousLoggedUser: undefined,
            avatar: ''
        }
        this.userService = new UserService()
        this.filesService = new FilesService()
    }
    componentDidMount = () => {
        this.enterUsernameStateValue(this.props.loggedInUser)
        const id = this.props.loggedInUser._id;
        this.userService
            .getUserDetails(id)
            .then((res) => this.setState({ age: res.data.personDetails.age, genre: res.data.personDetails.genre }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    enterUsernameStateValue = user => this.setState({username: user.username})    

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({[name]:value})
    }
    handleFormSubmit = event => {
        event.preventDefault()
        this.setState({previousLoggedUser: this.props.loggedInUser})
        this.userService
            .editUserProfile(this.props.loggedInUser._id, this.state)
            .then(response => {
                this.props.setTheUser(response.data);
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`);
            })
            .catch(err => err.response && err.response.status === 400 || err.response.status === 401 ? this.setState({ errorMsg: err.response.data.message })
                : this.props.handleToast(true, err.response.data.message))   
    }
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])

        this.filesService.handleUpload(uploadData)
            .then(response => {
                this.setState({ avatar: response.data.secure_url })
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    render() {
        return (
            <>
                {!this.props.loggedInUser ? <SpinnerContainer/> :
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
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">At least four characters</Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control onChange={this.handleFileUpload}  name="avatar" type="file" />
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
                            {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                            <Button variant="dark" type="submit">Submit</Button>
                        </Form>
                    </Container>
                };
            </>                   
        );
    };
};

export default profilePerson