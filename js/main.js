// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Verzenden...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Here you would typically send the data to a server
        alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
    
    return false;
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    
    // Add mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    nav.insertBefore(mobileMenuBtn, logo);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });

    // Add back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);

    // Hide loading animation when page is loaded
    window.addEventListener('load', function() {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.product-card, .feature');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if(position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('animate');
        }
    });
});

// Add hover effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add form input animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
}); 