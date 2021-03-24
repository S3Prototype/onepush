import cStyles from '../styles/Connections.module.css'
import {useRef, useEffect} from 'react'

function Connections(props) {

    const hashnodeRef = useRef('')
    const devRef = useRef('')
    const mediumRef = useRef('')

    useEffect(()=>{
        hashnodeRef.current.value = props.apiKeys.hashnode.current
        devRef.current.value = props.apiKeys.dev.current
        mediumRef.current.value = props.apiKeys.medium.current
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
                onChange={(e)=>props.updateHashnodeKey(e.target.value)}
                type="text">                    
                </input>
            </div>
            
            <div className={cStyles.connection}>
                <label htmlFor="dev_connection">DEV.to Key/Token:
                </label>                                
                <input className={cStyles.token_input} 
                placeholder="Enter your DEV API Key here." 
                ref={devRef}
                onChange={(e)=>props.updateDevKey(e.target.value)}
                name="dev_connection" type="text"></input>
            </div>
            
            <div className={cStyles.connection}>
                <label htmlFor="medium_connection">Medium Key/Token:
                </label>                                
                <input className={cStyles.token_input} 
                placeholder="Enter your Medium API Key here." 
                ref={mediumRef}
                onChange={(e)=>props.updateMediumKey(e.target.value)}
                name="medium_connection" type="text"></input>
            </div>
        </div>
    )
}

export default Connections
