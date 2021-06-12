import React, {createContext} from 'react'

function createDefaultUser(){

    const defaultUser = {
        username: 'Sign In',
        refreshToken: '',
        accessToken: '',
        loggedIn: false,
        defaultPic: "https://www.selfstir.com/wp-content/uploads/2015/11/default-user.png",
        pfp: '',
        apiKeys: {},
        apiKeysAcquired: false,
        checkedBoxes: [],
        updateUser: function (userData){            
            this.username =  userData.username
            this.refreshToken = userData.refreshToken
            this.accessToken = userData.accessToken
            this.loggedIn = userData.loggedIn ?? false
            this.pfp = userData.pfp
            if(userData.apiKeys){
                this.apiKeysAcquired = true
                this.apiKeys = userData.apiKeys
            }
            this.setLocalItems(userData)
        },
        resetUser: function (){           
            this.username =  'Sign in'
            this.refreshToken = ''
            this.accessToken = ''
            this.loggedIn = false
            this.pfp = this.defaultPic
            this.apiKeysAcquired = false
            this.apiKeys = {}            
        },
        setLocalItems: function(userData){
            localStorage.setItem('username', userData.username)
            localStorage.setItem('accessToken', userData.accessToken)
            localStorage.setItem('refreshToken', userData.refreshToken)  
            
            console.log("Local storage:", localStorage)
        }
    }
    defaultUser.updateUser = defaultUser.updateUser.bind(defaultUser)
    defaultUser.resetUser = defaultUser.resetUser.bind(defaultUser)
    return defaultUser
}

export const LoginContext = createContext(createDefaultUser())


export function LoginContextProvider(props) {
    return (
        <LoginContext.Provider value={defaultUser}>
            {props.children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => React.useContext(LoginContext)