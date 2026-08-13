/* --- script.js ---
   This file is mainly for the JavaScript functions that I use
   to make my portfolio website more interactive. It handles
   the navigation links, smooth scrolling, active navigation
   states, and also the contact form interaction.

   Basically, the JavaScript is used to make the website not
   just a static page and lets some parts of the website respond
   when the user click or interact with it.
*/

document.addEventListener('DOMContentLoaded', () => {
    // DOM references used across the script
    const navLinks = document.querySelectorAll('.nav-link'); // All nav anchors
    const sections = document.querySelectorAll('.section'); // Page sections for active link detection
    const contactForm = document.getElementById('contactForm'); // Contact form element
    const formStatus = document.getElementById('formStatus'); // Element to show form feedback


    /* --- Smooth Scrolling ---
   This part is for the navigation links of the website.
   Instead of the page jumping directly to the section when
   the user click a navigation link, I make it scroll smoothly
   to that section. I also prevent the default link behavior
   so I can control the scrolling using JavaScript. The active
   class is also change when the user click a link so they can
   immediately see which section they selected.
*/


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Set active class immediately so the UI feels responsive
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

   /* --- Active Link Highlighting on Scroll ---
   This part is for changing the active navigation link when
   the user scroll on the website. It check which section is
   currently visible on the screen and then change the active
   class to the navigation link that belongs to that section.
   I use a simple offset to check which section the user is
   currently in. This makes it easier for the user to know
   what part of the website they are currently viewing.
*/

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // buffer for header
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

   /* --- Contact Form Handling ---
   This part is for handling the contact form in the website.
   I use this so when the user fill up the form and click submit,
   it will give a simple feedback that the form is submitted.
   This doesn't actually send the information to a server yet,
   it only make it look like the form was successfully submitted
   and then clears the inputs. If I want to make it fully working
   in the future, I can connect it to a backend or other service.
*/

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name').value.trim();
            const emailInput = document.getElementById('email').value.trim();

            if (nameInput && emailInput) {
                formStatus.style.color = '#16a34a'; // success color
                formStatus.textContent = `Thank you, ${nameInput}! I will reach you out soon.`;

                contactForm.reset();

                setTimeout(() => { formStatus.textContent = ''; }, 5000);
            } else {
                formStatus.style.color = '#dc2626'; // error color
                formStatus.textContent = 'Please fill out all required fields.';
            }
        });
    }
});