import React, {useRef} from 'react'
import styles from '../styles/LoginModal.module.css'
import {LoginContext} from '../contexts/LoginContext'
import {useContext, useState} from 'react'


function LoginModal(props) {  
    const currentUserData = useContext(LoginContext)

    function loginLogout(){
        if(currentUserData.loggedIn)
            logout()
        else
            login()
    }

    const login = async () =>{
        try{
            const loginResult = await fetch(
                'http://localhost:2100/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',                        
                    },
                    body: JSON.stringify({
                        username: usernameRef.current.value,
                        password: passwordRef.current.value,
                    }),
                }
            )
            const loginData = await loginResult.json()
            console.log(loginData)
            setMessage(loginData.info)
            
            if(!loginData.success) return
            
            currentUserData.updateUser(loginData)
        } catch (error){
            console.log(`Failed to get login information: ${error}`)
        }
    }

    const register = async ()=>{
        try{
            const registerResult = await fetch(
                'http://localhost:2100/users/register',
                {
                    method: 'POST',
                    headers: {
                        method: 'cors',
                        credentials: 'include',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: usernameRef.current.value,
                        password: passwordRef.current.value,
                        pfp: pfpRef.current.value,
                        apiKeys: currentUserData.apiKeys,
                    }),
                }
            )
            const registerData = await registerResult.json()
            setMessage(registerData.info)
            props.showLoginModal(false)
        } catch (error){
            console.log(`Failed to get register information: ${error}`)
        }
    }

    const logout = async ()=>{
        try{
            const logoutRequest = await fetch(
                'http://localhost:2100/users/logout',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: currentUserData.username,
                        accessToken: currentUserData.accessToken,
                        refreshToke: currentUserData.refreshToken,
                    }),
                }
            )
            const logoutData = await logoutRequest.json()
            console.log(logoutData)
            setMessage(logoutData.info)
            
            currentUserData.resetUser()
            if(!logoutData.success) return
            
        } catch (error){
            console.log(`Failed to logout: ${error}`)
        }        
    }

    const usernameRef = useRef('')
    const passwordRef = useRef('')
    const pfpRef = useRef('')

    const [message, setMessage] = useState('Log in or register here')

    if(!props.loginModalActive) return null
    return (
        <div className={styles.push_modal_container}>
                <div className={styles.background}
                    onClick={()=>props.showLoginModal(false)}
                >
                </div>                
            <div className={styles.modal}>
                
                <span className={styles.message}>
                    {message}
                </span>

                <input type="text" autoComplete="no" 
                ref={usernameRef}
                placeholder="Username"/>
                
                <input type="text" autoComplete="no"                 
                ref={passwordRef}
                placeholder="Password"/>

                <input type="text" autoComplete="no"                 
                ref={pfpRef}
                placeholder="Profile Pic Url"/>

                <button
                    onClick={loginLogout}
                >
                    {currentUserData.loggedIn ? "Logout" : "Login" }
                </button>
                
                <button
                    onClick={register}
                >
                    Register
                </button>
                
            </div>
        </div>
    )
}

export default LoginModal
