import cStyles from '../styles/Connections.module.css'
import {useRef, useEffect} from 'react'

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

    useEffect(()=>{        
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
        
    }, [])

    function saveCheckedBoxes(e){
        if(e.target.checked){
            var checkedArray = [...props.checkedBoxes, e.target.name]
        }
        else
            checkedArray = props.checkedBoxes.filter(box=>box !== e.target.name)

        // console.log('checkedArray after removal', checkedArray)

        props.updateCheckedBoxes(checkedArray)
    }
    
    return (
        <div className={cStyles.connections_container}>
            <p className={cStyles.info}>
                To connect your blog, go to your account settings and look for an area called "API Key" or "API Token." Copy the token for each site you would like to connect and paste it here. Your token will be stored securely, and used to post to your blogs.
            </p>
            <div className={cStyles.input_container}>
                
                <div className={cStyles.api_setting}>
                    <input type="checkbox" name="hashnode_blog"
                        ref={hashnodeActiveRef} 
                        onClick={saveCheckedBoxes}
                    ></input>            
                    <label className={cStyles.check_label} htmlFor="hashnode_blog">Post to Hashnode?</label>
                </div>
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
            </div>

            <div className={cStyles.input_container}>
                
                <div className={cStyles.api_setting}>
                    <input ref={devActiveRef} type="checkbox" name="dev_blog"
                        onClick={saveCheckedBoxes}
                    ></input>            
                    <label className={cStyles.check_label} htmlFor="dev_blog">Post to DEV?</label>
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
            </div>

            <div className={cStyles.input_container}>
                
                <div className={cStyles.api_setting}>
                    <input ref={mediumActiveRef} type="checkbox" name="medium_blog"
                        onClick={saveCheckedBoxes}
                    ></input>            
                    <label className={cStyles.check_label} htmlFor="medium_blog">Post to Medium?</label>
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
            </div>

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
                    onChange={(e)=>props.updateGhostUrl({
                        name: 'ghostUrl',
                        value: e.target.value
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
                    onChange={(e)=>props.updateGhostKey({
                        name: 'ghostKey',
                        value: e.target.value
                    })}
                    name="ghost_connection" type="password"></input>
                </div>
            </div>

        </div>
    )
}

export default Connections
