document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamburger.classList.toggle('is-active');
    });
    
    // Close the menu when a link is clicked
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('is-active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const sections = document.querySelectorAll('.section, .contact-form-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });

        const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = content.style.maxHeight && content.style.maxHeight !== '0px';

            // Close all other items
            accordionItems.forEach(otherItem => {
                const otherContent = otherItem.querySelector('.accordion-content');
                if (otherContent !== content) {
                    otherContent.style.maxHeight = '0';
                    otherContent.style.padding = '0 1.5rem';
                }
            });

            // Toggle the clicked item
            if (isActive) {
                content.style.maxHeight = '0';
                content.style.padding = '0 1.5rem';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '1.5rem';
            }
        });
    });

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';

    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    try {
        const response = await fetch('https://culinarycompass.app/.netlify/functions/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (response.ok) {
            // Redirect to the new thank you page after successful submission
            window.location.href = 'thank-you.html';
        } else {
            const errorText = await response.text();
            formStatus.textContent = `Error: ${errorText}`;
            formStatus.style.color = 'red';
        }
        } catch (error) {
            formStatus.textContent = `Error: ${error.message}`;
            formStatus.style.color = 'red';
        }
    });
});