import React, { Component } from 'react'
import "./main-page-event.css"
import EventService from '../../../services/EventService'
import Container from 'react-bootstrap/esm/Container'
import EventList from "./event-list/"
import Map from './map';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import SpinnerContainer from "../../ui/Spinner"
import "./main-page-event.css"
class EventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            confirmedEvents: undefined,
            currentLatLng: {
                lat: undefined,
                lng: undefined
            },
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {
        this.updateEventList()
        this.getGeoLocation()
    }

    updateEventList = () => this.getAllFutureEvents()

    getAllFutureEvents = () => {
        this.eventService
            .getAllFutureEvents()
            .then(response => this.setState({ events: response.data, confirmedEvents: response.data.filter(event => event.acceptedOffer)}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
    }
    render() {
        return (
            <>
                {
                    !this.state.events ? < SpinnerContainer /> :
                        <main className="main-bg"  style={{ height: this.state.height }}>
                            <Container className = 'event-page-container' >
                                {/* {Falta la searchbar aun}  */}
                                <div>
                                    <Row className="maps">
                                        <Col className="map-container">
                                            <center>
                                                <Map markers={this.state.confirmedEvents}/>
                                            </center>
                                        </Col>

                                    </Row>
                                </div>
                            </Container>
                        </main>
                }
            </>

        )
    }
}

export default EventPage 