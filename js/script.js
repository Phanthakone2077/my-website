// Green Tea Cafe - Premium Minimal JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Premium Header Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(45, 80, 22, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(45, 80, 22, 0.95)';
        }
    });

    // 2. Luxury Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Elegant Menu Filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active elegantly
            categoryBtns.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(1)';
            });
            
            // Add active with premium effect
            btn.classList.add('active');
            btn.style.transform = 'scale(1.05)';
            
            const category = btn.getAttribute('data-category');
            
            menuItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');
                
                setTimeout(() => {
                    if (category === 'all' || itemCategory === category) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.classList.remove('hidden');
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => item.classList.add('hidden'), 300);
                    }
                }, index * 50);
            });
        });
    });

    // 4. Premium Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply to premium elements
    document.querySelectorAll('.menu-item, .about-text, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // 5. Luxury Form Experience
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Premium focus effects
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#4a7c1c';
                this.style.boxShadow = '0 0 0 3px rgba(74, 124, 28, 0.1)';
                this.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '#e9ecef';
                this.style.boxShadow = 'none';
                this.style.transform = 'scale(1)';
            });
        });

        // Premium form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button');
            submitBtn.style.background = 'linear-gradient(135deg, #4a7c1c, #2d5016)';
            submitBtn.textContent = 'ส่งแล้ว';
            submitBtn.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
                this.reset();
                inputs.forEach(input => input.style.borderColor = '#e9ecef');
            }, 1500);
        });
    }

    // 6. Premium Hover Effects
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // 7. Tea Cup Premium Interaction
    const teaCup = document.querySelector('.tea-cup');
    if (teaCup) {
        teaCup.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.4)';
        });
        
        teaCup.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3)';
        });
    }

    console.log('🍃 Premium Green Tea Experience Loaded');
});

// Premium Minimal Styles
const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
    * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .menu-item {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .category-btn {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .tea-cup {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    input, textarea {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .btn-primary {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .btn-primary:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 15px 35px rgba(45, 80, 22, 0.4) !important;
    }
    
    /* Premium scrollbar */
    ::-webkit-scrollbar {
        width: 6px;
    }
    
    ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.05);
    }
    
    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #4a7c1c, #2d5016);
        border-radius: 10px;
    }
`;

document.head.appendChild(premiumStyles);