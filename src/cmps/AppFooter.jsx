import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import InstagramIcon from '@material-ui/icons/Instagram';
import Button from '@material-ui/core/Button';
import SpoonIcon from './icons/SpoonIcon.jsx'

export function AppFooter() {
    return (
        <footer>
            <section className="section-footer">
                <div className="logo"><img className="logo-img" src={require('../assets/images/logo/makeeatlogo5.png')} alt="logo" /></div>
                <div className="footer-coloums">
                    <div className="more"><h4>Magazines & More</h4>
                        <a href="https://www.thedailymeal.com/10-best-food-magazines-around-world"><img className="magazine-img" src={require('../assets/images/footer.jpg')} alt="magazine" /></a>
                    </div>
                    <div className="Learn-more"><h4>Learn More</h4>
                        <a href="/">About Us</a>
                        <a href="https://www.meredith.com/national-media/digital">Advertise</a>
                        <a href="/">Customer Service</a>
                    </div>
                    <div className="connect"><h4>Connect</h4>
                        <a href="/">Follow Us</a>
                        <a href="/"><FacebookIcon /><TwitterIcon /><PinterestIcon /><InstagramIcon /></a>
                        <Link to={`/user/signup`}> < Button>Sign up</Button></Link>
                    </div>
                </div>
            </section>
            <section className="second-footer">
                <div className="coffe-right"><h5>makeEat is part of the makeEat Food Group. © Copyright 2020 makeEat Corporation. All Rights Reserved.</h5></div>
                <div className="spoon"><SpoonIcon /></div>
                <div className="terms">
                    <h6>Privacy Policy</h6>
                    <h6>Terms of Service</h6>
                    <h6>Web accessibility</h6>
                </div>

            </section>
        </footer>


    )
}
