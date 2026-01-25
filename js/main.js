document.addEventListener('DOMContentLoaded', () => {
    /* ================== NAVIGATION LOGIC ================== */
    const sections = document.querySelectorAll('section > div[id]');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observerKey = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observerKey.observe(section);
    });

    // Handle click on nav links to manually set active state immediately (optional, helps with instant feedback)
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });


    /* ================== SPOTIFY COVER FETCHING ================== */
    const SPOTIFY_OEMBED = 'https://open.spotify.com/oembed?url=';
    const SPOTIFY_ITEMS = [
        ['album', '2UqqJiGQEh4xW2aK914nFL'],
        ['album', '6Mxz4P8IQrTQPUSqDtTF4p'],
        ['playlist', '2PulfLij9nY0sbbHfdZmXy'],
        ['playlist', '1GeJO2xaluGcUtCCm6fubW'],
        ['track', '1xQQJELCro7Fys7pUnHVYv'],
        ['track', '3Xfwu3xtPqmJ4nM4jpBm8O'],
        ['track', '0qlu7Te2J2BuAGFcwb3rjn'],
        ['track', '6ZBXya9ewPZa6zXDRfPhog'],
        ['album', '7GoZNNb7Yl74fpk8Z6I2cv'],
        ['album', '6CyD8cVpx9f8uJT9ZpJHRG'],
    ];

    const spotifyStack = document.getElementById('spotify-stack');
    if (spotifyStack) {
        Promise.all(SPOTIFY_ITEMS.map(([type, id]) => {
            const url = `https://open.spotify.com/${type}/${id}`;
            const div = document.createElement('div');
            div.className = 'offclock__item offclock__item--circle';
            div.innerHTML = `<a href="${url}" target="_blank" rel="noopener"></a>`;
            spotifyStack.appendChild(div);

            return fetch(`${SPOTIFY_OEMBED}${url}`)
                .then(r => r.json())
                .then(data => {
                    if (data.thumbnail_url) {
                        const img = document.createElement('img');
                        img.src = data.thumbnail_url;
                        img.alt = data.title || '';
                        img.loading = 'lazy';
                        img.onerror = () => img.style.display = 'none';

                        const link = div.querySelector('a');
                        link.appendChild(img);

                        // Add Overlay with Title
                        const overlay = document.createElement('div');
                        overlay.className = 'offclock__overlay';
                        overlay.textContent = data.title || '';
                        link.appendChild(overlay);
                    }
                })
                .catch(() => { });
        }));
    }


    /* ================== CONTACT FORM LOGIC ================== */
    const contactForm = document.querySelector('form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const COOLDOWN_HOURS = 3;
    const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;

    // Check Cooldown on Load
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    if (lastSubmission) {
        const timePassed = Date.now() - parseInt(lastSubmission, 10);
        if (timePassed < COOLDOWN_MS) {
            // Within cooldown period: Hide form, show thank you message
            if (contactForm) contactForm.style.display = 'none';
            if (thankYouMessage) thankYouMessage.style.display = 'block';
        } else {
            // Cooldown expired: Clear storage
            localStorage.removeItem('lastFormSubmission');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            const msgSuccess = document.querySelector('.form-message--success');
            const msgError = document.querySelector('.form-message--error');

            // Hide previous messages
            if (msgSuccess) msgSuccess.style.display = 'none';
            if (msgError) msgError.style.display = 'none';

            // Honeypot check
            const botCheck = contactForm.querySelector('input[name="botcheck"]');
            if (botCheck && botCheck.checked) {
                return;
            }

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(contactForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                    const json = await response.json();
                    if (response.status === 200) {
                        // Success Scenario
                        // Set Cooldown Timestamp
                        localStorage.setItem('lastFormSubmission', Date.now().toString());

                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;

                        // Hide Form and Show Thank You Message
                        contactForm.style.display = 'none';
                        if (thankYouMessage) thankYouMessage.style.display = 'block';

                        // Reset form in backend (though it's hidden now)
                        contactForm.reset();
                    } else {
                        // Error Scenario
                        if (msgError) {
                            msgError.style.display = 'block';
                            msgError.textContent = "✗ " + (json.message || "Something went wrong!");
                        }
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                    }
                })
                .catch(error => {
                    if (msgError) {
                        msgError.style.display = 'block';
                        msgError.textContent = "✗ Something went wrong!";
                    }
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }


    /* ================== ACTIVITY COUNTDOWN ================== */
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const targetDate = new Date('February 14, 2026 00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownEl.innerHTML = "Event Started!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const d = days < 10 ? `0${days}` : days;
            const h = hours < 10 ? `0${hours}` : hours;
            const m = minutes < 10 ? `0${minutes}` : minutes;
            const s = seconds < 10 ? `0${seconds}` : seconds;

            countdownEl.innerHTML = `${d}d : ${h}h : ${m}m : ${s}s`;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }
});
