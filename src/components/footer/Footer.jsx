import React from 'react'
import './footer.css'
import LOGO from '../../assets//logo.png'
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer> 
    <a href="#" className='footer__logo'>
      <img src={LOGO} alt="logo" />
    </a>

    <ul className="permalinks">
      <li><a href="#">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>

    <div className="footer__socials">
      <a href="https://fb.com"> <FaFacebookF /> </a>
      <a href="https://twitter.com"><FaTwitter/></a>
      <a href="https://instagram.com"><FaInstagram/></a>
    </div>

    <div className="footer__copyright">
      <small> &copy; Badmus Kolade. All rights reserved </small>
    </div>
    </footer>
  )
}

export default Footer