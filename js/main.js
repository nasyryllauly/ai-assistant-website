// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initHeaderScroll();
    initMobileMenu();
    initCTAButtons();
    initVideoPlayer();
    initFormValidation();
    initCounterAnimations();
    initParallaxEffects();
    
    console.log('AI Assistant website loaded successfully!');
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effects
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(10, 14, 39, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        createMobileMenuButton();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileMenuButton();
        } else {
            removeMobileMenuButton();
        }
    });
}

function createMobileMenuButton() {
    const header = document.querySelector('.header-content');
    let menuButton = document.querySelector('.mobile-menu-button');
    
    if (!menuButton) {
        menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Add styles for mobile menu button
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-button {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 30px;
                height: 30px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
            }
            
            .mobile-menu-button span {
                width: 100%;
                height: 3px;
                background: var(--text-white);
                border-radius: 2px;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-button.active span:nth-child(1) {
                transform: rotate(45deg) translate(8px, 8px);
            }
            
            .mobile-menu-button.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-button.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .mobile-nav {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(10, 14, 39, 0.98);
                backdrop-filter: blur(10px);
                padding: 2rem;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            }
            
            .mobile-nav.active {
                transform: translateY(0);
            }
            
            .mobile-nav a {
                display: block;
                color: var(--text-white);
                text-decoration: none;
                padding: 1rem 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 1.1rem;
            }
        `;
        document.head.appendChild(style);
        
        header.appendChild(menuButton);
        
        // Create mobile navigation
        const mobileNav = document.createElement('nav');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <a href="#features">Возможности</a>
            <a href="#process">Процесс</a>
            <a href="#contact">Контакты</a>
        `;
        
        document.body.appendChild(mobileNav);
        
        // Add click event
        menuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuButton.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }
}

function removeMobileMenuButton() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuButton) menuButton.remove();
    if (mobileNav) mobileNav.remove();
}

// CTA button functionality
function initCTAButtons() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const calendarBtn = document.getElementById('calendar-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const message = encodeURIComponent('🚀 Здравствуйте! Хочу получить бесплатную консультацию по ИИ-ассистенту');
            const phoneNumber = '77781047378'; // Updated phone number
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }
    
    if (calendarBtn) {
        calendarBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would integrate with a calendar booking system
            // For now, we'll show an alert
            alert('Функция записи на консультацию будет доступна в ближайшее время. Пожалуйста, свяжитесь с нами через WhatsApp.');
        });
    }
}

// Video player functionality
function initVideoPlayer() {
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.video-container');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Here you would implement video playback
            // For demo purposes, we'll show a placeholder
            const videoPlaceholder = document.querySelector('.video-placeholder');
            videoPlaceholder.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #ff6b35 0%, #00ff88 100%); color: white; font-size: 1.2rem; text-align: center;">
                    <div>
                        <p>🎥 Демо-видео ИИ-ассистента</p>
                        <p style="font-size: 0.9rem; opacity: 0.8;">Здесь будет воспроизводиться видео с демонстрацией работы</p>
                    </div>
                </div>
            `;
        });
    }
}

// Form validation (if forms are added later)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                } else {
                    input.style.borderColor = '#00ff88';
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.', 'success');
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля.', 'error');
            }
        });
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasNumber = /\d/.test(text);
    
    if (hasNumber && hasPercent) {
        const number = parseInt(text);
        let current = 0;
        const increment = number / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '%';
        }, 30);
    }
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.statistics-bg, .hero-bg-animation');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.audience-item, .solution-card, .process-step, .stat-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollAnimations, 500);
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions are already optimized above
}, 16)); // ~60fps



// CTA Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const ctaForm = document.getElementById('ctaForm');
    const phoneInput = document.getElementById('userPhone');
    
    // Phone number formatting
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 1) {
                value = '+7 (' + value;
            } else if (value.length <= 4) {
                value = '+7 (' + value.substring(1);
            } else if (value.length <= 7) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
            } else if (value.length <= 9) {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7);
            } else {
                value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
            }
        }
        e.target.value = value;
    });
    
    // Form submission
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;
        
        if (name && phone) {
            // Create WhatsApp message
            const message = `Здравствуйте! Меня зовут ${name}. Хочу получить демо-версию ИИ-ассистента на 3 дня. Мой телефон: ${phone}`;
            const whatsappUrl = `https://wa.me/77781047378?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            
            // Reset form
            ctaForm.reset();
        }
    });
});

