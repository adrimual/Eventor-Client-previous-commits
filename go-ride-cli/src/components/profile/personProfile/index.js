import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../../event/list';
//Boostrap
import { Container, Button, Card, Row } from 'react-bootstrap';

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }

    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId;
    render() {
        return (
            <>
                {!this.props.loggedInUser ? <h2>Loading</h2> :

                    <Container>
                        <h1>Username: this.props.userDetails.username</h1>
                        <hr></hr>
                        <h5>Age: </h5>
                        {this.props.userDetails.personDetails.age}
                        <hr></hr>
                        <h5>Genre: </h5>
                        {this.props.loggedInUser.personDetails.genre}
                         <hr></hr>
                        <h1> Joined events </h1>
                        <EventList loggedInUser={this.props.loggedInUser} {...this.props} list="participantEvents" paramId={this.props.paramId} />
                        <h1> Created events </h1>    
                        <EventList loggedInUser={this.props.loggedInUser} {...this.props} list="ownedEvents" paramId={this.props.paramId} />
                        {this.isUserTheProfileOwner() && 
                            <>
                                <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                                <Link to={`/user/${this.props.loggedInUser._id}/event/create`} ><Button variant="dark" type="submit">Create a new event!</Button></Link>
                            </>
                        }
                    </Container>
                }
            </>
        )
    }
}

export default Profile