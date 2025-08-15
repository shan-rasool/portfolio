// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');

// Typing Animation Text Array
const typingTexts = [
    'Cybersecurity Specialist',
    'Digital Forensics Expert',
    'Ethical Hacker',
    'Security Analyst',
    'Penetration Tester',
    'Incident Response Expert'
];

// Global Variables
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeTypingAnimation();
    initializeCounters();
    initializeContactForm();
    initializeCertificateCarousel();
    initializeParticles();
    initializeFloatingParticles();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = themeToggle.querySelector('i');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
    
    // Add animation class
    themeToggle.classList.add('wiggle-animation');
    setTimeout(() => {
        themeToggle.classList.remove('wiggle-animation');
    }, 2000);
}

// Navigation Management
function initializeNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Typing Animation
function initializeTypingAnimation() {
    typeText();
}

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeText, typingSpeed);
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Contact Form Management
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Clear previous errors
    clearAllErrors();
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showError('name-error', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showError('email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showError('message-error', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        submitForm(name, email, message);
    } else {
        // Shake form on validation error
        contactForm.classList.add('shake');
        setTimeout(() => {
            contactForm.classList.remove('shake');
        }, 500);
    }
}

function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    
    clearError(e);
    
    switch (fieldName) {
        case 'name':
            if (!fieldValue) {
                showError('name-error', 'Name is required');
            }
            break;
        case 'email':
            if (!fieldValue) {
                showError('email-error', 'Email is required');
            } else if (!isValidEmail(fieldValue)) {
                showError('email-error', 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (!fieldValue) {
                showError('message-error', 'Message is required');
            } else if (fieldValue.length < 10) {
                showError('message-error', 'Message must be at least 10 characters long');
            }
            break;
    }
}

function clearError(e) {
    const field = e.target;
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.style.borderColor = '';
}

function clearAllErrors() {
    const errorElements = contactForm.querySelectorAll('.form-error');
    const inputElements = contactForm.querySelectorAll('input, textarea');
    
    errorElements.forEach(error => error.textContent = '');
    inputElements.forEach(input => input.style.borderColor = '');
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const fieldName = elementId.replace('-error', '');
    const field = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    if (field) {
        field.style.borderColor = '#ff4757';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(name, email, message) {
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        // Success state
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.style.background = '#2ecc71';
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showSuccessMessage('Thank you for your message! I\'ll get back to you soon.');
        
        // Reset button after delay
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    }, 2000);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1002;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideLeft 0.5s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideRight 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 3000);
}

// Certificate Carousel
function initializeCertificateCarousel() {
    const certTrack = document.getElementById('cert-track');
    if (!certTrack) return;
    
    // Clone certificates for infinite scroll
    const certificates = certTrack.children;
    const certArray = Array.from(certificates);
    
    certArray.forEach(cert => {
        const clone = cert.cloneNode(true);
        certTrack.appendChild(clone);
    });
    
    // Pause animation on hover
    certTrack.addEventListener('mouseenter', () => {
        certTrack.style.animationPlayState = 'paused';
    });
    
    certTrack.addEventListener('mouseleave', () => {
        certTrack.style.animationPlayState = 'running';
    });
}

// Particle System
function initializeParticles() {
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(i);
    }
    
    function createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--accent-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
            left: ${Math.random() * 100}vw;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${15 + Math.random() * 10}s;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                document.body.removeChild(particle);
            }
            createParticle(index);
        }, (15 + Math.random() * 10) * 1000);
    }
}

// Floating Particles for Hero Section
function initializeFloatingParticles() {
    const particleContainer = document.getElementById('floating-particles');
    if (!particleContainer) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(particleContainer, i);
    }
}

function createFloatingParticle(container, index) {
    const particle = document.createElement('div');
    const isLarge = Math.random() > 0.7;
    
    particle.className = isLarge ? 'particle-star large' : 'particle-star';
    particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 4}s, ${Math.random() * 20}s;
        animation-duration: ${4 + Math.random() * 2}s, ${20 + Math.random() * 10}s;
    `;
    
    container.appendChild(particle);
    
    // Recreate particle periodically for variety
    setTimeout(() => {
        if (particle.parentNode) {
            container.removeChild(particle);
        }
        createFloatingParticle(container, index);
    }, (30 + Math.random() * 20) * 1000);
}

// Utility Functions
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

// Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-lift');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-lift');
        });
        
        // Add click animation to project links
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                this.classList.add('btn-click');
                
                // Simulate navigation (replace with actual links)
                setTimeout(() => {
                    console.log('Navigating to:', this.href || 'Project repository');
                    this.classList.remove('btn-click');
                }, 300);
            });
        });
    });
});

// Skill Category Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Button Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('btn-click');
            setTimeout(() => {
                this.classList.remove('btn-click');
            }, 300);
        });
    });
});

// Performance Optimizations
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    handleNavbarScroll();
}, 10);

const throttledResize = throttle(() => {
    // Handle resize events if needed
}, 250);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Accessibility Improvements
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation for custom elements
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        
        if (focusedElement.classList.contains('theme-toggle')) {
            e.preventDefault();
            toggleTheme();
        }
        
        if (focusedElement.classList.contains('hamburger')) {
            e.preventDefault();
            toggleMobileMenu();
        }
    }
    
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-green)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could implement error reporting here
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could implement error reporting here
});

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

function initializeApplication() {
    console.log('Cybersecurity Portfolio initialized successfully!');
    
    // Add any final initialization code here
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
}


