document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const isDark = htmlElement.classList.toggle('dark');
        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                mobileNav.classList.remove('active');
                const menuIcon = mobileMenuButton.querySelector('i');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Project description show more/less
    const showMoreButtons = document.querySelectorAll('.show-more-btn');
    
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const description = this.closest('.project-description');
            const hiddenContent = description.querySelector('.hidden-description');
            
            hiddenContent.classList.toggle('show');
            this.classList.toggle('active');
            
            if (hiddenContent.classList.contains('show')) {
                this.innerHTML = '<span>Show less</span><i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = '<span>Show more</span><i class="fas fa-chevron-down"></i>';
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const sendAnother = document.getElementById('send-another');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission with loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call
        setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }, 1500);
    });
    
    sendAnother.addEventListener('click', function() {
        formSuccess.classList.remove('show');
        contactForm.style.display = 'block';
    });
    
    // Scroll to top button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const animatedSections = document.querySelectorAll('.animated-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedSections.forEach(section => {
        observer.observe(section);
    });
    
    // Skill card animations
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const skills = this.getAttribute('data-skills').split(',');
            const badges = this.querySelectorAll('.skill-badge');
            
            badges.forEach((badge, index) => {
                badge.style.transitionDelay = `${index * 0.1}s`;
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const badges = this.querySelectorAll('.skill-badge');
            
            badges.forEach(badge => {
                badge.style.transitionDelay = '0s';
            });
        });
    });
});