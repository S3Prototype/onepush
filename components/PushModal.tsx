import pushStyles from '../styles/PushModal.module.css'
import Result from '../components/Result'

function PushModal({result, showPushModal}) {
    return (
        <>
            <div className={pushStyles.background}
                onClick={()=>showPushModal(false)}>
            </div>
            
            <div className={pushStyles.modal}>
                {                      
                    result ?
                        result.map((res, index)=>{
                            return <Result
                                message={res.message}
                                data={res.data}
                                key={index}
                            />                            
                        })

                    :

                    <>
                        <img className={pushStyles.loading} src='https://i.imgur.com/llF5iyg.gif'></img>
                        <span>Submitting posts...</span>
                    </>
                }      
            </div>
        </>
    )
}

export default PushModal
