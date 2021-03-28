const showdown  = require('showdown')
import previewStyles from '../styles/Preview.module.css'
import {useEffect} from 'react'

function Preview({info}) {
    const converter = new showdown.Converter()
    const text      = '# hello, markdown!'
    const html      = converter.makeHtml(text);
    console.log(html)

    useEffect(()=>{


    },[])
    console.log(info)
    return (
            <div className={previewStyles.container}>
                <img src={info.headerUrl}>
                </img>
                <h1
                    className={previewStyles.title} 
                    dangerouslySetInnerHTML={
                        { __html: converter.makeHtml(info.blogTitle) }
                    }
                >
                </h1>                
                <h2
                    className={previewStyles.sub_title} 
                    dangerouslySetInnerHTML={
                        { __html: converter.makeHtml(info.blogSubTitle) }
                    }
                >
                </h2>          
                <span 
                    className={previewStyles.tags}
                    dangerouslySetInnerHTML={
                        { __html: `tags: ${converter.makeHtml(info.blogTags.join(', '))}` }
                    }
                >
                </span>              
                <span 
                    className={previewStyles.text}
                    dangerouslySetInnerHTML={
                        { __html: converter.makeHtml(info.blogText) }
                    }
                >
                </span>                   
            </div>
    )
}

export default Preview
