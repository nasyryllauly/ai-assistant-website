// Advanced animations and effects

document.addEventListener('DOMContentLoaded', function() {
    initParticleBackground();
    initTypingAnimation();
    initHoverEffects();
    initLoadingAnimations();
    initScrollReveal();
    initFloatingElements();
});

// Particle background animation
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: Math.random() > 0.5 ? '#ff6b35' : '#00ff88'
        };
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Pulse opacity
            particle.opacity += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.01;
            particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity));
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();
            
            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 107, 53, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const gradientSpan = titleElement.querySelector('.gradient-text');
    
    if (gradientSpan) {
        const gradientText = gradientSpan.textContent;
        const restText = titleElement.innerHTML.replace(gradientSpan.outerHTML, '');
        
        titleElement.innerHTML = '';
        
        let currentIndex = 0;
        const fullText = gradientText + restText;
        
        function typeCharacter() {
            if (currentIndex < fullText.length) {
                if (currentIndex < gradientText.length) {
                    if (currentIndex === 0) {
                        titleElement.innerHTML = '<span class="gradient-text"></span>';
                    }
                    titleElement.querySelector('.gradient-text').textContent += fullText[currentIndex];
                } else {
                    titleElement.innerHTML += fullText[currentIndex];
                }
                
                currentIndex++;
                setTimeout(typeCharacter, 100);
            } else {
                // Add cursor blink effect
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                cursor.style.color = '#ff6b35';
                titleElement.appendChild(cursor);
                
                // Add blink animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    cursor.remove();
                }, 3000);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeCharacter, 1000);
    }
}

// Enhanced hover effects
function initHoverEffects() {
    // Card tilt effect
    const cards = document.querySelectorAll('.solution-card, .audience-item, .process-step');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Add ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    const elements = document.querySelectorAll('.audience-item, .solution-card, .process-step, .stat-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    // Trigger animations when page loads
    setTimeout(() => {
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 500);
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Special animation for statistics
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumber(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add reveal styles
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .reveal-left {
            transform: translateX(-30px);
        }
        
        .reveal-left.revealed {
            transform: translateX(0);
        }
        
        .reveal-right {
            transform: translateX(30px);
        }
        
        .reveal-right.revealed {
            transform: translateX(0);
        }
        
        .reveal-scale {
            transform: scale(0.8);
        }
        
        .reveal-scale.revealed {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
    
    // Apply reveal classes
    const revealElements = document.querySelectorAll('.audience-item, .solution-card, .process-step, .stat-item');
    revealElements.forEach((element, index) => {
        element.classList.add('reveal-element');
        
        // Add variety to animations
        if (index % 3 === 0) element.classList.add('reveal-left');
        else if (index % 3 === 1) element.classList.add('reveal-right');
        else element.classList.add('reveal-scale');
        
        observer.observe(element);
    });
}

// Animate statistics numbers
function animateStatNumber(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    if (!numberElement) return;
    
    const text = numberElement.textContent;
    const hasPercent = text.includes('%');
    const hasDollar = text.includes('$');
    const hasSlash = text.includes('/');
    
    if (hasPercent) {
        const number = parseInt(text);
        animateNumber(numberElement, 0, number, '%', 2000);
    } else if (hasSlash) {
        // For "24/7", animate each part
        const parts = text.split('/');
        if (parts.length === 2) {
            const first = parseInt(parts[0]);
            const second = parseInt(parts[1]);
            
            let currentFirst = 0;
            let currentSecond = 0;
            
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;
            
            const firstIncrement = first / steps;
            const secondIncrement = second / steps;
            
            const timer = setInterval(() => {
                currentFirst += firstIncrement;
                currentSecond += secondIncrement;
                
                if (currentFirst >= first && currentSecond >= second) {
                    numberElement.textContent = `${first}/${second}`;
                    clearInterval(timer);
                } else {
                    numberElement.textContent = `${Math.floor(currentFirst)}/${Math.floor(currentSecond)}`;
                }
            }, stepTime);
        }
    } else if (hasDollar) {
        // Animate dollar signs
        let count = 0;
        const maxCount = 3;
        const timer = setInterval(() => {
            count++;
            numberElement.textContent = '$'.repeat(count);
            
            if (count >= maxCount) {
                clearInterval(timer);
            }
        }, 300);
    }
}

function animateNumber(element, start, end, suffix = '', duration = 2000) {
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.audience-icon, .card-icon');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + Math.random() * 2;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(t => t.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${(index + 1) * 2}px;
                height: ${(index + 1) * 2}px;
                background: radial-gradient(circle, rgba(255, 107, 53, ${0.5 - index * 0.02}) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${point.x - (index + 1)}px;
                top: ${point.y - (index + 1)}px;
                transition: opacity 0.1s ease;
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                trailElement.style.opacity = '0';
                setTimeout(() => {
                    trailElement.remove();
                }, 100);
            }, 50);
        });
    }
}

// Initialize mouse trail on desktop only
if (window.innerWidth > 768) {
    initMouseTrail();
}

