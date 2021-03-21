import pushStyles from '../styles/PushButton.module.css'



function PushButton({submit}) {
    return (
        <button onClick={submit} className={pushStyles.push_button}>
            Push
        </button>
    )
}

export default PushButton
