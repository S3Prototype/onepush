import { AppBar, Box, Button, ButtonGroup, Card, IconButton, Toolbar, Typography } from '@material-ui/core'
import home from '../styles/HomePage.module.scss'
import MenuIcon from '@material-ui/icons/Menu';
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowRight, CheckCircleFill, CurrencyDollar, Search, Twitter } from 'react-bootstrap-icons';
import { useRef } from 'react';

export default function Home() {

    const promoVideoRef = useRef(null)

    const togglePromoVideo = (e)=>{
        e.preventDefault()
        const {current} = promoVideoRef
        if(current.paused){
            e.target.innerHTML = "Stop Animation"
            return current.play()
        }

        e.target.innerHTML = "Start Animation"
        current.pause()
    }

    return (
        <>
            <main className={home.page}>
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
                            <button className={home.button}>
                                Start Writing
                            </button>
                            <button className={home.button}>
                                Register
                            </button>
                        </Box>
                    </div>
                    <div className={home.video_container}>
                        <video ref={promoVideoRef} className={home.promo_video} autoPlay loop muted src="https://res.cloudinary.com/diujqlncs/video/upload/v1624143399/onepush/onepush_carousel6_cjkicw.mp4"></video>
                        <button onClick={togglePromoVideo} className={home.stop_video}>Stop Animation</button>
                    </div>
                </section>
                <div className={home.selling_points_container}>
                    <h1 className={home.selling_points_title}>Why use OnePush?</h1>
                    <section className={home.selling_points}>
                        <div className={home.point}>
                            <div className={home.icon_container}>
                                <CheckCircleFill color="white" className={home.icon} size="40"/>
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
                                <Twitter color="white" className={home.icon} size="40"/>
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
                                <Search color="white" className={home.icon} size="40"/>
                            </div>
                            <div className={home.point_description}>
                                <h2 className={home.point_name}>SEO Friendly</h2>
                                <p className={home.point_summary}>
                                    Set your canonical url to optimize google performance, set custom tags for each platform you choose, and much more.
                                </p>
                            </div>
                        </div>
                        <div className={home.point}>
                            <div className={home.icon_container}>
                                <CurrencyDollar color="white" className={home.icon} size="40"/>
                            </div>
                            <div className={home.point_description}>
                                <h2 className={home.point_name}>Grow Your Brand</h2>
                                <p className={home.point_summary}>
                                    With OnePush streamlining your process, grow your audience and blogging platform faster!
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