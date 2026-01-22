import React from 'react'
import './about.css'
import ProfileImage from '../../assets/kolade.jpg'
import { FiTarget } from 'react-icons/fi'
import { BiBook } from 'react-icons/bi'
import { IoMusicalNotesOutline } from 'react-icons/io5'
import { MdDirectionsRun } from 'react-icons/md'
import ContactForm from '../contact/ContactForm'
import LOGO from '../../assets/logo.png'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const About = () => {
  // Library data with image support
  const libraryBooks = [
    {
      title: "1984",
      author: "George Orwell",
      cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      type: "reading"
    }
  ];

  const libraryMusic = [
    {
      title: "4:44",
      artist: "Jay-Z",
      cover: "https://upload.wikimedia.org/wikipedia/en/c/c0/4-44_album_cover.jpg",
      type: "listening"
    }
  ];

  return (
    <section id='about'>

      {/* Hero Section with Profile & About */}
      <div id="personal" className="about__page about__hero-page">
        <div className="container">
          <div className="hero__profile-image">
            <img src={ProfileImage} alt="Badmus Kolade" />
          </div>
          <h1 className="about__name">Badmus Kolade</h1>
          <p className="about__title">Computer Scientist | Software Engineer</p>

          <div className="hero__about">
            <p className="hero__text">
              I started in Human Physiology, fascinated by biological systems.
              Now, I engineer distributed digital systems.
            </p>
            <p className="hero__text">
              I have spent the last 5+ years building scalable architecture.
              Currently, I am exploring the intersection of the two: Artificial Intelligence and Agentic Systems.
            </p>
          </div>
        </div>
      </div>

      {/* Current Focus - Full Page */}
      <div id="focus" className="about__page about__focus-page">
        <div className="container">
          <div className="page__header">
            <FiTarget className="page__icon" />
            <h2 className="page__title">Current Focus</h2>
          </div>
          <div className="focus__grid">
            <div className="focus__card">
              <h3>AI Agents</h3>
              <p>Researching the design and utilization of Small language models (SLM) for domain specific use cases.</p>
            </div>
            <div className="focus__card">
              <h3>P2P Infrastructure</h3>
              <p>Architecting decentralized peer-to-peer protocols.</p>
              <span className="status-badge">Research Phase</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Library - Full Page */}
      <div id="library" className="about__page about__library-page">
        <div className="container">
          <div className="page__header">
            <BiBook className="page__icon" />
            <h2 className="page__title">The Library</h2>
          </div>

          {/* Reading Section */}
          <div className="library__section">
            <div className="library__section-header">
              <BiBook className="library__section-icon" />
              <h3>Reading</h3>
            </div>
            <div className="library__grid">
              {libraryBooks.map((book, index) => (
                <div key={index} className="library__card">
                  <div className="library__cover">
                    <img src={book.cover} alt={`${book.title} cover`} loading="lazy" />
                  </div>
                  <div className="library__info">
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </div>
                </div>
              ))}
              {/* Placeholder for more books */}
              <div className="library__card library__card--placeholder">
                <div className="library__cover library__cover--empty">
                  <BiBook />
                  <span>More coming soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Listening Section */}
          <div className="library__section">
            <div className="library__section-header">
              <IoMusicalNotesOutline className="library__section-icon" />
              <h3>Listening</h3>
            </div>
            <div className="library__grid">
              {libraryMusic.map((album, index) => (
                <div key={index} className="library__card">
                  <div className="library__cover">
                    <img src={album.cover} alt={`${album.title} cover`} loading="lazy" />
                  </div>
                  <div className="library__info">
                    <h4>{album.title}</h4>
                    <p>{album.artist}</p>
                  </div>
                </div>
              ))}
              {/* Placeholder for more albums */}
              <div className="library__card library__card--placeholder">
                <div className="library__cover library__cover--empty">
                  <IoMusicalNotesOutline />
                  <span>More coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity - Full Page */}
      <div id="activity" className="about__page about__activity-page">
        <div className="container">
          <div className="page__header">
            <MdDirectionsRun className="page__icon" />
            <h2 className="page__title">Activity</h2>
          </div>
          <div className="activity__content">
            <div className="activity__card">
              <div className="activity__label">Training</div>
              <h3 className="activity__event">Lagos City Marathon</h3>
              <p className="activity__date">February 14, 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Footer */}
      <div id="contact" className="about__page about__cta-page">
        <div className="container">
          <div className="cta__content">
            <h2>Let's Build Something Together</h2>
            <p>Interested in collaborating? Let's talk.</p>
            <div className="cta__form-container">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="cta__footer">
          <a href="#home" className='footer__logo' aria-label="Return to top">
            <img src={LOGO} alt="Badmus Kolade logo" />
          </a>

          <ul className="permalinks">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
          </ul>

          <div className="footer__socials">
            <a href="https://facebook.com/badmuskolade" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile"> <FaFacebookF /> </a>
            <a href="https://twitter.com/leodarkseid" target="_blank" rel="noopener noreferrer" aria-label="Twitter profile"><FaTwitter /></a>
            <a href="https://instagram.com/leodarkseid" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile"><FaInstagram /></a>
          </div>

          <div className="footer__copyright">
            <small> &copy; Badmus Kolade. All rights reserved </small>
          </div>
        </footer>
      </div>

    </section>
  )
}

export default About