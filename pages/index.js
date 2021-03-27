import NavBar from '../components/NavBar.tsx'
import Write from '../components/Write.tsx'
import PushButton from '../components/PushButton.tsx'
import {useRef, useEffect, useState} from 'react'
import Connections from '../components/Connections'
import { updateRestTypeNode } from 'typescript'
import Preview from '../components/Preview'
// import hashnode from '../components/hashnode'


export default function Home() {

  const [pageToShow, setPageToShow] = useState("write")

  function showPage(){
    switch(pageToShow){
      case "write":
        return <Write
          update={
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
          updateDevKey={valObject=>setKeyData(valObject, setDevKey)}
          updateMediumKey={valObject=>setKeyData(valObject, setMediumKey)}
          updateHashnodeKey={valObject=>setKeyData(valObject, setHashnodeKey)}
          updateGhostKey={valObject=>setKeyData(valObject, setGhostKey)}
          updateGhostUrl={valObject=>setKeyData(valObject, setGhostUrl)}
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

  const apiKeys = {
    dev: useRef(''),
    medium: useRef(''),
    hashnode: useRef(''),
    ghostKey: useRef(''),
    ghostUrl: useRef(''),
  }

  useEffect(()=>{

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
    headerAndBlogText: useRef('')
  }

  useEffect(()=>{
    if(typeof window === "undefined") return

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
    
  })
  // }, [blogText, blogTitle, blogSubTitle, blogTags])

  function parseAndSetTags(rawTagText){
    // console.log(`Raw tags are: ${rawTagText}`)
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

    fetch('http://localhost:2100/api/write', {
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
        ghostKey
      }),
    })
    .catch(err=>console.log(err))
    // .then(res => res.json())
    .then(res => console.log(JSON.stringify(res)))
  }

  return (
    <div className="app_container">
      <PushButton submit={makePost} />
      <NavBar changePage={changePage}/>
      {/* <div className="page_container"> */}
        {
          showPage()
        }
        {/* <Write 
          updateBlogText={setBlogText}
          updateBlogTitle={setBlogTitle}
          updateBlogSubTitle={setBlogSubTitle}
          updateBlogTags={parseAndSetTags}
        /> */}
      {/* </div> */}
    </div>
  )
}
