import React from 'react'
import cStyles from '../styles/Connections.module.css'

function Key(props) {
    return (
        <div className={cStyles.connection}>
            <label htmlFor={props.connectionName}>{props.capitalizedName} Key/Token:
            </label>                                
            <input className={cStyles.token_input} 
                placeholder={`Enter your ${props.capitalizedName} API Key here.`}
                ref={props.keyRef}
                onChange={(e)=>props.updateKey({
                    keyType: props.keyName,
                    newValue: e.target.value
                })}
                name={props.connectionName}
                type="password"
                autoComplete="no"                
            >
            </input>
        </div>
    )
}

export default Key
