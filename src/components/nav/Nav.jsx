import React from 'react'
import './nav.css'
import { AiOutlineUser } from 'react-icons/ai'
import { BsMailbox } from 'react-icons/bs'
import { FiTarget } from 'react-icons/fi'
import { BiBook } from 'react-icons/bi'
import { MdDirectionsRun } from 'react-icons/md'
import { useState, useRef, useEffect } from 'react'

const navItems = [
  { href: '#personal', label: 'Personal', icon: AiOutlineUser },
  { href: '#focus', label: 'Current Focus', icon: FiTarget },
  { href: '#library', label: 'Library', icon: BiBook },
  { href: '#activity', label: 'Activity', icon: MdDirectionsRun },
  { href: '#contact', label: 'Contact', icon: BsMailbox }
]

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  const navRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav('#' + entry.target.id)
        }
      })
    }, {
      threshold: 0.5 // Trigger when 50% of the section is visible
    })

    // Observe all sections
    navItems.forEach(item => {
      const sectionId = item.href.replace('#', '')
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => {
      // Cleanup
      navItems.forEach(item => {
        const sectionId = item.href.replace('#', '')
        const element = document.getElementById(sectionId)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const handleKeyDown = (e, index) => {
    const navLinks = navRef.current?.querySelectorAll('a')

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = (index + 1) % navLinks.length
        navLinks[nextIndex]?.focus()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = (index - 1 + navLinks.length) % navLinks.length
        navLinks[prevIndex]?.focus()
        break
      case 'Home':
        e.preventDefault()
        navLinks[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        navLinks[navLinks.length - 1]?.focus()
        break
      default:
        break
    }
  }

  return (
    <nav ref={navRef} role="navigation" aria-label="Main navigation">
      {navItems.map((item, index) => {
        const IconComponent = item.icon
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setActiveNav(item.href)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={activeNav === item.href ? 'active' : ''}
            title={item.label}
            aria-label={item.label}
            aria-current={activeNav === item.href ? 'page' : undefined}
          >
            <IconComponent aria-hidden="true" />
          </a>
        )
      })}
    </nav>
  )
}

export default Nav