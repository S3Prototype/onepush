import React, {useContext, useRef, useState} from 'react'
import cStyles from '../styles/Connections.module.css'
import {LoginContext} from '../contexts/LoginContext'

function ConnectionCheckBox(props) {

    // const currentUserData = useContext(LoginContext)
    
    // checkRef
    const [checkState, setCheckState] = useState(false)
    
    const checkRef = useRef('')

    return (
        <div className={cStyles.api_setting}>
                <input
                    ref={props.activeRef}
                    type="checkbox"
                    name={props.blogName}
                    onClick={props.saveCheckedBoxes}
                >
                </input>            
                <label
                    className={cStyles.check_label} 
                    htmlFor={props.blogName}
                >
                    Post to {props.capitalizedName}?
                </label>
        </div>
    )
}

export default ConnectionCheckBox