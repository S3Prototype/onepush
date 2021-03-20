import write from '../styles/Write.module.css'
import EditorButtons from '../components/EditorButtons.tsx'

export default function Write() {
    return (
        <>
            <div className={write.editor_container}>
                <label htmlFor="blogTitle"></label>
                <input name="blogTitle" id="blogTitle" type="text" className={write.title_input}
                placeholder="Title"
                />

                <input type="text" name="blogSubTitle"
                className={write.title_input} id="blogSubTitle"
                placeholder="Subtitle"
                />
                
                <EditorButtons/>

                <textarea className={write.blog_text_area}
                placeholder="Write your message for the world."
                ></textarea>
                
                <input type="text" className={write.tags} name="tags" id="tags"
                />               
            </div>            
        </>
    )
}
