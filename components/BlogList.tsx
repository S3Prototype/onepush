import blStyles from '../styles/BlogList.module.css'

function BlogList(props) {
    return (
        <div className={blStyles.list_container}>
            <span>
                {
                    // props.activeBlogs.length > 0 && "Selected Blogs: "
                }
                Selected Blogs: 
            </span>
            {
                props.activeBlogs.map((current, index)=>{
                    current =
                        current.charAt(0).toUpperCase() + current.slice(1)

                    current = current.substring(0, current.indexOf('_blog'))
                    
                    if(index !== props.activeBlogs.length - 1)
                        current += ', '

                    return current
                })
            }
        </div>
    )
}

export default BlogList
