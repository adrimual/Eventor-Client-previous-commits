import React from 'react';

const ProfilePage = ({ user }) => {
    console.log(user)
    return (
        <main >
            <h1>Welcome, @{user.username}</h1>
            <span>{user.personDetails}</span>
        </main>
    )
}
export default ProfilePage