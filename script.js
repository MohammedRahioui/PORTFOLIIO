// ==================== DOM ELEMENTS ==================== //
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const typingElement = document.querySelector('.typing-text');

// ==================== MOBILE MENU FUNCTIONALITY ==================== //
menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// ==================== TYPING ANIMATION ==================== //
const texts = [
    "Fachinformatiker", 
    "Anwendungsentwickler", 
    "Software-Begeisterter",
    "Problemlöser"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeAnimation() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }

    setTimeout(typeAnimation, typingDelay);
}

// Start typing animation after page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(typeAnimation, 1000);
    });
} else {
    setTimeout(typeAnimation, 1000);
}

// ==================== SMOOTH SCROLL & ACTIVE NAV ==================== //
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill bars for animation
document.querySelectorAll('.skill-progress').forEach(el => {
    observer.observe(el);
});

// ==================== SKILL PROGRESS ANIMATION ==================== //
const skillBars = document.querySelectorAll('.skill-progress');

skillBars.forEach(bar => {
    const width = bar.style.width;
    const originalWidth = width;
    
    bar.style.width = '0%';
    
    const animateSkill = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = originalWidth;
                animateSkill.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    animateSkill.observe(bar);
});

// ==================== CONTACT FORM HANDLING ==================== //
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelectorAll('input[type="text"]')[1].value,
            message: this.querySelector('textarea').value
        };

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Bitte füllen Sie alle Felder aus!');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Bitte geben Sie eine gültige E-Mail-Adresse ein!');
            return;
        }

        // Here you would send the form data to your backend
        console.log('Form submitted:', formData);
        alert('Vielen Dank! Ihre Nachricht wurde gesendet.');
        this.reset();
    });
}

// ==================== SCROLL TO TOP BUTTON ==================== //
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTopButton();

// ==================== THROTTLE FUNCTION ==================== //
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== SCROLL TO TOP BUTTON STYLES (Added dynamically) ==================== //
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(90deg, #2afc85, #1ed761);
        color: #0e0f17;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(42, 252, 133, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    }

    .scroll-to-top.show {
        display: flex;
    }

    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(42, 252, 133, 0.4);
    }

    .nav-list a.active {
        color: #2afc85;
    }
`;
document.head.appendChild(style);

// ==================== PAGE LOAD ANIMATION ==================== //
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== HELPER FUNCTIONS ==================== //
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

lazyLoadImages();

// ==================== PERFORMANCE: Log when page is interactive ==================== //
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}
