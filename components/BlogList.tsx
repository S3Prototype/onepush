import blStyles from '../styles/BlogList.module.css'
import {useEffect, useRef, useState} from 'react'

function BlogList(props) {

    const [currentBlogList, setCurrentBlogList] = useState([])

    function showActiveBlogs(){
        return ' ' + currentBlogList.map((current, index)=>{
            current =
                current.charAt(0).toUpperCase() + current.slice(1)
            current = current.substring(0, current.indexOf('_blog'))
            return current
        }).join(', ')
    }

    const listText = useRef(null)
    useEffect(()=>{
        listText.current.innerHTML = showActiveBlogs()
    }
    , [currentBlogList]
    )

    return (
        <div className={blStyles.list_container}>
            <span>
                Selected Blogs:
            </span>
            {
                currentBlogList.length !== props.activeBlogs.length &&
                setCurrentBlogList(props.activeBlogs)                  
            }            
            <span ref={listText} className={blStyles.blog_list}>                
            </span>
        </div>
    )
}

export default BlogList
