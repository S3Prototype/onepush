import pushStyles from '../styles/PushModal.module.css'

function Result({message, data}) {
    const messageType =
        message === 'Error' ?
            pushStyles.error_message
            :
            pushStyles.success_message
    return (
        <div className={pushStyles.result_container}>
            <span className={`${pushStyles.result_message} ${messageType}`}>{message}:</span>
            <span className={pushStyles.result}>{data}</span>                                
        </div>
    )
}

export default Result
