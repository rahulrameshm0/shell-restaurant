// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background when scrolling down
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Menu category filtering
const menuCategories = document.querySelectorAll('.menu-category');
const menuItems = document.querySelectorAll('.menu-item');

// Gallery filtering
const galleryCategories = document.querySelectorAll('.gallery-category');
const galleryItems = document.querySelectorAll('.gallery-item');

// Menu filtering
menuCategories.forEach(category => {
    category.addEventListener('click', () => {
        menuCategories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');

        const selectedCategory = category.getAttribute('data-category');

        menuItems.forEach(item => {
            if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery filtering
galleryCategories.forEach(category => {
    category.addEventListener('click', () => {
        galleryCategories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');

        const selectedCategory = category.getAttribute('data-category');

        galleryItems.forEach(item => {
            if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

galleryCategories.forEach(category => {
    category.addEventListener('click', () => {
        galleryCategories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');

        const selectedCategory = category.getAttribute('data-category');

        galleryItems.forEach(item => {
            if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery image preview
const galleryImages = document.querySelectorAll('.gallery-item');
galleryImages.forEach(item => {
    item.addEventListener('click', () => {
        const fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.className = 'fullscreen-overlay';
        
        const image = document.createElement('img');
        image.src = item.querySelector('img').src;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        const imageInfo = item.querySelector('.gallery-info').cloneNode(true);
        
        fullscreenOverlay.appendChild(closeBtn);
        fullscreenOverlay.appendChild(image);
        fullscreenOverlay.appendChild(imageInfo);
        document.body.appendChild(fullscreenOverlay);
        
        // Prevent body scrolling when overlay is open
        document.body.style.overflow = 'hidden';
        
        const closeOverlay = () => {
            fullscreenOverlay.remove();
            document.body.style.overflow = 'auto';
        };
        
        closeBtn.addEventListener('click', closeOverlay);
        fullscreenOverlay.addEventListener('click', (e) => {
            if (e.target === fullscreenOverlay) {
                closeOverlay();
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Order button click handler
const orderButtons = document.querySelectorAll('.order-btn');
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = menuItem.querySelector('.price').textContent;
        
        // Show order confirmation
        const confirmationMessage = `Thank you for ordering ${itemName} (${itemPrice})! Your order has been received.`;
        
        const notification = document.createElement('div');
        notification.className = 'order-notification';
        notification.textContent = confirmationMessage;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});

// Reservation form handling
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const bookingData = Object.fromEntries(formData);
        
        // Here you would typically send this data to a server
        console.log('Booking request:', bookingData);
        
        // Show success message
        alert('Thank you for your reservation request! We will contact you shortly to confirm your booking.');
        bookingForm.reset();
    });
}
