/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        // Safety check if sectionId exists
        if(sectionId) {
            const selector = '.nav__menu a[href*=' + sectionId + ']';
            const link = document.querySelector(selector);

            if(link) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    link.classList.add('active-link')
                }else{
                    link.classList.remove('active-link')
                }
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.querySelector('.header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

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
        div.className = 'interests__item interests__item--circle';
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
                }
            })
            .catch(() => { });
    }));
}

/* ================== CONTACT FORM LOGIC ================== */
const contactForm = document.querySelector('.contact__form');
const thankYouMessage = document.getElementById('thank-you-message');
const COOLDOWN_HOURS = 3;
const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;

// Check Cooldown on Load
const lastSubmission = localStorage.getItem('lastFormSubmission');
if (lastSubmission) {
    const timePassed = Date.now() - parseInt(lastSubmission, 10);
    if (timePassed < COOLDOWN_MS) {
        if (contactForm) contactForm.style.display = 'none';
        if (thankYouMessage) thankYouMessage.style.display = 'block';
    } else {
        localStorage.removeItem('lastFormSubmission');
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const msgSuccess = document.querySelector('.form-message--success');
        const msgError = document.querySelector('.form-message--error');

        if (msgSuccess) msgSuccess.style.display = 'none';
        if (msgError) msgError.style.display = 'none';

        const botCheck = contactForm.querySelector('input[name="botcheck"]');
        if (botCheck && botCheck.checked) {
            return;
        }

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
                    localStorage.setItem('lastFormSubmission', Date.now().toString());

                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;

                    contactForm.style.display = 'none';
                    if (thankYouMessage) thankYouMessage.style.display = 'block';

                    contactForm.reset();
                } else {
                    if (msgError) {
                        msgError.style.display = 'block';
                        msgError.textContent = "✗ " + (json.message || "Something went wrong!");
                    }
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            })
            .catch(error => {
                if (msgError) {
                    msgError.style.display = 'block';
                    msgError.textContent = "✗ Something went wrong!";
                }
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
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
    updateCountdown();
}
