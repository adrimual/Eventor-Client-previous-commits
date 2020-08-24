import React from 'react';
import PersonProfile from "./personProfile/";
const ProfilePage = props => {
    console.log("props passed to profile", props)
    const personProfile = <PersonProfile loggedInUser={props.loggedInUser}/>
    return (
        <main >
            <h1>Welcome, @{props.loggedInUser.username}</h1>
            <span>{props.loggedInUser.personDetails}</span>
        </main>
    )
}
export default ProfilePage