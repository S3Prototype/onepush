import React from 'react'
import cStyles from '../styles/Connections.module.css'
import ConnectionCheckBox from './ConnectionCheckBox'
import Key from './Key'

function SingleConnection(props) {
    const blogName = props.name+'_blog'
    const capitalizedName = props.name.trim().replace(/^\w/, (c) => c.toUpperCase())
    const connectionName = props.name+'_connection'
    const keyName = props.name+'Key'
    // props.keyRef.current.value = props.keyHolder[keyName]
    console.log(keyName)
    return (        
        <form className={cStyles.input_container}>          

            {/* Here we'll add a component that conditionally appears if necessary, and asks for the API url */}
            
            <ConnectionCheckBox 
                activeRef={props.activeRef}
                saveCheckedBoxes={props.saveCheckedBoxes}
                blogName={blogName}
                saveCheckedBoxes={props.saveCheckedBoxes}
                capitalizedName={capitalizedName}
            />

            <Key 
                updateKey={props.updateKey}
                keyName={keyName}
                connectionName={connectionName}
                blogName={blogName}
                capitalizedName={capitalizedName}
                keyRef={props.keyRef} 
            />
            
        </form>
    )
}

export default SingleConnection
