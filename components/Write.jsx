import write from '../styles/Write.module.css'
import EditorButtons from './EditorButtons'
import {useEffect, useState, useRef} from 'react'

export default function Write(props) {
    const textRef = useRef(null)
    const titleRef = useRef(null)
    const subTitleRef = useRef(null)
    const tagRef = useRef(null)
    useEffect(()=>{

        // const mutation = `mutation {
        //         postToMedium(
        //           userID:"1e0249d6b472fc760dd1ef02054b9543b046a283d64827ac3751cb861f3e35e12",
        //           title:"takeshape test 3",
        //           contentFormat:"markdown",
        //           content:"#Testing! <br />*testing*",
        //           publishStatus:"public",
        //         ) {
        //            data {
        //             id
        //             title
        //         }
        //     }
        // }`

        // const mutation = `mutation {
        //   postToDev(
        //     api_key:${userApiKey},
        //     title:${userBlogpostTitle},
        //     body_markdown:${userBlogpostMarkdown},
        //     published:${shouldPublish}
        //   )
        //   {
        //     url
        //   }
        // }`

        // fetch('https://api.takeshape.io/project/187e885f-95e2-4e30-a3e9-dc57dbd8ef1c/v3/graphql', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer 9906a5609aad434897fd022f5edb5bd0'
        //     },
        //     body: JSON.stringify({query: mutation})
        // }).then(res => {
        // return res.json();
        // }).then(json => {
        // console.log(json)
        // })

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
                placeholder="Write Your Title Here"
                onInput={(e)=>props.update.blogTitle(e.target.value)}
                ref={titleRef}
                />

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
