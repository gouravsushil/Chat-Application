import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"

const Welcome = ({ currentUser }) => {
    // console.log(currentUser);
    // console.log(typeof currentUser);

    // console.log(currentUser.username);.
    if (!currentUser) {
        console.log(currentUser);
        return <div>Loading...</div>;
    } else {
        return (
            <Container>
                <img src={Robot} alt="Robot" />
                <h1>
                    Welcome, <span>{currentUser.username}!</span>
                </h1>
                <h3>Please select chat to start messaging.</h3>
            </Container>
        )
    }
}

export default Welcome

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    .img{
        height: 20rem;
    }
    span{
        color: #4e0eff;
    }

`;