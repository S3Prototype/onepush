import NavBar from '../components/NavBar.jsx'
import Write from '../components/Write.jsx'
import PushButton from '../components/PushButton.jsx'
import {useRef, useEffect, useState} from 'react'
import Connections from '../components/Connections'
import Preview from '../components/Preview'
import PushModal from '../components/PushModal'
import preReq from '../utils/PreRequestMethods'
import customError from '../utils/ErrorMessages'
import BlogList from '../components/BlogList'

export default function Home() {

  const [pageToShow, setPageToShow] = useState("write")

  function showPage(){
    switch(pageToShow){
      case "write":
        return <Write
          update =
          {
            {
              blogText: setBlogText,
              blogTitle: setBlogTitle,
              blogSubTitle: setBlogSubTitle,
              blogTags: parseAndSetTags,
              headerFile: parseAndSetHeaderFile,
              headerUrl: setHeaderUrl
            }
          }
          prev={prev}
        />
      
      case "connections":
        return <Connections
          apiKeys={apiKeys}
          checkedBoxes={activeBlogs}
          updateDevKey={valObject=>setKeyData(valObject, setDevKey)}
          updateMediumKey={valObject=>setKeyData(valObject, setMediumKey)}
          updateHashnodeKey={valObject=>setKeyData(valObject, setHashnodeKey)}
          updateGhostKey={valObject=>setKeyData(valObject, setGhostKey)}
          updateGhostUrl={valObject=>setKeyData(valObject, setGhostUrl)}
          updateCheckedBoxes={checkedArray=>{
            console.log("Active blogs", activeBlogs)
            console.log("Checkedarray", checkedArray)
              setActiveBlogs(checkedArray)
              localStorage.setItem('checkedBoxes', checkedArray.toString())              
          }}
        />

      case "preview":
          return <Preview 
            info={
              {
                blogText,
                blogTitle,
                blogSubTitle,
                blogTags,
                headerUrl
              }
            }              
          />
    }

    return null
  }

  function setKeyData(val, setterMethod){
    localStorage.setItem(val.name, val.value)
    setterMethod(val.value)
  }

  function parseAndSetHeaderFile(file){
    if(!file || file.length <= 0 ){
      prev.headerFileName.current = ''
      return
    }

    console.log(file.name)
    const formData = new FormData()
    formData.append('image', file)
    prev.headerFileType.current = file.type
    prev.headerFileName.current = file.name
    setHeaderFile(formData)
  }

  function changePage(rawPageName){
    setPageToShow(rawPageName.substring(0, rawPageName.indexOf("Button")))
  }

  const [devKey, setDevKey] = useState('')
  const [mediumKey, setMediumKey] = useState('')
  const [hashnodeKey, setHashnodeKey] = useState('')
  const [ghostKey, setGhostKey] = useState('')
  const [ghostUrl, setGhostUrl] = useState('')

  const [activeBlogs, setActiveBlogs] = useState([])
  const [blogString, setBlogString] = useState(false)

  const apiKeys = {
    dev: useRef(''),
    medium: useRef(''),
    hashnode: useRef(''),
    ghostKey: useRef(''),
    ghostUrl: useRef(''),
  }

  useEffect(()=>{
    if(typeof window === "undefined") return

    apiKeys.dev.current = devKey
    
    apiKeys.medium.current = mediumKey
    
    apiKeys.hashnode.current = hashnodeKey
    
    apiKeys.ghostKey.current = ghostKey
    
    apiKeys.ghostUrl.current = ghostUrl    

}, [devKey, mediumKey, hashnodeKey, ghostKey, ghostUrl])


  const [blogText, setBlogText] = useState("")
  const [blogTitle, setBlogTitle] = useState("")
  const [blogSubTitle, setBlogSubTitle] = useState("")
  const [blogTags, setBlogTags] = useState([])
  
  const [headerFile, setHeaderFile] = useState(null)
  const [headerUrl, setHeaderUrl] = useState('')

  const prev = {
    text: useRef(''),
    title: useRef(''),
    subTitle: useRef(''),
    tags: useRef(''),
    headerFile: useRef(null),
    headerUrl: useRef(''),
    headerFileName: useRef(''),
    headerFileType: useRef(''),
    headerAndBlogText: useRef(''),
  }

  useEffect(()=>{
    prev.text.current = blogText
    prev.title.current = blogTitle
    prev.subTitle.current = blogSubTitle
    prev.tags.current = blogTags.join(', ')
    
    prev.headerFile.current = headerFile
    prev.headerUrl.current = headerUrl
    prev.headerAndBlogText.current = 
      `![Cover Image/Header Image for 
        ${blogTitle}](${headerUrl})
        <br>${blogText}`  

    const storedKeys = {
      devKey: localStorage.getItem('devKey'),
      mediumKey: localStorage.getItem('mediumKey'),
      hashnodeKey: localStorage.getItem('hashnodeKey'),
      ghostKey: localStorage.getItem('ghostKey'),
      ghostUrl: localStorage.getItem('ghostUrl')
    }

    if(storedKeys['devKey'])
      setDevKey(storedKeys['devKey'])
    
    if(storedKeys['mediumKey'])
      setMediumKey(storedKeys['mediumKey'])
    
    if(storedKeys['hashnodeKey'])
      setHashnodeKey(storedKeys['hashnodeKey'])
    
    if(storedKeys['ghostKey'])
      setGhostKey(storedKeys['ghostKey'])
    
    if(storedKeys['ghostUrl'])
      setGhostUrl(storedKeys['ghostUrl'])
  })

  function parseAndSetTags(rawTagText){
    //Split out the tags, which should be split by commas.
    //Then add them to an array and setBlogTags(thearray).    
    if(!rawTagText || rawTagText.length <= 0){
      setBlogTags([])
      console.log(blogTags)
      return
    }

    if(!rawTagText.includes(',')){
      setBlogTags([rawTagText])
      console.log(blogTags)
      return
    }

    rawTagText = rawTagText.split(' ').join('')
    setBlogTags(rawTagText.split(','))
    console.log(blogTags)
  }

  async function makePost(){
    setPushModalActive(true)
    setPushResult(null)

    const errorFound = preReq.findErrorsInPost(blogTitle, blogText, activeBlogs, apiKeys)
    if(errorFound){
      setPushResult([errorFound])
      return
    }

    console.log("Ghost data", {ghostUrl, ghostKey})
    let result
    try{
      result = await fetch('https://onepush-backend.onrender.com/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify({
          blogTitle,
          blogText,
          blogSubTitle,
          blogTags,
  
          headerFile,
          headerFileName: prev.headerFileName.current,
          headerUrl,
          headerAndBlogText: prev.headerAndBlogText.current, 
  
          devKey,
          mediumKey,
          hashnodeKey,
          ghostUrl,
          ghostKey,
  
          activeBlogs
        }),
      })
    } catch(err){
      result = [
        customError.generateError(`Failed to publish your post.  The server may be down for maintenance. ${err}.`)
      ]
      setPushResult(result)
      return
    }

    try{
      result = await result.json()
    } catch(err){
      console.log(err)
      result = err
    }

    console.log('Final result:', result)
    setPushResult(result)
  }

  const [pushModalActive, setPushModalActive] = useState(false)
  const [pushResult, setPushResult] = useState(null)

  const listRef = useRef('')

  useEffect(()=>{
    console.log('blogs:', activeBlogs.map((current, index)=>{
        current =
            current.charAt(0).toUpperCase() + current.slice(1)

        current = current.substring(0, current.indexOf('_blog'))
        
        // if(index !== activeBlogs.length - 1)
        //     current += ', '

        return current
      })
      .join(', ')
    )
  }, [activeBlogs])
  
  return (
    <div className="app_container">
      {
        pushModalActive &&
        <PushModal
          showPushModal={setPushModalActive}
          result={pushResult}
          closeModal={()=>setPushModalActive(false)}
        />
      }
      <PushButton submit={makePost} />
      <NavBar changePage={changePage}/>
      <BlogList activeBlogs={activeBlogs}/>
      {showPage()}

      <span className="contact_info">Many new features are on the way!
        <br/>
        <a href="https://twitter.com/shaquilhansford" target="_blank">Send your questions/suggestions to @shaquilhansford on Twitter!</a>
      </span>
    </div>
  )
}
