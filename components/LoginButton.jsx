import React from 'react'
import {LoginContext} from '../contexts/LoginContext'
import {useContext} from 'react'
import styles from '../styles/LoginButton.module.css'

function LoginButton(props) {
    
    const userData = useContext(LoginContext)

    function showPfP(){
        if(userData.loggedIn && userData.pfp) 
            return userData.pfp
        
        return userData.defaultPic
    }

    return (
        <div className={styles.pfp_container}>
            <img
                className={styles.pfp}
                src={showPfP()}
                onClick={()=>props.setLoginModalActive(true)}
            />                        
            <span className={styles.username}>
                    {userData.username}
                <span>
                    {userData.loggedIn && " (Logged In)"}
                </span>
            </span>
        </div>
    )
}

export default LoginButton
