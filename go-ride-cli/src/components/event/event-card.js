import React from 'react'
import { Link } from 'react-router-dom'
//Import bootstrap
import { Card, Button, Col } from 'react-bootstrap'

const EventCard = ({name,city, description, date, _id}) => {

    return (
        <Col md={4}>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>City:{city}</Card.Subtitle>
                <Card.Text>Date: {date}</Card.Text>
                <Card.Text>Description: {description}</Card.Text>

                <Link to={`/event/edit/${_id}`} ><Button variant="primary">Edit</Button></Link>
                <Button variant="danger">Delete</Button>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default EventCard 