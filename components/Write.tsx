import write from '../styles/Write.module.css'
import EditorButtons from '../components/EditorButtons'
import {useEffect, useState, useRef} from 'react'

export default function Write(props) {
    const textRef = useRef('')
    const titleRef = useRef('')
    const subTitleRef = useRef('')
    const tagRef = useRef('')
    useEffect(()=>{
        textRef.current.value = props.prev.text.current
        titleRef.current.value = props.prev.title.current
        subTitleRef.current.value = props.prev.subTitle.current
        tagRef.current.value = props.prev.tags.current
            //Tags are complicated, because the state stores
            //an array, not a string. I think.
    }, [])

    const [previewImageSrc, setPreviewImageSrc] = useState('')

    const imagePreviewRef = useRef('')

    function loadFile(e) {
        setPreviewImageSrc(URL.createObjectURL(e.target.files[0]));
    }

    function freeImageMemory(){
        URL.revokeObjectURL(previewImageSrc)
    }

    function changeImageUpload(){
        imagePreviewRef.current.click()
    }

    return (
            <div className={write.editor_container}>
                <div className={write.header_container}>
                    <img className={write.previewImage} onLoad={freeImageMemory} src={previewImageSrc}  id="preview"></img>
                    <form>
                        <label onClick={changeImageUpload} className={write.image_upload_label} htmlFor="image_upload">Click Here to Upload Your Header Image
                            <input className={write.image_upload_button} onChange={loadFile} type="file" ref={imagePreviewRef} id="imageUpload" name="image_upload" accept="image/*">                        
                            </input>
                        </label>
                    </form>

                    {/* <span className={write.upload_name}>{previewImageSrc}</span> */}

                    <input className={write.url_preview} placeholder="Or use a url for your header image instead.">
                    </input>
                </div>

                <label htmlFor="blogTitle"></label>
                <input name="blogTitle" id="blogTitle" type="text"
                className={write.title_input}
                placeholder="Title"
                onInput={(e)=>props.updateBlogTitle(e.target.value)}
                ref={titleRef}
                />

                <input type="text" name="blogSubTitle"
                className={write.title_input} id="blogSubTitle"
                placeholder="Subtitle"
                onChange={(e)=>props.updateBlogSubTitle(e.target.value)}
                ref={subTitleRef}
                />
                
                <EditorButtons/>
                
                <textarea className={write.blog_text_area}
                    placeholder="Write your message for the world."
                    onChange={(e)=>props.updateBlogText(e.target.value)}
                    ref={textRef}
                >
                </textarea>
                
                <input type="text" className={write.tags} name="tags" id="tags"
                    ref={tagRef}
                    placeholder="Add your tags, separated by commas"
                    onChange={(e)=>props.updateBlogTags(e.target.value)}
                />               
            </div> 
    )
}
