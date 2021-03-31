import write from '../styles/Write.module.css'
import EditorButtons from './EditorButtons'
import {useEffect, useState, useRef} from 'react'

export default function Write(props) {
    const textRef = useRef(null)
    const titleRef = useRef(null)
    const subTitleRef = useRef(null)
    const tagRef = useRef(null)
    useEffect(()=>{
        textRef.current.value = props.prev.text.current
        titleRef.current.value = props.prev.title.current
        // subTitleRef.current.value = props.prev.subTitle.current
        tagRef.current.value = props.prev.tags.current

        if(props.prev.headerUrl.current)
            addHeaderUrl(props.prev.headerUrl.current)
                
        if(props.prev.headerFile.current)
            addHeaderFile(props.prev.headerFile.current)

            //Tags are complicated, because the state stores
            //an array, not a string. I think.
    }, [])

    const [previewImageSrc, setPreviewImageSrc] = useState('')

    const imagePreviewRef = useRef(null)
    const urlPreviewRef = useRef(null)
    function loadFile(e) {
        if(e.target.files.length > 0)
            addHeaderFile(e.target.files[0])
    }

    function freeImageMemory(){
        URL.revokeObjectURL(previewImageSrc)
    }

    function changeImageUpload(){
        imagePreviewRef.current.click()
    }

    function setUrlPreviewImage(e){
        // if(!e.target.value.includes('http') ||
        //     !e.target.value.includes('.')){
        //         return
        // }
        addHeaderUrl(e.target.value)
    }

    function addHeaderFile(file){        
        console.log(file)
        setPreviewImageSrc(URL.createObjectURL(file));
        props.update.headerFile(file)        
        props.update.headerUrl('')
        urlPreviewRef.current.value = ''
    }

    function addHeaderUrl(url){
        setPreviewImageSrc(url)
        props.update.headerUrl(url)
        props.update.headerFile(null)
        urlPreviewRef.current.value = url
    }

    return (
            <div className={write.editor_container}>
                <div className={write.header_container}>
                    <img className={write.previewImage} onLoad={freeImageMemory} src={previewImageSrc}  id="preview"></img>

                    <span className={write.upload_name}>{previewImageSrc ? "" : "No image set."}</span>

                    <input ref={urlPreviewRef} className={write.url_preview_input} placeholder="Paste the url for your header image."
                    onChange={setUrlPreviewImage}>
                    </input>
                </div>

                <label htmlFor="blogTitle"></label>
                <input name="blogTitle" id="blogTitle" type="text"
                className={write.title_input}
                placeholder="Title"
                onInput={(e)=>props.update.blogTitle(e.target.value)}
                ref={titleRef}
                />

                {/* <input type="text" name="blogSubTitle" id="subtitle"
                className={write.title_input} id="blogSubTitle"
                placeholder="Subtitle"
                onChange={(e)=>props.update.blogSubTitle(e.target.value)}
                ref={subTitleRef}
                /> */}
                
                {/* <EditorButtons/> */}
                
                <textarea className={write.blog_text_area}
                    placeholder="Write your message for the world."
                    onChange={(e)=>props.update.blogText(e.target.value)}
                    ref={textRef}
                >
                </textarea>
                
                <input type="text" className={write.tags} name="tags" id="tags"
                    ref={tagRef}
                    placeholder="Add your tags, separated by commas"
                    onChange={(e)=>props.update.blogTags(e.target.value)}
                />               
            </div> 
    )
}
