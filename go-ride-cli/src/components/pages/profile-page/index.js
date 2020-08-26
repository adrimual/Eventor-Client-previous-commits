import React, {Component} from 'react';
import PersonProfile from "./personProfile";
import UserService from '../../../services/UserService';

//Impor bootstrap
import Container from 'react-bootstrap/esm/Container';
class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: undefined
        }
        this.UserService = new UserService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.userId
        this.UserService
        getUserDetails(id)
            .then((response) => this.setState({ userDetails: response.data }))
            .catch(err=>console.log(err))
    }
    getProfile = () => {
        if (this.state.userDetails) {
            return  <PersonProfile userDetails={this.state.userDetails} {...this.props} loggedInUser={this.props.loggedInUser} paramId={this.props.match.params.userId} />
        }
    }
    render() {
        const detailedProfile = this.getProfile()
        return (
            <>
                {!this.state.userDetails ? <h1>Loading</h1> :
                    <Container as ="main">
                        <h1>Welcome, @{this.state.userDetails.username}</h1> 
                        <span>{this.state.userDetails.personDetails}</span>
                        {detailedProfile}
                    </Container>
                }
            </>
        )
    }
}
export default ProfilePage