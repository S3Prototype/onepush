import NavBar from './NavBar.jsx'
import Write from './Write.jsx'
import PushButton from './PushButton.jsx'
import {useReducer, useRef, useContext, useEffect, useState} from 'react'
import Connections from './Connections'
import Preview from './Preview'
import PushModal from './PushModal'
import preReq from '../utils/PreRequestMethods'
import BlogList from './BlogList'
import Support from './Support'
import User from './User'
import LoginModal from './LoginModal'
import LoginButton from './LoginButton'
import {pushToBackend} from '../utils/RequestMethods'
import { LoginContext } from '../contexts/LoginContext.jsx'

export default function Home() {

  const [userKeys, setUserKeys] = useReducer((keys, {keyType, newValue})=>{
    
    const userData = useContext(LoginContext)
    console.log('Here is the dispatch we were given:', keyType + ' ' + newValue)
    console.log('==========================')
    console.log('Our old userkeys will be', keys)
    console.log('==========================')
    const foundKey = Object.keys(keys).find(name=>name === keyType)
    // const tempKeyObject = userKeys
    if(foundKey)
      keys[foundKey] = newValue

    userData.apiKeys = keys
    console.log('Our new userkeys will be', keys)
    console.log("Our userdata api keys", userData.apiKeys)
    return keys
  },
  { //initial object
    devKey: getLocalStorageOrNothing('devKey'),
    mediumKey: getLocalStorageOrNothing('mediumKey'),
    hashnodeKey: getLocalStorageOrNothing('hashnodeKey'),
    ghostKey: getLocalStorageOrNothing('ghostKey'),
    ghostUrl: getLocalStorageOrNothing('ghostUrl'),
  })//end of useReducer

  function getLocalStorageOrNothing(key){
    if(typeof localStorage !== 'undefined')
      return localStorage.getItem(key)

    return ''
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

//! Probably need useReducer for a lot of this stuff.
  useEffect(()=>{
    prev.text.current = blogText
    prev.title.current = blogTitle
    prev.subTitle.current = blogSubTitle
    prev.tags.current = Array.isArray(blogTags) ? blogTags.join(', ') : []
    
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

  const [pageToShow, setPageToShow] = useReducer((page, newPage)=>{
    switch(newPage){
      case 'preview':
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
      case 'connections':
        return <Connections
        apiKeys={apiKeys}
        checkedBoxes={activeBlogs}
        updateKey={setUserKeys}
        updateCheckedBoxes={checkedArray=>{
          console.log("Active blogs", activeBlogs)
          console.log("Checkedarray", checkedArray)
            setActiveBlogs(checkedArray)
            localStorage.setItem('checkedBoxes', checkedArray.toString())              
        }}
      />
      default:
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
    }
  },
  writePage()
  )

  function writePage(){
    return (
      <Write
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
    )
  }

  function connectionsPage(){
    return <Connections
          apiKeys={apiKeys}
          checkedBoxes={activeBlogs}
          updateKey={setUserKeys}
          updateCheckedBoxes={checkedArray=>{
            console.log("Active blogs", activeBlogs)
            console.log("Checkedarray", checkedArray)
              setActiveBlogs(checkedArray)
              localStorage.setItem('checkedBoxes', checkedArray.toString())              
          }}
        />
  }

  function previewPage(){
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

  function showPage(){
    switch(pageToShow){
      case "write":
        return ( 
          <Write
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
        )
      
      case "connections":
        return <Connections
          apiKeys={apiKeys}
          checkedBoxes={activeBlogs}
          updateKey={setUserKeys}
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

    //* Refactored for now
  function parseAndSetTags(rawTagText){
    //Split out the tags, which should be split by commas.
    //Then add them to an array and setBlogTags(thearray).    
    if(!rawTagText || rawTagText.length <= 0){
      setBlogTags([])
      console.log('Blog tags should be empty', blogTags)
      return
    }

      //First remove the spaces
    rawTagText = rawTagText.split(' ').join('')
    
    //Then split based on commas
    if(rawTagText.includes(','))
      rawTagText = rawTagText.split(',')
    else
      rawTagText = [rawTagText]
    
    console.log(blogTags)
    setBlogTags(rawTagText)
  }

    //* Refactored for now
    // console.log("Api keys:", userKeys)
  async function pushPost(){
    setPushModalActive(true)
    const blogData = {
      blogTitle,
      blogText,
      blogSubTitle,
      blogTags,

      headerFile,
      headerFileName: prev.headerFileName.current,
      headerUrl,
      headerAndBlogText: prev.headerAndBlogText.current, 

      apiKeys: userKeys,

      devKey,
      mediumKey,
      hashnodeKey,
      ghostUrl,
      ghostKey,

      activeBlogs
    }

    const errorFound = preReq.findErrorsInPost(blogData)
    if(errorFound){
      setPushResult(errorFound)
      return
    }

    setPushResult(await pushToBackend(blogData))
  }

  const [pushModalActive, setPushModalActive] = useState(false)
  const [pushResult, setPushResult] = useState(null)
  
  const [loginModalActive, setLoginModalActive] = useState(false)

  const [counter, setCounter] = useState(0)
  useEffect(()=>console.log("rerender", new Date().toLocaleTimeString()),
    [counter])
  
  function showLoginModal(newModalState){
    setLoginModalActive(newModalState)
    //Curious if this will force a re-render:
    // setPageToShow("connections")
    setCounter(counter+1)
  }

  return (
    <div className="app_container">
      <LoginButton
          setLoginModalActive={setLoginModalActive}
          loginModalActive={loginModalActive}
      />
      <PushButton submit={pushPost} />
      <NavBar changePage={changePage}/>
      <BlogList activeBlogs={activeBlogs}/>      
      <PushModal
        setPushModalActive={setPushModalActive}
        pushModalActive={pushModalActive}
        result={pushResult}
        closeModal={()=>setPushModalActive(false)}
      />      
      <LoginModal
        showLoginModal={showLoginModal}
        loginModalActive={loginModalActive}
      />
      {pageToShow}
      <Support />
    </div>
  )
}
