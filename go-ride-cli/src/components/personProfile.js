import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import PersonService from '../services/PersonService'

//Boostrap
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Profile extends Component {
    constructor (props){
        super (props)
        this.state = {}
    }

    render () {
        console.log('test',this.props)
        return (
            <>

        {!this.props.loggedUser ? <h2>Loading</h2>:


            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.loggedUser.username}</Card.Title>
                    <Card.Text>
                        Lorem ipsum
                    </Card.Text>
                    <Link to={`/person/profile/edit/${this.props.loggedUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                </Card.Body>

            </Card>}
            </>
        )
    }
}

export default Profile