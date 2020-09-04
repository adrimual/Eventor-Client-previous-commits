import React, { Component } from "react";
//MultiSelector for Motorbike or Car
import UserService from '../../../../../services/UserService';
import FilesService from '../../../../../services/FIlesService';
//import Bootstrap
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../profile.css';

class profilePerson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            genre: undefined,
            age: undefined,
            previousLoggedUser: undefined,
            avatar: ""
        }
        this.userService = new UserService()
        this.filesService = new FilesService()
    }
    componentDidMount = () => {
        this.enterUsernameStateValue(this.props.loggedInUser)
        const id = this.props.loggedInUser._id
        this.userService
            .getUserDetails(id)
            .then((response) => this.setState({age: response.data.age, genre: response.data.genre }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    enterUsernameStateValue = user => this.setState({username: user.username})    

    handleInputChange = event => {
        let { name, value, type, id, checked } = event.target;
        console.log("llega", event.target)
        if (type === "radio" && id === "male" && checked) {
            value = "Male"
        }
        if (type === "radio" && id === "female" && checked) {
            value = "Female";
        }
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
            .catch(err => !err.response ? null :
                err.response.status === 400 ? this.setState({ errorMsg: err.response.data.message }) :
                this.props.handleToast(true, err.response.data.message))   
    }
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])

        this.filesService.handleUpload(uploadData)
            .then(response => {
                this.setState({ avatar: response.secure_url })
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    render() {
        return (
            <>
                   <Row className='profile-form-row'>
                        <Col  className='profile-form-col' md={{span: 6, offset: 3}}>
                            <h1 className='color-text'>Edit your information</h1>              
                                <Form onSubmit={this.handleFormSubmit}>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control readOnly={true} onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
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
                                    <div className= "check">
                                        <div>
                                            <label>Male</label>
                                            <input id="male" className="genre-radio" onChange={this.handleInputChange} /*checked={this.state.genre === "Male"}*/ value={this.state.genre} name="genre" type="radio" />
                                        </div>
                                        <div>
                                            <label>Female</label>
                                            <input id="female" className="genre-radio" onChange={this.handleInputChange} /*checked={this.state.genre === "Female"}*/ value={this.state.genre} name="genre" type="radio" />
                                        </div>
                                    </div>
                                    {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                                    <div className = "button-center">
                                        <Button className ="genre-radio" variant="dark" type="submit">Submit</Button>
                                    </div>
                            </Form>
                        </Col>
                    </Row>
            </>                   
        );
    };
};

export default profilePerson