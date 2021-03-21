import Head from 'next/head'
import NavBar from '../components/NavBar.tsx'
import styles from '../styles/Home.module.css'
import Write from '../components/Write.tsx'
import PushButton from '../components/PushButton.tsx'
import {useState} from 'react'


export default function Home() {

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
      <NavBar/>
      <div className="page_container">
        <Write 
          updateBlogText={setBlogText}
          updateBlogTitle={setBlogTitle}
          updateBlogSubTitle={setBlogSubTitle}
          updateBlogTags={parseAndSetTags}
        />
      </div>
    </div>
  )
}
