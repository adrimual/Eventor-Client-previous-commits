import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventService from '../../../services/EventService';
import { Col, Row, Container, Button } from 'react-bootstrap';
import './event-det.css';
import SpinnerContainer from "../../../ui/Spinner"
class EventDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventDetails: undefined,
            owner: undefined
        }
        this.eventService = new EventService()
    }
     componentDidMount = () => {
         window.scrollTo(0, 0)
         this.updateEvents()
     }

    updateState = () => {
        this.eventService
            .getOneEvent(this.props.match.params.eventId)
            .then(response => this.setState({eventDetails: response.data}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 

        this.eventService
            .getEventOwner(this.props.match.params.userId)
            .then((response) => this.setState({owner: response.data.owner.username}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    render () {
        return (
            <>
                {!this.state.eventDetails ? <SpinnerContainer /> : 
                    <> 
                        <Container fluid className = 'main-cont' >
                            <Row>
                                <Col md={{ span: 5, offset: 1 }} className='content'>
                                    <h1 className='color-text'>{this.state.eventDetails.name}</h1>
                                    <span className="color-text-black">Creator: </span> {this.state.owner}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Start Time: </span> {this.state.eventDetails.startTime}  |   
                                    <span className="color-text-black">  End Time: </span> {this.state.eventDetails.endTime}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Description: </span> {this.state.eventDetails.name}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">City: </span> {this.state.eventDetails.city}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Participants: </span> {this.state.eventDetails.participants.length}
                                    <br></br>
                                    <hr></hr>
                                </Col>
                                <Col className='img-event' md={{span: 5, offset: 1}}>
                                    <img src={this.state.eventDetails.avatar} alt={this.state.eventDetails.name}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='container-participants' md={{ span: 5, offset: 1 }}>
                                    <h4 className='participants-title'>Participants</h4>
                                    <div className='participants'>
                                        {this.state.eventDetails.participants.map(user => 
                                        <div className="img-participants" key={user._id}>
                                                <Link to={`/profile/${user._id}`}><img src={user.avatar} alt={user.username}></img></Link>
                                        </div>
                                        )} 
                                    </div>
                                </Col>
                            </Row>
                        </Container>   
                    </>
                }
            </>
        )
    }
}

export default EventDetails
