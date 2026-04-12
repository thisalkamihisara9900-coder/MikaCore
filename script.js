/**
 * Mikacore Professional Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Set Current Year in Footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ----------------------------------------
    // Navigation Logic
    // ----------------------------------------
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinksList = document.querySelectorAll('.nav-link');

    // Scroll aesthetics for Navbar
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init check

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Transform hamburger icon
        menuToggle.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu on link click
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                menuToggle.click(); // Trigger the close animation
            }
        });
    });

    // Active state highlighting during scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            // Subtract navbar height to trigger earlier
            const sectionTop = section.offsetTop - 150; 
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    }, { passive: true });

    // ----------------------------------------
    // Scroll Reveal Animations
    // ----------------------------------------
    const revealElements = document.querySelectorAll('.reveal-up');
    
    // Create an Intersection Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------
    // Professional Form Handling Simulation
    // ----------------------------------------
    const contactForm = document.getElementById('proContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const initialText = submitBtn.textContent;
            
            // Visual loading state
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            // Simulate API Request
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Received';
                submitBtn.style.backgroundColor = '#10B981'; // Success Green
                submitBtn.style.borderColor = '#10B981';
                
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = initialText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links (fallback for browsers not supporting css scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
    // ----------------------------------------
    // TSParticles Init
    // ----------------------------------------
    if (typeof tsParticles !== 'undefined' && document.getElementById('tsparticles')) {
        tsParticles.load("tsparticles", {
            fullScreen: { enable: false },
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5,
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: ["#FF5A1F", "#555555", "#444444"], // Orange, Dark Gray
                },
                links: {
                    color: "#444444",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 0.2, // Reduced speed
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 60,
                },
                opacity: {
                    value: 0.7,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        });
    }
});
