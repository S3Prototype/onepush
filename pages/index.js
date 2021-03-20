import Head from 'next/head'
import NavBar from '../components/NavBar.tsx'
import styles from '../styles/Home.module.css'
import Write from '../components/Write.tsx'
import PushButton from '../components/PushButton.tsx'
export default function Home() {
  return (
    <div className="app_container">
      <PushButton />
      <NavBar/>
      <div className="page_container">
        <Write />
      </div>
    </div>
  )
}
