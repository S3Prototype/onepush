import NavBar from '../components/NavBar.tsx'
import Write from '../components/Write.tsx'
import PushButton from '../components/PushButton.tsx'
import {useRef, useEffect, useState} from 'react'
import Connections from '../components/Connections'
// import hashnode from '../components/hashnode'


export default function Home() {

  const [pageToShow, setPageToShow] = useState("write")

  function showPage(){
    switch(pageToShow){
      case "write":
        return <Write 
          updateBlogText={setBlogText}
          updateBlogTitle={setBlogTitle}
          updateBlogSubTitle={setBlogSubTitle}
          updateBlogTags={parseAndSetTags}
          prev={prev}
        />
      
      case "connections":
        return <Connections
          apiKeys={apiKeys}
          updateDevKey={setDevKey}
          updateMediumKey={setMediumKey}
          updateHashnodeKey={setHashnodeKey}
        />
    }

    return null
  }

  function changePage(rawPageName){
    setPageToShow(rawPageName.substring(0, rawPageName.indexOf("Button")))
  }

  const [devKey, setDevKey] = useState('')
  const [mediumKey, setMediumKey] = useState('')
  const [hashnodeKey, setHashnodeKey] = useState('')

  const apiKeys = {
    dev: useRef(''),
    medium: useRef(''),
    hashnode: useRef(''),
  }

  useEffect(()=>{
    apiKeys.dev.current = devKey
    apiKeys.medium.current = mediumKey
    apiKeys.hashnode.current = hashnodeKey

  }, [devKey, mediumKey, hashnodeKey])


  const [blogText, setBlogText] = useState("")
  const [blogTitle, setBlogTitle] = useState("")
  const [blogSubTitle, setBlogSubTitle] = useState("")
  const [blogTags, setBlogTags] = useState([])

  const prev = {
    text: useRef(''),
    title: useRef(''),
    subTitle: useRef(''),
    tags: useRef(''),
  }

  useEffect(()=>{
    prev.text.current = blogText
    prev.title.current = blogTitle
    prev.subTitle.current = blogSubTitle
    prev.tags.current = blogTags.join(', ')
  }, [blogText, blogTitle, blogSubTitle, blogTags])

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

  function makePost(){
    fetch('/api/write_post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        blogTitle,
        blogText,
        blogSubTitle,
        blogTags,

        devKey,
        mediumKey,
        hashnodeKey
      }),
    })
    .then(res => res.json())
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
