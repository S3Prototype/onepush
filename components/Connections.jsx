import cStyles from '../styles/Connections.module.css'
import {useRef, useContext, useEffect} from 'react'
import SingleConnection from './SingleConnection'
import {LoginContext} from '../contexts/LoginContext'

function Connections(props) {

    const hashnodeRef = useRef(null)
    const devRef = useRef(null)
    const mediumRef = useRef(null)
    const ghostKeyRef = useRef(null)
    const ghostUrlRef = useRef(null)

    const hashnodeActiveRef = useRef(null)
    const devActiveRef = useRef(null)
    const mediumActiveRef = useRef(null)
    const ghostActiveRef = useRef(null)

    const currentUserData = useContext(LoginContext)

    const getInfoFromLocalStorage = ()=>{
        if(typeof window === 'undefined') return

        // console.log('Api key is:', props.apiKeys.ghostKey.current)
        // console.log('local storage of key is', localStorage.getItem('ghostKey'))

        hashnodeRef.current.value =
            props.apiKeys.hashnode.current || localStorage.getItem('hashnodeKey')
        
        devRef.current.value =
            props.apiKeys.dev.current || localStorage.getItem('devKey')
        
        mediumRef.current.value =
            props.apiKeys.medium.current || localStorage.getItem('mediumKey')
        
        ghostKeyRef.current.value =
            props.apiKeys.ghostKey.current || localStorage.getItem('ghostKey')
        
        ghostUrlRef.current.value =
            props.apiKeys.ghostUrl.current || localStorage.getItem('ghostUrl')
        
        const alreadyCheckedBoxes = props.checkedBoxes
            
        // console.log("Already checked:", alreadyCheckedBoxes)

        alreadyCheckedBoxes.forEach(box=>{
            switch(box){
                case 'ghost_blog':
                    ghostActiveRef.current.checked = true
                    break
                case 'medium_blog':
                    mediumActiveRef.current.checked = true
                    break
                case 'hashnode_blog':
                    hashnodeActiveRef.current.checked = true
                    break
                case 'dev_blog':
                    devActiveRef.current.checked = true
                    break
            }
        })
    }

    useEffect(async ()=>{              
        //* If can't get it from server,
        //* get it from localstorage  
        
        currentUserData.checkedBoxes.forEach(box=>{
            switch(box){
                case 'ghost_blog':
                    ghostActiveRef.current.checked = true
                    break
                case 'medium_blog':
                    mediumActiveRef.current.checked = true
                    break
                case 'hashnode_blog':
                    hashnodeActiveRef.current.checked = true
                    break
                case 'dev_blog':
                    devActiveRef.current.checked = true
                    break
            }
        })      

        let apiKeys
        if(!currentUserData.apiKeysAcquired && currentUserData.loggedIn){
            const apiFetch = await fetch(`http://localhost:2100/users/${currentUserData.username}`,
                {    
                    method: 'GET',
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${currentUserData.accessToken}`
                    },
                }
            )

            apiKeys = await apiFetch.json()

            if(!apiKeys.found)
                return getInfoFromLocalStorage()
            else{
                currentUserData.apiKeysAcquired = true
                currentUserData.apiKeys = apiKeys
            }
        }

        hashnodeRef.current.value = currentUserData.apiKeys.hashnodeKey        
        devRef.current.value = currentUserData.apiKeys.devKey        
        mediumRef.current.value = currentUserData.apiKeys.mediumKey    
        ghostKeyRef.current.value = currentUserData.apiKeys.ghostKey
        ghostUrlRef.current.value = currentUserData.apiKeys.ghostUrl


    }, [])

    function saveCheckedBoxes(e){
        if(e.target.checked){
            currentUserData.checkedBoxes = [...props.checkedBoxes, e.target.name]
        }
        else
            currentUserData.checkedBoxes = props.checkedBoxes.filter(box=>box !== e.target.name)

        props.updateCheckedBoxes(currentUserData.checkedBoxes)
    }
    
    return (
        <div className={cStyles.connections_container}>
            <p className={cStyles.info}>
                To connect your blog, go to your account settings and look for an area called "API Key" or "API Token." Copy the token for each site you would like to connect and paste it here. Your token will be stored securely, and used to post to your blogs.
            </p>            

            <SingleConnection
                keyHolder = {currentUserData.apiKeys}
                name='hashnode'
                updateKey={props.updateKey}
                keyRef={hashnodeRef}
                saveCheckedBoxes={saveCheckedBoxes}
                activeRef={hashnodeActiveRef}
            />

            <SingleConnection
                keyHolder = {currentUserData.apiKeys}
                name='dev'
                updateKey={props.updateKey}
                keyRef={devRef}
                saveCheckedBoxes={saveCheckedBoxes}
                activeRef={devActiveRef}
            />
            
            <SingleConnection
                keyHolder = {currentUserData.apiKeys}
                name='medium'
                updateKey={props.updateKey}
                keyRef={mediumRef}
                saveCheckedBoxes={saveCheckedBoxes}
                activeRef={mediumActiveRef}
            />

            <div className={cStyles.input_container}>
                
                <div className={cStyles.api_setting}>
                    <input ref={ghostActiveRef} type="checkbox" name="ghost_blog"
                        onClick={saveCheckedBoxes}
                    ></input>            
                    <label className={cStyles.check_label} htmlFor="ghost_blog">Post to Ghost?</label>
                </div>

                <div className={cStyles.connection}>
                    <label htmlFor="ghost_url_connection">Ghost API URL:
                    </label>                                
                    <input className={cStyles.token_input} 
                    placeholder="Enter your Ghost API URL here." 
                    ref={ghostUrlRef}
                    onChange={(e)=>props.updateKey({
                        keyType: 'ghostUrl',
                        newValue: e.target.value
                    })}
                    name="ghost_url_connection" type="text"></input>
                </div>

                <br/>
                <br/>
                
                <div className={cStyles.connection}>
                    <label htmlFor="ghost_connection">Ghost Key/Token:
                    </label>                               
                    <input className={cStyles.token_input} 
                    placeholder="Enter your Ghost Admin API Key here." 
                    ref={ghostKeyRef}
                    onChange={(e)=>props.updateKey({
                        keyType: 'ghostKey',
                        newValue: e.target.value
                    })}
                    name="ghost_connection" type="password"></input>
                </div>
            </div>

        </div>
    )
}

export default Connections
