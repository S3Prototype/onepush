import cStyles from '../styles/Connections.module.css'
import {useRef, useEffect} from 'react'

function Connections(props) {

    const hashnodeRef = useRef('')
    const devRef = useRef('')
    const mediumRef = useRef('')
    const ghostKeyRef = useRef('')
    const ghostUrlRef = useRef('')

    useEffect(()=>{        
        if(typeof window === 'undefined') return

        hashnodeRef.current.value = localStorage.getItem('hashnodeKey') || props.apiKeys.hashnode.current
        
        devRef.current.value =
            props.apiKeys.dev.current || localStorage.getItem('devKey')
        
        mediumRef.current.value =
            props.apiKeys.medium.current || localStorage.getItem('mediumKey')
        
        ghostKeyRef.current.value =
            props.apiKeys.ghostKey.current || localStorage.getItem('ghostKey')
        
        ghostUrlRef.current.value =
            props.apiKeys.ghostUrl.current || localStorage.getItem('ghostUrl')
    }, [])
    
    return (
        <div className={cStyles.connections_container}>

            <p className={cStyles.info}>
                To connect your blog, go to your account settings and look for an area called "API Key" or "API Token." Copy the token for each site you would like to connect and paste it here. Your token will be stored securely, and used to post to your blogs.
            </p>
            <div className={cStyles.connection}>
                <label htmlFor="hashnode_connection">Hashnode Key/Token:
                </label>
                <input className={cStyles.token_input}
                placeholder="Enter your hashnode API Key here." name="hashnode_connection" 
                ref={hashnodeRef}
                onChange={(e)=>props.updateHashnodeKey({
                    name: 'hashnodeKey',
                    value: e.target.value
                })}
                type="password">                    
                </input>
            </div>
            
            <div className={cStyles.connection}>
                <label htmlFor="dev_connection">DEV.to Key/Token:
                </label>                                
                <input className={cStyles.token_input} 
                placeholder="Enter your DEV API Key here." 
                ref={devRef}
                onChange={(e)=>props.updateDevKey({
                    name: 'devKey',
                    value: e.target.value
                })}
                name="dev_connection" type="password"></input>
            </div>
            
            <div className={cStyles.connection}>
                <label htmlFor="medium_connection">Medium Key/Token:
                </label>                                
                <input className={cStyles.token_input} 
                placeholder="Enter your Medium API Key here." 
                ref={mediumRef}
                onChange={(e)=>props.updateMediumKey({
                    name: 'mediumKey',
                    value: e.target.value
                })}
                name="medium_connection" type="password"></input>
            </div>
                        
            <div className={cStyles.connection}>
                <label htmlFor="ghost_url_connection">Ghost API URL:
                </label>                                
                <input className={cStyles.token_input} 
                placeholder="Enter your Ghost API URL here." 
                ref={ghostUrlRef}
                onChange={(e)=>props.updateGhostUrl({
                    name: 'ghostUrl',
                    value: e.target.value
                })}
                name="ghost_url_connection" type="text"></input>
            </div>

            <div className={cStyles.connection}>
                <label htmlFor="ghost_connection">Ghost Key/Token:
                </label>                                
                <input className={cStyles.token_input} 
                placeholder="Enter your Ghost Admin API Key here." 
                ref={ghostKeyRef}
                onChange={(e)=>props.updateGhostKey({
                    name: 'ghostKey',
                    value: e.target.value
                })}
                name="ghost_connection" type="password"></input>
            </div>
        </div>
    )
}

export default Connections
