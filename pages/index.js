import { Box, Button, ButtonGroup, Card } from '@material-ui/core'
import home from '../styles/HomePage.module.css'

export default function Home() {

    return (
        <main className={home.page}>
            <section className={home.summary}>
                <div className={home.description}>
                    <h1 className={home.intro_title}>This is <span className={home.app_name}>OnePush</span></h1>
                    <div className={home.description_text_container}>
                        <p className={home.byline}>
                            One text editor. Multiple platforms.
                        </p>                   
                        <p className={home.intro_description}>
                            OnePush is a comprehensive markdown editor on the web that allows you to write your blog post in one interface, then submit it to multiple blogging platforms. Crosspost to Medium, DEV.to, Hashnode and more with the push of just one button.
                        </p>                        
                    </div>
                    <Box style={{display:'flex', columnGap:20}}>
                        <Button variant="contained" disableElevation>
                            Start Writing
                        </Button>
                        <Button variant="contained" disableElevation>
                            Register
                        </Button>
                    </Box>
                </div>
                <img src="https://res.cloudinary.com/diujqlncs/image/upload/v1623512353/onepush/blogslist_gdczam.png" className={home.promo_image}>

                </img>
            </section>
        </main>
    )
}