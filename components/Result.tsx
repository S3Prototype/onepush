import pushStyles from '../styles/PushModal.module.css'

function Result({resultInfo}) {
    const messageType =
    resultInfo.message === 'Error' ?
            pushStyles.error_message
            :
            pushStyles.success_message
    return (
        <div className={pushStyles.result_container}>
            <span className={`${pushStyles.result_message} ${messageType}`}>{resultInfo.message}:</span>
            <span className={pushStyles.result}>{resultInfo.data}</span>
            {
                resultInfo.message === 'Success' && resultInfo.url ?
                    <a className={pushStyles.external_link} target="_blank" href={resultInfo.url}>
                        Share Link
                    </a>                                
                    :
                    <span className={pushStyles.external_link}>No share url returned.</span>
            }
        </div>
    )
}

export default Result
