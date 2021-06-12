import React, {useState} from 'react'
import styles from '../styles/User.module.css'
import Profile from './Profile'
import LoginButton from './LoginButton'
import {LoginContext} from '../contexts/LoginContext'
import {useContext} from 'react'

function User(props) {
    const userData = useContext(LoginContext)
    const [loggedIn, setLoggedIn] = useState(userData.loggedIn)
    
    return (
        <div className={styles.user_container}>
            {
                loggedIn && <Profile /> &&
                console.log(" Is logged in?", loggedIn)
            }
            <LoginButton
                loggedIn={loggedIn}
                setLoginModalActive={props.setLoginModalActive}
                loginModalActive={props.loginModalActive}
            />
        </div>
    )
}

export default User
