import ebStyles from '../styles/EditorButtons.module.css'

function EditorButtons() {
    return (
        <div className={ebStyles.button_container}>
            <button>B</button>
            <button>I</button>
            <button>U</button>
        </div>
    )
}

export default EditorButtons