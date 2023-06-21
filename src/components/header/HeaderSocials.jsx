import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {BsYoutube} from 'react-icons/bs'

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://linkedin.com/in/badmuskolade" target='blank' className='header-icon'><BsLinkedin/></a>
        <a href="https://github.com/leodarkseid" target='blank' className='header-icon'><FaGithub/></a>
        <a href="https://youtu.be/S_xH7noaqTA" target='blank' className='header-icon'><BsYoutube/></a>
    </div>
  )
}

export default HeaderSocials