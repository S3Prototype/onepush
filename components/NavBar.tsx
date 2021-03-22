import nav from '../styles/NavBar.module.css'
import {useState} from 'react'
function NavBar() {

    const [selectedButton, setSelectedButton] = useState('writeButton')

    function toggleSelected(e){
        if(e.target.id !== selectedButton) setSelectedButton(e.target.id)
    }

    return (
        <div className={nav.nav_container} onClick={toggleSelected}>
            <nav className={nav.navbar}>
                <button id="writeButton" className={
                    selectedButton === "writeButton" ? nav.selected : ''}
                >
                    Write
                </button>                
                <button id="connectionsButton" className={
                    selectedButton === "connectionsButton" ? nav.selected : ''}
                >
                    Connections
                </button>
                <button id="blogsButton" className={
                    selectedButton === "blogsButton" ? nav.selected : ''}
                >
                    Blogs
                </button>
                <button id="socialsButton" className={
                    selectedButton === "socialsButton" ? nav.selected : ''}
                >
                    Socials
                </button>
            </nav>
        </div>
    )
}

export default NavBar
