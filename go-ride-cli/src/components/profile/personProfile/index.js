import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Boostrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }
    render() {
        console.log("the details", this.props.userDetails.personDetails)
        return (
            <>
                {!this.props.loggedInUser ? <h2>Loading</h2> :

                    <Container>
                        <h1>Username: this.props.loggedInUser.username</h1>
                        <hr></hr>
                        <h5>Age: </h5>
                        {this.props.userDetails.personDetails.age}
                        <hr></hr>
                        <h5>Genre: </h5>
                        {this.props.loggedInUser.personDetails.genre}
                        <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                    </Container>
                }
            </>
        )
    }
}

export default Profile