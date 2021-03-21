import write from '../styles/Write.module.css'
import EditorButtons from '../components/EditorButtons'

export default function Write(props) {
    return (
        <>
            <div className={write.editor_container}>
                <label htmlFor="blogTitle"></label>
                <input name="blogTitle" id="blogTitle" type="text"
                className={write.title_input}
                placeholder="Title"
                onInput={(e)=>props.updateBlogTitle(e.target.value)}
                />

                <input type="text" name="blogSubTitle"
                className={write.title_input} id="blogSubTitle"
                placeholder="Subtitle"
                onChange={(e)=>props.updateBlogSubTitle(e.target.value)}
                />
                
                <EditorButtons/>

                <textarea className={write.blog_text_area}
                placeholder="Write your message for the world."
                onChange={(e)=>props.updateBlogText(e.target.value)}
                ></textarea>
                
                <input type="text" className={write.tags} name="tags" id="tags"
                onChange={(e)=>props.updateBlogTags(e.target.value)}
                />               
            </div>            
        </>
    )
}
