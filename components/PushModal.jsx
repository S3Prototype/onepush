import pushStyles from '../styles/PushModal.module.css'
import Result from './Result'

function PushModal(props) {
    return (
        <div className={pushStyles.push_modal_container}>
            <div className={pushStyles.background}
                onClick={()=>props.showPushModal(false)}>
            </div>
            
            <div className={pushStyles.modal}>
                <div className={pushStyles.result_list}>
                    {                      
                        props.result ?
                            props.result.map((res, index)=>{
                                return <Result
                                    resultInfo={res}
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
                <button className={pushStyles.close_button} onClick={props.closeModal}>Close</button>
            </div>
        </div>
    )
}

export default PushModal
