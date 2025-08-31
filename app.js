// Modern Portfolio JavaScript

class PortfolioApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.createParticles();
        this.initIntersectionObserver();
    }

    init() {
        // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hidden');
                this.startTypewriter();
                this.animateHero();
            }, 1000);
        });

        // Custom cursor
        this.initCursor();
        
        // Navigation
        this.initNavigation();
        
        // Theme toggle
        this.initThemeToggle();
        
        // Projects functionality
        this.initProjects();
        
        // Contact form
        this.initContactForm();
        
        // Interactive hobbies
        this.initHobbies();
        
        // Mobile navigation
        this.initMobileNav();

        // Skills animation
        this.initSkillsAnimation();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Custom Cursor
    initCursor() {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursor-follower');
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .hobby-item, .skill-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            });
        });
    }

    // Floating Particles
    createParticles() {
        const container = document.getElementById('particles-container');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            container.appendChild(particle);
        }
    }

    // Navigation
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`[data-section="${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-50px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // Theme Toggle
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeIcon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
    }

    // Typewriter Effect
    startTypewriter() {
        const typewriter = document.getElementById('typewriter');
        const texts = [
            'Electronics & Instrumentation Engineering Student',
            'Machine Learning Enthusiast',
            'Problem Solver & Innovator',
            'Future Engineer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        };

        type();
    }

    // Hero Animation
    animateHero() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-actions');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Scroll Handling
    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Intersection Observer for Animations
    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('about-stats')) {
                        this.animateStats();
                    }
                    if (entry.target.classList.contains('skills-content')) {
                        this.animateSkillBars();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe elements
        const animatedElements = document.querySelectorAll('.glass-card, .timeline-item, .skill-item, .project-card, .about-stats, .skills-content');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Statistics Animation
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = current.toFixed(1);
                    setTimeout(updateStat, 20);
                } else {
                    stat.textContent = target.toFixed(1);
                }
            };
            
            updateStat();
        });
    }

    // Skills Animation
    initSkillsAnimation() {
        // Add enhanced hover effects for skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(skillItem => {
            const description = skillItem.querySelector('.skill-description');
            
            skillItem.addEventListener('mouseenter', () => {
                if (description) {
                    description.style.opacity = '1';
                    description.style.maxHeight = '100px';
                    description.style.marginTop = '0.5rem';
                }
            });
            
            skillItem.addEventListener('mouseleave', () => {
                if (description) {
                    description.style.opacity = '0';
                    description.style.maxHeight = '0';
                    description.style.marginTop = '0';
                }
            });
        });
    }

    animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const progress = item.querySelector('.skill-progress');
                const level = item.getAttribute('data-level');
                if (progress && level) {
                    progress.style.width = level + '%';
                }
            }, index * 200);
        });
    }

    // Projects Functionality
    initProjects() {
        this.initProjectFilters();
        this.initProjectModals();
    }

    initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    initProjectModals() {
        const projectData = [
            {
                title: 'ML Based Object Classifier',
                description: 'Designed and deployed a real-time object classifier using OpenCV and MobileNetV2 (TensorFlow), achieving fast and accurate predictions on custom datasets. This project demonstrates advanced machine learning techniques and computer vision applications, with real-time processing capabilities and high accuracy rates.',
                technologies: ['Python', 'OpenCV', 'TensorFlow', 'MobileNetV2'],
                github: 'https://github.com',
                category: 'Machine Learning',
                icon: '🤖',
                certifications: [
                    'Supervised Machine Learning – Coursera (by Andrew Ng, Stanford Online)',
                    'Advanced Learning Algorithms – Coursera (by Andrew Ng, Stanford Online)'
                ]
            },
            {
                title: 'Personal Portfolio Website',
                description: 'Built and deployed a static personal portfolio website using HTML and CSS, and hosted using Firebase. Features modern design principles, responsive layout, and optimized performance for all devices. The website showcases projects, skills, and achievements in an interactive and engaging manner.',
                technologies: ['HTML', 'CSS', 'Firebase'],
                liveDemo: 'https://firebase.app',
                github: 'https://github.com',
                category: 'Web Development',
                icon: '🌐',
                certifications: [
                    'Web Development fundamentals through practical projects'
                ]
            }
        ];

        const modal = document.getElementById('project-modal');
        const modalClose = document.getElementById('modal-close');
        const modalBackdrop = modal.querySelector('.modal-backdrop');

        // Open modal - Fixed event listener attachment
        const attachModalListeners = () => {
            document.querySelectorAll('.project-btn').forEach(btn => {
                // Remove existing listeners to prevent duplicates
                btn.removeEventListener('click', this.handleModalOpen);
                
                // Add new listener
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const projectIndex = parseInt(btn.getAttribute('data-project'));
                    const project = projectData[projectIndex];
                    
                    if (project) {
                        this.populateModal(project);
                        modal.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
        };

        // Initial attachment
        attachModalListeners();

        // Re-attach after DOM changes (like filtering)
        setTimeout(() => {
            attachModalListeners();
        }, 100);

        // Close modal
        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        };

        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    populateModal(project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-project-icon').textContent = project.icon;
        
        // Technologies
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        // Certifications
        const certList = document.getElementById('modal-certifications-list');
        certList.innerHTML = '';
        if (project.certifications && project.certifications.length > 0) {
            project.certifications.forEach(cert => {
                const li = document.createElement('li');
                li.textContent = cert;
                certList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No specific certifications for this project';
            li.style.fontStyle = 'italic';
            li.style.opacity = '0.7';
            certList.appendChild(li);
        }

        // Links
        const githubLink = document.getElementById('modal-github');
        const demoLink = document.getElementById('modal-demo');
        
        if (project.github) {
            githubLink.href = project.github;
            githubLink.style.display = 'inline-flex';
            githubLink.textContent = 'View on GitHub';
        } else {
            githubLink.style.display = 'none';
        }
        
        if (project.liveDemo) {
            demoLink.href = project.liveDemo;
            demoLink.style.display = 'inline-flex';
            demoLink.textContent = 'Live Demo';
        } else {
            demoLink.style.display = 'none';
        }
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                this.showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                this.showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            this.showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        });
    }

    showFormMessage(message, type) {
        const form = document.getElementById('contact-form');
        const existingMessage = form.querySelector('.form-message');
        
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message status status--${type}`;
        messageDiv.textContent = message;
        messageDiv.style.marginTop = '1rem';
        
        form.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Interactive Hobbies
    initHobbies() {
        this.initGuitar();
        this.initRubiksCube();
    }

    initGuitar() {
        const guitar = document.getElementById('guitar');
        const strings = document.querySelectorAll('.string');
        
        strings.forEach((string, index) => {
            string.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playStringSound(index);
                
                // Visual feedback
                string.style.animation = 'none';
                string.style.background = 'var(--accent-blue)';
                string.style.boxShadow = '0 0 10px var(--accent-blue)';
                
                setTimeout(() => {
                    string.style.animation = 'string-vibrate 0.3s ease-in-out';
                    setTimeout(() => {
                        string.style.background = '#FFD700';
                        string.style.boxShadow = 'none';
                    }, 300);
                }, 10);
            });
        });

        // Guitar body click effect
        guitar.addEventListener('click', () => {
            guitar.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                guitar.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    }

    playStringSound(stringIndex) {
        // Create a simple audio tone using Web Audio API
        const frequencies = [82.41, 110, 146.83, 196, 246.94, 329.63]; // Guitar string frequencies
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequencies[stringIndex], audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.8);
        } catch (error) {
            console.log('Audio not supported in this browser');
        }
    }

    initRubiksCube() {
        const cube = document.getElementById('rubiks-cube');
        let rotationX = -30;
        let rotationY = 45;
        let isAnimating = false;
        
        cube.addEventListener('click', () => {
            if (isAnimating) return;
            
            isAnimating = true;
            rotationY += 90;
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.1)`;
            cube.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
                setTimeout(() => {
                    isAnimating = false;
                }, 200);
            }, 300);
        });
        
        // Auto-rotate occasionally
        setInterval(() => {
            if (!isAnimating && Math.random() < 0.1) { // 10% chance every interval
                rotationX += (Math.random() - 0.5) * 60;
                rotationY += (Math.random() - 0.5) * 60;
                cube.style.transition = 'transform 2s ease';
                cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            }
        }, 5000);
    }

    // Mobile Navigation
    initMobileNav() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Resume Download
    initResumeDownload() {
        const downloadBtn = document.getElementById('download-resume');
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a comprehensive text resume
            const resumeContent = `
DARPAN JYOTI GOSWAMI
Electronics and Instrumentation Engineering Student
National Institute of Technology, Silchar

Contact Information:
Phone: +91 8099598837
Email: Contact via portfolio website
Location: Silchar, Assam, India
GitHub: Available on portfolio
LinkedIn: Available on portfolio

EDUCATION:
─────────────────────────────────────────────────────────────
Bachelor of Technology - Electronics and Instrumentation Engineering
National Institute of Technology, Silchar
Duration: Aug 2024 - Present
CGPA: 8.6

Higher Secondary Education
Ranjit Sarma Academy Sr. Secondary School
Duration: 2022 - 2024
Grade: 88%

High School
Holy Child Public School, Mangaldai
Year: 2022
Grade: 95%

TECHNICAL SKILLS:
─────────────────────────────────────────────────────────────
Programming Languages:
• Python (Advanced - 90%)
• C++ (Proficient - 85%)
• C (Proficient - 80%)

Frameworks & Libraries:
• TensorFlow (85%)
• OpenCV (80%)
• Scikit-Learn
• Firebase Hosting

Technologies & Tools:
• HTML/CSS
• SolidWorks
• Arduino
• Windows Platform

PROJECTS:
─────────────────────────────────────────────────────────────
1. ML Based Object Classifier
   • Designed and deployed real-time object classifier
   • Technologies: Python, OpenCV, TensorFlow, MobileNetV2
   • Achieved fast and accurate predictions on custom datasets
   • Category: Machine Learning

2. Personal Portfolio Website
   • Built and deployed static portfolio website
   • Technologies: HTML, CSS, Firebase
   • Features responsive design and modern UI/UX
   • Category: Web Development

CERTIFICATIONS:
─────────────────────────────────────────────────────────────
• Supervised Machine Learning – Coursera
  (by Andrew Ng, Stanford Online)
• Advanced Learning Algorithms – Coursera
  (by Andrew Ng, Stanford Online)
• Krittim-Bot Building Workshop – N.E.R.D.S NIT Silchar

PROFILE SUMMARY:
─────────────────────────────────────────────────────────────
Driven and detail-oriented Electronics and Instrumentation Engineering 
student at NIT Silchar with a good foundation in electronics, embedded 
systems, and programming. Skilled at quickly learning new tools and 
applying innovative problem-solving approaches to real-world challenges.

HOBBIES & INTERESTS:
─────────────────────────────────────────────────────────────
• Playing Guitar
• Speedcubing (Rubik's Cube solving)

Generated from: ${window.location.href}
Date: ${new Date().toLocaleDateString()}
            `;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Darpan_Jyoti_Goswami_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success notification
            this.showNotification('📄 Resume downloaded successfully!', 'success');
        });
    }

    // View Projects Button
    initViewProjects() {
        const viewProjectsBtn = document.getElementById('view-projects');
        viewProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification status status--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            z-index: 9999;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Handle Resize
    handleResize() {
        // Recalculate particles if needed
        const particles = document.querySelectorAll('.particle');
        if (particles.length === 0) {
            this.createParticles();
        }
    }

    // Easter Eggs
    initEasterEggs() {
        let konamiCode = [];
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.triggerEasterEgg();
                konamiCode = [];
            }
        });

        // Secret click sequence on name
        let nameClicks = 0;
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.addEventListener('click', () => {
                nameClicks++;
                if (nameClicks >= 5) {
                    this.triggerEasterEgg();
                    nameClicks = 0;
                }
                setTimeout(() => { nameClicks = 0; }, 3000);
            });
        }
    }

    triggerEasterEgg() {
        // Fun animation or message
        const cube = document.getElementById('rubiks-cube');
        const guitar = document.getElementById('guitar');
        
        if (cube) {
            cube.style.animation = 'spin 2s linear infinite';
            setTimeout(() => {
                cube.style.animation = '';
            }, 4000);
        }
        
        if (guitar) {
            guitar.style.animation = 'bounce 1s ease-in-out infinite';
            setTimeout(() => {
                guitar.style.animation = '';
            }, 4000);
        }
        
        // Create confetti effect
        this.createConfetti();
        
        this.showNotification('🎉 Easter egg found! You discovered a secret!', 'success');
    }

    createConfetti() {
        const colors = ['#00d4ff', '#ff6b35', '#ffcd3c', '#ff4757', '#5f27cd'];
        const container = document.body;
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 9999;
                animation: confetti-fall 3s linear forwards;
            `;
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }
    }
}

// Additional CSS for animations and responsive design
const additionalStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: rgba(31, 33, 33, 0.95);
        backdrop-filter: blur(20px);
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 2rem;
        transition: left 0.3s ease;
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu .nav-link {
        font-size: 1.2rem;
        padding: 1rem 0;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

@keyframes confetti-fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

/* Enhanced skill item hover effects */
.skill-item .skill-description {
    transition: all 0.3s ease;
    overflow: hidden;
}

/* Improved modal animations */
.modal {
    backdrop-filter: blur(10px);
}

.modal.hidden .modal-content {
    transform: scale(0.8) translateY(-50px);
    opacity: 0;
}

.modal-content {
    transform: scale(1) translateY(0);
    opacity: 1;
    transition: all 0.3s ease;
}
`;

// Add additional styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.initResumeDownload();
    app.initViewProjects();
    app.initEasterEggs();
});

// Smooth scrollbar enhancement
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Performance optimization: Lazy load images if any were added
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});