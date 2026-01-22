import React, { useState } from 'react'
import './contact.css'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', // Replace with actual key
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    from_name: 'Portfolio Contact Form',
                    subject: `New message from ${formData.name}`
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ submitting: false, submitted: true, error: null });
                setFormData({ name: '', email: '', message: '' });

                // Reset success message after 5 seconds
                setTimeout(() => {
                    setStatus({ submitting: false, submitted: false, error: null });
                }, 5000);
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            setStatus({
                submitting: false,
                submitted: false,
                error: error.message || 'Something went wrong. Please try again.'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Honeypot field for spam protection */}
            <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
            />

            <input
                type="text"
                name='name'
                placeholder='Your Full Name'
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={status.submitting}
                aria-label="Your full name"
            />
            <input
                type="email"
                name='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={status.submitting}
                aria-label="Your email address"
            />
            <textarea
                name="message"
                rows="7"
                placeholder='Your Message'
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={status.submitting}
                aria-label="Your message"
            ></textarea>

            <button
                type='submit'
                className='btn btn-primary'
                disabled={status.submitting}
                aria-label={status.submitting ? 'Sending message...' : 'Send message'}
            >
                {status.submitting ? 'Sending...' : 'Send Message'}
            </button>

            {status.submitted && (
                <div className="form-message form-message--success" role="alert">
                    ✓ Message sent successfully! I'll get back to you soon.
                </div>
            )}

            {status.error && (
                <div className="form-message form-message--error" role="alert">
                    ✗ {status.error}
                </div>
            )}
        </form>
    )
}

export default ContactForm
