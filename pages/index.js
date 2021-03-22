import NavBar from '../components/NavBar.tsx'
import Write from '../components/Write.tsx'
import PushButton from '../components/PushButton.tsx'
import {useState} from 'react'
import Connections from '../components/Connections'


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
        />
      
      case "connections":
        return <Connections />
    }

    return null
  }

  function changePage(rawPageName){
    setPageToShow(rawPageName.substring(0, rawPageName.indexOf("Button")))
  }

  const [blogText, setBlogText] = useState("")
  const [blogTitle, setBlogTitle] = useState("")
  const [blogSubTitle, setBlogSubTitle] = useState("")
  const [blogTags, setBlogTags] = useState([])

  function parseAndSetTags(rawTagText){
    console.log(`Raw tags are: ${rawTagText}`)
    //Split out the tags, which should be split by commas.
    //Then add them to an array and setBlogTags(thearray).
  }

  function makePost(){
    fetch('/api/write_post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        "blogTitle": blogTitle,
        "blogText": blogText,
        "blogSubTitle": blogSubTitle,
        "blogTags": blogTags
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
