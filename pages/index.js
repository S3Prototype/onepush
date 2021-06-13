import { AppBar, Box, Button, ButtonGroup, Card, IconButton, Toolbar, Typography } from '@material-ui/core'
import home from '../styles/HomePage.module.css'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white',
      flexGrow: 1,
    },
    menuButton: {
        marginRight:'78%',
        color: 'white',
    },
    title: {
        color: 'white',
      flexGrow: 1,
    },
    button: {
        color:'white',
        textTransform: 'none'
    }
  }));

export default function Home() {
    const theme = useTheme()
    const classes = useStyles(theme)

    return (
        <>
            <AppBar position="sticky" elevation={0}>
                <Toolbar style={{backgroundColor:'white', boxShadow: 0}}>
                    <IconButton edge="start" style={{color:'white'}} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit" ><span style={{fontFamily:'Work Sans', fontSize:20, marginRight:15}}>Pricing</span></Button>
                    <Button color="inherit" ><span style={{fontFamily:'Work Sans', fontSize:20, marginRight:15}}>Login</span></Button>
                    <Button color="inherit" ><span style={{fontFamily:'Work Sans', fontSize:20, marginRight:15}}>Register</span></Button>
                </Toolbar>
            </AppBar>
            <main className={home.page}>
                {/* <div> */}
                    <section className={home.summary}>
                        <div className={home.description}>
                            <h1 className={home.intro_title}>This is <span className={home.app_name}>OnePush</span></h1>
                            <p className={home.byline}>
                                One text editor. Multiple platforms.
                            </p>
                            <div className={home.description_text_container}>
                                <p className={home.intro_description}>
                                    OnePush is a comprehensive markdown editor on the web that allows you to write your blog post in one interface, then submit it to multiple blogging platforms. Crosspost to Medium, DEV.to, Hashnode and more with the push of just one button.
                                </p>
                            </div>
                            <Box style={{display:'flex', columnGap:20}}>
                                <Button className={classes.button} variant="contained" disableElevation>
                                    Start Writing
                                </Button>
                                <Button className={classes.button} variant="contained" disableElevation>
                                    Register
                                </Button>
                            </Box>
                        </div>
                        <video className={home.promo_image} autoPlay loop muted src="https://res.cloudinary.com/diujqlncs/video/upload/v1623545687/onepush/onepush_carousel4_yk2h86.mp4"></video>
                        {/* <img src="https://res.cloudinary.com/diujqlncs/image/upload/v1623512353/onepush/blogslist_gdczam.png" className={home.promo_image}>
                        </img> */}
                    </section>
                    {/* <video className={home.summary_background} autoPlay loop muted src="https://res.cloudinary.com/diujqlncs/video/upload/v1623536611/onepush/Sequence_01_c0njxr.mp4"></video> */}
                {/* </div> */}
                <div className={home.selling_points_container}>
                    <h1 className={home.selling_points_title}>Why use OnePush?</h1>
                    <section className={home.selling_points}>
                        <div className={home.point}>
                            <div className={home.icon_container}>
                                <AssignmentTurnedInIcon color="secondary" style={{ width:'100%', height:'100%'}} />
                            </div>
                            <div className={home.point_description}>
                                <h2 className={home.point_name}>One Source of Truth</h2>
                                <p className={home.point_summary}>
                                    Write, publish, edit, update and delete your posts from OnePush's interface without ever having to visit other sites.
                                </p>
                            </div>
                        </div>
                        <div className={home.point}>
                            <div className={home.icon_container}>
                                <TwitterIcon color="primary" style={{backgroundColor:'white', width:'100%', height:'100%'}} />
                            </div>
                            <div className={home.point_description}>
                                <h2 className={home.point_name}>Post to Socials Immediately</h2>
                                <p className={home.point_summary}>
                                    Compose your social post and blog post on the same page. Write up what you want your tweet to say, create your canonical link, and then set the tweet to post—as soon as the blog is published, or at a scheduled time.
                                </p>
                            </div>
                        </div>
                        <div className={home.point}>
                            <div className={home.icon_container}>
                                <SearchIcon style={{backgroundColor:'white', width:'100%', height:'100%'}} />
                            </div>
                            <div className={home.point_description}>
                                <h2 className={home.point_name}>SEO Friendly</h2>
                                <p className={home.point_summary}>
                                    Set your canonical url to optimize google performance, set custom tags for each platform you choose, and much more.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
                    {/* Next section will be  */}
            </main>            
        </>
    )
}