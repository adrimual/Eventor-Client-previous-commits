import React from 'react';
import PersonProfile from "./personProfile/";
const ProfilePage = ({ loggedInUser }) => {
    const personProfile = <PersonProfile loggedInUser={loggedInUser}/>
    return (
        <main >
            <h1>Welcome, @{loggedInUser.username}</h1>
            <span>{personProfile}</span>
        </main>
    )
}
export default ProfilePage