import React, {useRef}from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {RxDiscordLogo} from 'react-icons/rx'
import {RiTelegramLine} from 'react-icons/ri'
import emailjs from 'emailjs-com';


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ul9i51j', 'template_4nkb5e7', form.current, 'b44cv3TrndMW9iaNh')
     
    e.target.reset()
  };
  return (
    <section id='contact'>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>Leodarkseid@gmail.com</h5>
            <a href="mailto:leodarkseid@gmail.com" target='_blank' rel='noreferrer'>Send a msg</a>
          </article>
          <article className="contact__option">
            <RiTelegramLine  className='contact__option-icon'/>
            <h4>Telegram</h4>
            <h5>@leodarkseid</h5>
            <a href="https://t.me/leodarkseid" target='_blank' rel='noreferrer'>Send a msg</a>
          </article>
          <article className="contact__option">
            <RxDiscordLogo className='contact__option-icon'/>
            <h4>Discord</h4>
            <h5>@leodarkseid</h5>
            <a href="https://discordapp.com/users/770896443560427530" target='_blank' rel='noreferrer'>Send a msg</a>
          </article>

        </div>

        {/* END OF CONTACT OPTIONS */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Full Name' required />
          <input type="text" name='email' placeholder='Your Email' required />
          <textarea name="message" rows="7" placeholder='Your Message' required></textarea>

          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact