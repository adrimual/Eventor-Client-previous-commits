import React, {Component} from 'react';
import PersonProfile from "./personProfile/";
import UserService from '../../services/UserService';

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
        get.userDetails(id)
            .then((response) => this.setState({ userDetails: response.data }))
            .catch(err=>console.log(err))
    }
    render() {
        let detailedProfile
        if (this.state.userDetails) {
            detailedProfile = <PersonProfile userDetails={this.state.userDetails} loggedInUser={this.state.userDetails}/>
        }
        return (
            <>
                {!this.state.userDetails ? <h1>Loading</h1> :
                    <main>
                        <h1>Welcome, @{this.state.userDetails.username}</h1> 
                        <span>{this.state.userDetails.personDetails}</span>
                        {detailedProfile}
                    </main>
                }
            </>
        )
    }
}
export default ProfilePage