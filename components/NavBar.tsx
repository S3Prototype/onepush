import nav from '../styles/NavBar.module.css'

function NavBar() {
    const test:string= "hi"
    console.log(test)
    return (
        <div className={nav.nav_container}>
            <nav className={nav.navbar}>
                <button>
                    Write
                </button>
                <button>
                    Posts
                </button>
                <button>
                    Blogs
                </button>
                <button>
                    Socials
                </button>
            </nav>
        </div>
    )
}

export default NavBar
