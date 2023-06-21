import React from 'react'
import './about.css'
import ME from '../../assets//kolade.jpg'
import {FaAward} from 'react-icons/fa'
import {FiUsers} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'

const About = () => {
  return (
    <section id='about'>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Software Engineer</h5>
              <small>4+ Years Experience</small>
            </article>

            <article className='about__card'>
              <FiUsers className='about__icon'/>
              <h5>Business Development</h5>
              {/* <small>50+ Worldwide</small> */}
            </article>

            <article className='about__card'>
              <VscFolderLibrary className='about__icon'/>
              <h5>Research</h5>
              {/* <small>80+ Completed</small> */}
            </article>
        </div>
            <p> 
            I am a Versatile Software / Solidity Engineer skilled and experienced in building robust Backend infrastructures, developing Smart Contracts, and creating intuitive frontend systems and research.
I have played pivotal roles in building protocols and applications that process several millions of assets in dollars and thousands of users.
I am currently researching and writing on Homomorphic Encryption.

              </p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
          
        </div>
      </div>
    </section>
  )
}

export default About