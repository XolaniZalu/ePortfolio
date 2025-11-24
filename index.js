// Portfolio Interactive Functionality
document.addEventListener("DOMContentLoaded", function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);


    // Enhanced Scroll Animations with Stagger Effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add bounce effect for project cards
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'bounceIn 0.8s ease';
                }
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation with stagger
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-stats, .contact-form');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Animated Counter Function
    function animateCounters() {
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', ''));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 40);
        });
    }

    // Floating Animation for Hero Elements
    function addFloatingAnimation() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            let floatDirection = 1;
            setInterval(() => {
                floatDirection *= -1;
                heroImage.style.transform = `translateY(${floatDirection * 10}px)`;
                heroImage.style.transition = 'transform 2s ease-in-out';
            }, 2000);
        }
    }
    
    addFloatingAnimation();

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Dynamic Text Overflow Prevention for Mobile
    function preventTextOverflow() {
        if (window.innerWidth <= 768) {
            // Get all contact items and force proper text wrapping
            const contactItems = document.querySelectorAll('.contact-item span');
            contactItems.forEach(item => {
                // Ensure text doesn't exceed viewport
                const maxWidth = window.innerWidth - 80; // Account for padding and icon
                item.style.maxWidth = maxWidth + 'px';
                item.style.wordBreak = 'break-all';
                item.style.overflowWrap = 'anywhere';
                item.style.whiteSpace = 'normal';
            });

            // Also handle contact info paragraph
            const contactP = document.querySelector('.contact-info p');
            if (contactP) {
                const maxWidth = window.innerWidth - 40;
                contactP.style.maxWidth = maxWidth + 'px';
                contactP.style.wordBreak = 'break-word';
                contactP.style.overflowWrap = 'break-word';
            }

            // Handle all text elements in contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const allTextElements = contactSection.querySelectorAll('p, span, h3');
                allTextElements.forEach(element => {
                    element.style.maxWidth = '100%';
                    element.style.wordBreak = 'break-word';
                    element.style.overflowWrap = 'break-word';
                    element.style.boxSizing = 'border-box';
                });
            }
        }
    }

    // Run text overflow prevention
    preventTextOverflow();
    window.addEventListener('resize', preventTextOverflow);
    setTimeout(preventTextOverflow, 500);

    // Enhanced Typing Effect for Hero Title with Sound Effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const nameSpan = heroTitle.querySelector('.highlight');
        const nameText = nameSpan ? nameSpan.textContent : 'Your Name';
        
        if (nameSpan) {
            nameSpan.textContent = '';
            nameSpan.style.borderRight = '2px solid #ffd700';
            nameSpan.style.animation = 'blink 1s infinite';
            
            let charIndex = 0;
            function typeChar() {
                if (charIndex < nameText.length) {
                    nameSpan.textContent += nameText[charIndex];
                    
                    // Add glitch effect occasionally
                    if (Math.random() < 0.2) {
                        nameSpan.style.transform = 'skew(' + (Math.random() * 2 - 1) + 'deg)';
                        setTimeout(() => {
                            nameSpan.style.transform = 'skew(0deg)';
                        }, 50);
                    }
                    
                    charIndex++;
                    setTimeout(typeChar, 80 + Math.random() * 40);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        nameSpan.style.borderRight = 'none';
                        nameSpan.style.animation = 'none';
                    }, 1000);
                }
            }
            
            setTimeout(typeChar, 800);
        }
    }

    // Create Floating Particles Background
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            hero.appendChild(particle);
        }
    }
    
    createParticles();

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Skills Animation on Scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                entry.target.classList.add('animate-skill');
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => skillObserver.observe(item));

    // Enhanced CSS Animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3) translateY(100px);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes rainbow {
            0% { color: #ff0000; }
            16% { color: #ff8000; }
            33% { color: #ffff00; }
            50% { color: #00ff00; }
            66% { color: #0080ff; }
            83% { color: #8000ff; }
            100% { color: #ff0000; }
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #ffd700, transparent);
            border-radius: 50%;
            animation: float 3s ease-in-out infinite;
            pointer-events: none;
            z-index: 1;
        }
        
        .animate-skill {
            animation: slideInUp 0.6s ease forwards;
        }
        
        .nav-link.active {
            color: #007BFF !important;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #007BFF;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            background: rgba(0, 123, 255, 0.1);
        }
        
        .hero-title .highlight {
            position: relative;
            display: inline-block;
        }
        
        .skill-item:hover {
            animation: pulse 0.6s ease-in-out;
        }
        
        .project-card:hover .project-image i {
            animation: rainbow 2s linear infinite;
        }
    `;
    document.head.appendChild(style);

    // Interactive Cursor Trail
    function createCursorTrail() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        updateCursor();
        
        // Enhance cursor on hover
        document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(0, 123, 255, 0.3)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 123, 255, 0.1)';
            });
        });
    }
    
    createCursorTrail();

    // Enhanced Project Card Effects with 3D Tilt
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 123, 255, 0.4)';
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            this.style.transform = 'translateY(0px) rotateX(0deg)';
        });
        
        // 3D Tilt Effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Dynamic Progress Bars for Skills
    function animateSkillBars() {
        const skills = document.querySelectorAll('.skill-item');
        skills.forEach((skill, index) => {
            const progressBar = document.createElement('div');
            progressBar.className = 'skill-progress';
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px;
                background: linear-gradient(90deg, #007BFF, #00ff88);
                width: 0;
                transition: width 2s ease ${index * 0.1}s;
            `;
            
            skill.style.position = 'relative';
            skill.appendChild(progressBar);
            
            // Animate on hover
            skill.addEventListener('mouseenter', () => {
                progressBar.style.width = Math.random() * 40 + 60 + '%';
            });
            
            skill.addEventListener('mouseleave', () => {
                progressBar.style.width = '0%';
            });
        });
    }
    
    setTimeout(animateSkillBars, 1000);

    // Enhanced Navbar with Dynamic Effects
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Background and shadow effects
        if (currentScrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        navbar.style.transition = 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)';
        lastScrollY = currentScrollY;
    });

    // Text Reveal Animation on Scroll
    function addTextRevealAnimation() {
        const textElements = document.querySelectorAll('p, h2, h3');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.05s ease ${index * 0.02}s`;
                element.appendChild(span);
            });
        });
        
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.3 });
        
        textElements.forEach(el => textObserver.observe(el));
    }
    
    // Add text reveal animation after a delay to ensure content is loaded
    setTimeout(addTextRevealAnimation, 2000);

    // Magnetic Button Effect
    function addMagneticEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
    
    addMagneticEffect();
    
    // Background Color Change on Section
    const sectionColors = {
        'home': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'about': '#f8f9fa',
        'skills': '#ffffff',
        'projects': '#f8f9fa',
        'contact': '#ffffff'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId !== 'home') {
                    document.body.style.background = sectionColors[sectionId] || '#ffffff';
                }
            }
        });
    }, { threshold: 0.7 });
    
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Multi-Game System Implementation
    class GameManager {
        constructor() {
            this.currentGame = 'snake';
            this.games = {};
            this.scoreElement = document.getElementById('currentScore');
            this.highScoreElement = document.getElementById('currentHighScore');
            this.levelElement = document.getElementById('currentLevel');
            this.levelDisplay = document.getElementById('levelDisplay');
            this.overlay = document.getElementById('gameOverlay');
            this.overlayTitle = document.getElementById('overlayTitle');
            this.overlayMessage = document.getElementById('overlayMessage');
            this.canvasContainer = document.getElementById('gameCanvasContainer');
            
            this.setupEventListeners();
            this.initializeGames();
            this.switchGame('snake');
        }
        
        setupEventListeners() {
            // Game tab switching
            document.querySelectorAll('.game-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const gameType = e.target.getAttribute('data-game');
                    this.switchGame(gameType);
                });
            });
            
            // Game controls
            document.getElementById('startGameBtn').addEventListener('click', () => this.startCurrentGame());
            document.getElementById('pauseGameBtn').addEventListener('click', () => this.pauseCurrentGame());
            document.getElementById('resetGameBtn').addEventListener('click', () => this.resetCurrentGame());
            document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
            document.getElementById('exitFullscreenBtn').addEventListener('click', () => this.exitFullscreen());
            
            // Fullscreen controls
            document.getElementById('fsStartBtn').addEventListener('click', () => this.startCurrentGame());
            document.getElementById('fsPauseBtn').addEventListener('click', () => this.pauseCurrentGame());
            document.getElementById('fsResetBtn').addEventListener('click', () => this.resetCurrentGame());
            document.getElementById('fsExitBtn').addEventListener('click', () => this.exitFullscreen());
            document.getElementById('toggleControlsBtn').addEventListener('click', () => this.toggleFullscreenControls());
            
            // Mobile controls
            document.querySelectorAll('.dpad-btn').forEach(btn => {
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    const direction = e.target.getAttribute('data-direction');
                    this.handleMobileInput(direction);
                });
                btn.addEventListener('click', (e) => {
                    const direction = e.target.getAttribute('data-direction');
                    this.handleMobileInput(direction);
                });
            });
            
            // Keyboard controls
            document.addEventListener('keydown', (e) => {
                // Global keyboard shortcuts
                if (e.key === 'Escape') {
                    this.exitFullscreen();
                    return;
                }
                
                if (e.key === ' ') {
                    e.preventDefault();
                    this.pauseCurrentGame();
                    return;
                }
                
                if (e.key === 'r' || e.key === 'R') {
                    if (e.ctrlKey || e.metaKey) return; // Don't interfere with page refresh
                    e.preventDefault();
                    this.resetCurrentGame();
                    return;
                }
                
                if (e.key === 'f' || e.key === 'F') {
                    if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser search
                    e.preventDefault();
                    this.toggleFullscreen();
                    return;
                }
                
                // Pass to current game
                if (this.games[this.currentGame]) {
                    this.games[this.currentGame].handleKeyPress(e);
                }
            });
            
            // Keyboard release handling
            document.addEventListener('keyup', (e) => {
                if (this.games[this.currentGame] && this.games[this.currentGame].handleKeyRelease) {
                    this.games[this.currentGame].handleKeyRelease(e);
                }
            });
            
            // Fullscreen change detection
            document.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    this.canvasContainer.classList.remove('fullscreen');
                }
            });
        }
        
        switchGame(gameType) {
            // Stop current game and reset keys
            if (this.games[this.currentGame]) {
                this.games[this.currentGame].stop();
                if (this.games[this.currentGame].keys) {
                    this.games[this.currentGame].keys = {};
                }
            }
            
            // Update UI
            document.querySelectorAll('.game-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`[data-game="${gameType}"]`).classList.add('active');
            
            document.querySelectorAll('.game-canvas').forEach(canvas => canvas.classList.remove('active'));
            document.getElementById(gameType + 'Canvas').classList.add('active');
            
            this.currentGame = gameType;
            
            // Update instructions and UI
            this.updateGameInstructions(gameType);
            this.updateScoreDisplay();
            
            // Show game overlay
            const gameNames = {
                'snake': 'Snake Game',
                'pong': 'Pong Game',
                'breakout': 'Breakout Game',
                'tetris': 'Tetris Game'
            };
            
            this.showOverlay(gameNames[gameType], 'Press Start to begin!');
        }
        
        updateGameInstructions(gameType) {
            const instructions = {
                'snake': {
                    title: 'Snake Game',
                    text: ['Use arrow keys or WASD to control the snake', 'Eat the red food to grow and increase your score', 'Don\'t hit the walls or yourself!']
                },
                'pong': {
                    title: 'Pong Game',
                    text: ['Use W/S or Up/Down arrows to move your paddle', 'Hit the ball back to your opponent', 'First to 10 points wins!']
                },
                'breakout': {
                    title: 'Breakout Game',
                    text: ['Use A/D or Left/Right arrows to move the paddle', 'Keep the ball in play and break all the bricks', 'Don\'t let the ball fall off the bottom!']
                },
                'tetris': {
                    title: 'Tetris Game',
                    text: ['Use arrow keys to move and rotate pieces', 'Complete horizontal lines to clear them', 'Game ends when pieces reach the top!']
                }
            };
            
            const content = document.getElementById('instructionsContent');
            const info = instructions[gameType];
            content.innerHTML = `<h3>${info.title}</h3>` + info.text.map(text => `<p>${text}</p>`).join('');
            
            // Show/hide level display
            this.levelDisplay.style.display = gameType === 'tetris' ? 'inline' : 'none';
        }
        
        initializeGames() {
            this.games.snake = new SnakeGame(document.getElementById('snakeCanvas'), this);
            this.games.pong = new PongGame(document.getElementById('pongCanvas'), this);
            this.games.breakout = new BreakoutGame(document.getElementById('breakoutCanvas'), this);
            this.games.tetris = new TetrisGame(document.getElementById('tetrisCanvas'), this);
        }
        
        startCurrentGame() {
            if (this.games[this.currentGame]) {
                this.games[this.currentGame].start();
            }
        }
        
        pauseCurrentGame() {
            if (this.games[this.currentGame]) {
                this.games[this.currentGame].pause();
            }
        }
        
        resetCurrentGame() {
            if (this.games[this.currentGame]) {
                this.games[this.currentGame].reset();
            }
        }
        
        handleMobileInput(direction) {
            if (this.games[this.currentGame]) {
                this.games[this.currentGame].handleMobileInput(direction);
            }
        }
        
        updateScoreDisplay() {
            if (this.games[this.currentGame]) {
                const game = this.games[this.currentGame];
                const score = game.score || 0;
                const highScore = game.getHighScore() || 0;
                const level = game.level || 1;
                
                // Update regular displays
                this.scoreElement.textContent = score;
                this.highScoreElement.textContent = highScore;
                if (game.level !== undefined) {
                    this.levelElement.textContent = level;
                }
                
                // Update fullscreen displays
                document.getElementById('fsCurrentScore').textContent = score;
                document.getElementById('fsCurrentHighScore').textContent = highScore;
                document.getElementById('fsCurrentLevel').textContent = level;
                
                // Show/hide level display in fullscreen
                const fsLevelDisplay = document.getElementById('fsLevelDisplay');
                fsLevelDisplay.style.display = this.currentGame === 'tetris' ? 'inline' : 'none';
            }
        }
        
        showOverlay(title, message) {
            this.overlayTitle.textContent = title;
            this.overlayMessage.textContent = message;
            this.overlay.classList.remove('hidden');
        }
        
        hideOverlay() {
            this.overlay.classList.add('hidden');
        }
        
        toggleFullscreen() {
            if (!document.fullscreenElement) {
                this.canvasContainer.requestFullscreen().then(() => {
                    this.canvasContainer.classList.add('fullscreen');
                    this.showFullscreenNotification('Entered Fullscreen Mode', 'Press ESC to exit • Use gear icon for controls');
                    this.updateScoreDisplay(); // Sync fullscreen scores
                }).catch(err => {
                    console.log('Fullscreen failed:', err);
                    this.showFullscreenNotification('Fullscreen Not Supported', 'Your browser doesn\'t support fullscreen mode');
                });
            } else {
                this.exitFullscreen();
            }
        }
        
        exitFullscreen() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            this.canvasContainer.classList.remove('fullscreen');
        }
        
        toggleFullscreenControls() {
            const controlPanel = document.querySelector('.fs-control-panel');
            controlPanel.classList.toggle('hidden');
        }
        
        showFullscreenNotification(title, message) {
            // Remove existing notification if any
            const existing = document.querySelector('.fullscreen-notification');
            if (existing) {
                existing.remove();
            }
            
            // Create new notification
            const notification = document.createElement('div');
            notification.className = 'fullscreen-notification';
            notification.innerHTML = `
                <h4 style=\"margin: 0 0 10px 0; color: #ffd700;\">${title}</h4>
                <p style=\"margin: 0; font-size: 14px;\">${message}</p>
            `;
            
            this.canvasContainer.appendChild(notification);
            
            // Auto remove after animation
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 3000);
        }
    }

    // Snake Game Class
    class SnakeGame {
        constructor(canvas, gameManager) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.gameManager = gameManager;
            
            // Game settings
            this.gridSize = 20;
            this.tileCount = this.canvas.width / this.gridSize;
            
            // Game state
            this.reset();
        }
        
        reset() {
            this.snake = [{ x: 10, y: 10 }];
            this.food = {};
            this.dx = 0;
            this.dy = 0;
            this.score = 0;
            this.gameRunning = false;
            this.gamePaused = false;
            this.waitingForFirstMove = false;
            this.generateFood();
            this.draw();
        }
        
        getHighScore() {
            return localStorage.getItem('snakeHighScore') || 0;
        }
        
        start() {
            if (this.gamePaused) {
                this.gamePaused = false;
                this.gameManager.hideOverlay();
                this.gameLoop();
                return;
            }
            
            this.gameRunning = true;
            this.gamePaused = false;
            this.canvas.classList.add('playing');
            this.gameManager.hideOverlay();
            
            this.gameManager.showOverlay('Ready!', 'Use arrow keys or WASD to start moving');
            this.waitingForFirstMove = true;
        }
        
        pause() {
            if (!this.gameRunning) return;
            
            this.gamePaused = !this.gamePaused;
            if (this.gamePaused) {
                this.gameManager.showOverlay('Game Paused', 'Press Start to continue');
            } else {
                this.gameManager.hideOverlay();
                this.gameLoop();
            }
        }
        
        stop() {
            this.gameRunning = false;
            this.gamePaused = false;
            this.waitingForFirstMove = false;
            this.canvas.classList.remove('playing');
        }
        
        handleKeyPress(e) {
            const keyPressed = e.key;
            const isMovementKey = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'a', 'A', 'w', 'W', 'd', 'D', 's', 'S'].includes(keyPressed);
            
            if (isMovementKey && this.gameRunning) {
                const goingUp = this.dy === -1;
                const goingDown = this.dy === 1;
                const goingRight = this.dx === 1;
                const goingLeft = this.dx === -1;
                
                if ((keyPressed === 'ArrowLeft' || keyPressed === 'a' || keyPressed === 'A') && !goingRight) {
                    this.dx = -1;
                    this.dy = 0;
                }
                if ((keyPressed === 'ArrowUp' || keyPressed === 'w' || keyPressed === 'W') && !goingDown) {
                    this.dx = 0;
                    this.dy = -1;
                }
                if ((keyPressed === 'ArrowRight' || keyPressed === 'd' || keyPressed === 'D') && !goingLeft) {
                    this.dx = 1;
                    this.dy = 0;
                }
                if ((keyPressed === 'ArrowDown' || keyPressed === 's' || keyPressed === 'S') && !goingUp) {
                    this.dx = 0;
                    this.dy = 1;
                }
                
                if (this.waitingForFirstMove) {
                    this.waitingForFirstMove = false;
                    this.gameManager.hideOverlay();
                    this.gameLoop();
                }
            }
        }
        
        handleMobileInput(direction) {
            if (!this.gameRunning) return;
            
            const goingUp = this.dy === -1;
            const goingDown = this.dy === 1;
            const goingRight = this.dx === 1;
            const goingLeft = this.dx === -1;
            
            switch(direction) {
                case 'up':
                    if (!goingDown) { this.dx = 0; this.dy = -1; }
                    break;
                case 'down':
                    if (!goingUp) { this.dx = 0; this.dy = 1; }
                    break;
                case 'left':
                    if (!goingRight) { this.dx = -1; this.dy = 0; }
                    break;
                case 'right':
                    if (!goingLeft) { this.dx = 1; this.dy = 0; }
                    break;
            }
            
            if (this.waitingForFirstMove) {
                this.waitingForFirstMove = false;
                this.gameManager.hideOverlay();
                this.gameLoop();
            }
        }
        
        generateFood() {
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            
            for (let segment of this.snake) {
                if (segment.x === this.food.x && segment.y === this.food.y) {
                    this.generateFood();
                    return;
                }
            }
        }
        
        draw() {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#00ff88';
            for (let segment of this.snake) {
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            }
            
            if (this.snake.length > 0) {
                this.ctx.fillStyle = '#ffd700';
                const head = this.snake[0];
                this.ctx.fillRect(head.x * this.gridSize, head.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            }
            
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
        }
        
        update() {
            if (!this.gameRunning || this.gamePaused || this.waitingForFirstMove) return;
            if (this.dx === 0 && this.dy === 0) return;
            
            const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
            
            if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
                this.gameOver();
                return;
            }
            
            for (let segment of this.snake) {
                if (head.x === segment.x && head.y === segment.y) {
                    this.gameOver();
                    return;
                }
            }
            
            this.snake.unshift(head);
            
            if (head.x === this.food.x && head.y === this.food.y) {
                this.score++;
                this.gameManager.updateScoreDisplay();
                
                const highScore = this.getHighScore();
                if (this.score > highScore) {
                    localStorage.setItem('snakeHighScore', this.score);
                }
                
                this.generateFood();
            } else {
                this.snake.pop();
            }
        }
        
        gameOver() {
            this.gameRunning = false;
            this.canvas.classList.remove('playing');
            this.gameManager.showOverlay('Game Over!', `Final Score: ${this.score}\\nPress Start to play again`);
        }
        
        gameLoop() {
            if (!this.gameRunning || this.gamePaused) return;
            
            setTimeout(() => {
                this.update();
                this.draw();
                this.gameLoop();
            }, 150);
        }
    }

    // Pong Game Class
    class PongGame {
        constructor(canvas, gameManager) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.gameManager = gameManager;
            this.reset();
        }
        
        reset() {
            this.score = 0;
            this.computerScore = 0;
            this.gameRunning = false;
            this.gamePaused = false;
            
            this.paddle = {
                x: 10,
                y: this.canvas.height / 2 - 50,
                width: 10,
                height: 100,
                speed: 5
            };
            
            this.computerPaddle = {
                x: this.canvas.width - 20,
                y: this.canvas.height / 2 - 50,
                width: 10,
                height: 100,
                speed: 3
            };
            
            this.ball = {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                radius: 8,
                speedX: 5,
                speedY: 3
            };
            
            this.draw();
        }
        
        getHighScore() {
            return localStorage.getItem('pongHighScore') || 0;
        }
        
        start() {
            this.gameRunning = true;
            this.gamePaused = false;
            this.gameManager.hideOverlay();
            this.gameLoop();
        }
        
        pause() {
            if (!this.gameRunning) return;
            this.gamePaused = !this.gamePaused;
            if (this.gamePaused) {
                this.gameManager.showOverlay('Game Paused', 'Press Start to continue');
            } else {
                this.gameManager.hideOverlay();
                this.gameLoop();
            }
        }
        
        stop() {
            this.gameRunning = false;
            this.gamePaused = false;
        }
        
        handleKeyPress(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            // Set key states for smooth movement
            if (key === 'w' || key === 'arrowup') {
                this.keys = this.keys || {};
                this.keys.up = true;
            }
            if (key === 's' || key === 'arrowdown') {
                this.keys = this.keys || {};
                this.keys.down = true;
            }
        }
        
        handleKeyUp(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            if (key === 'w' || key === 'arrowup') {
                this.keys = this.keys || {};
                this.keys.up = false;
            }
            if (key === 's' || key === 'arrowdown') {
                this.keys = this.keys || {};
                this.keys.down = false;
            }
        }
        
        handleKeyUp(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            if (key === 'w' || key === 'arrowup') {
                this.keys = this.keys || {};
                this.keys.up = false;
            }
            if (key === 's' || key === 'arrowdown') {
                this.keys = this.keys || {};
                this.keys.down = false;
            }
        }
        
        handleMobileInput(direction) {
            if (!this.gameRunning || this.gamePaused) return;
            
            switch(direction) {
                case 'up':
                    if (this.paddle.y > 0) this.paddle.y -= this.paddle.speed * 3;
                    break;
                case 'down':
                    if (this.paddle.y < this.canvas.height - this.paddle.height) this.paddle.y += this.paddle.speed * 3;
                    break;
            }
        }
        
        update() {
            if (!this.gameRunning || this.gamePaused) return;
            
            // Move ball
            this.ball.x += this.ball.speedX;
            this.ball.y += this.ball.speedY;
            
            // Ball collision with top/bottom
            if (this.ball.y <= this.ball.radius || this.ball.y >= this.canvas.height - this.ball.radius) {
                this.ball.speedY = -this.ball.speedY;
            }
            
            // Ball collision with paddles
            if (this.ball.x <= this.paddle.x + this.paddle.width &&
                this.ball.y >= this.paddle.y &&
                this.ball.y <= this.paddle.y + this.paddle.height) {
                this.ball.speedX = -this.ball.speedX;
            }
            
            if (this.ball.x >= this.computerPaddle.x &&
                this.ball.y >= this.computerPaddle.y &&
                this.ball.y <= this.computerPaddle.y + this.computerPaddle.height) {
                this.ball.speedX = -this.ball.speedX;
            }
            
            // Computer paddle AI
            const paddleCenter = this.computerPaddle.y + this.computerPaddle.height / 2;
            if (paddleCenter < this.ball.y - 35) {
                this.computerPaddle.y += this.computerPaddle.speed;
            } else if (paddleCenter > this.ball.y + 35) {
                this.computerPaddle.y -= this.computerPaddle.speed;
            }
            
            // Scoring
            if (this.ball.x < 0) {
                this.computerScore++;
                this.resetBall();
            } else if (this.ball.x > this.canvas.width) {
                this.score++;
                this.gameManager.updateScoreDisplay();
                this.resetBall();
                
                const highScore = this.getHighScore();
                if (this.score > highScore) {
                    localStorage.setItem('pongHighScore', this.score);
                }
            }
            
            // Check for game end
            if (this.score >= 10 || this.computerScore >= 10) {
                this.gameOver();
            }
        }
        
        resetBall() {
            this.ball.x = this.canvas.width / 2;
            this.ball.y = this.canvas.height / 2;
            this.ball.speedX = -this.ball.speedX;
        }
        
        draw() {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw paddles
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
            this.ctx.fillRect(this.computerPaddle.x, this.computerPaddle.y, this.computerPaddle.width, this.computerPaddle.height);
            
            // Draw ball
            this.ctx.beginPath();
            this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw center line
            this.ctx.setLineDash([5, 15]);
            this.ctx.beginPath();
            this.ctx.moveTo(this.canvas.width / 2, 0);
            this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
            this.ctx.stroke();
            
            // Draw scores
            this.ctx.font = '30px Arial';
            this.ctx.fillText(this.score.toString(), this.canvas.width / 4, 50);
            this.ctx.fillText(this.computerScore.toString(), 3 * this.canvas.width / 4, 50);
        }
        
        gameOver() {
            this.gameRunning = false;
            const winner = this.score > this.computerScore ? 'You Win!' : 'Computer Wins!';
            this.gameManager.showOverlay('Game Over!', `${winner}\\nFinal Score: ${this.score} - ${this.computerScore}`);
        }
        
        gameLoop() {
            if (!this.gameRunning || this.gamePaused) return;
            
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    // Breakout Game Class  
    class BreakoutGame {
        constructor(canvas, gameManager) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.gameManager = gameManager;
            this.reset();
        }
        
        reset() {
            this.score = 0;
            this.level = 1;
            this.gameRunning = false;
            this.gamePaused = false;
            
            this.paddle = {
                x: this.canvas.width / 2 - 60,
                y: this.canvas.height - 20,
                width: 120,
                height: 10,
                speed: 7
            };
            
            this.ball = {
                x: this.canvas.width / 2,
                y: this.canvas.height - 30,
                radius: 8,
                speedX: 4,
                speedY: -4
            };
            
            this.initializeBricks();
            this.draw();
        }
        
        initializeBricks() {
            this.bricks = [];
            const rows = 5;
            const cols = 8;
            const brickWidth = 70;
            const brickHeight = 20;
            const padding = 5;
            const offsetTop = 50;
            const offsetLeft = 35;
            
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    this.bricks.push({
                        x: offsetLeft + c * (brickWidth + padding),
                        y: offsetTop + r * (brickHeight + padding),
                        width: brickWidth,
                        height: brickHeight,
                        active: true,
                        color: `hsl(${r * 60}, 70%, 60%)`
                    });
                }
            }
        }
        
        getHighScore() {
            return localStorage.getItem('breakoutHighScore') || 0;
        }
        
        start() {
            this.gameRunning = true;
            this.gamePaused = false;
            this.gameManager.hideOverlay();
            this.gameLoop();
        }
        
        pause() {
            if (!this.gameRunning) return;
            this.gamePaused = !this.gamePaused;
            if (this.gamePaused) {
                this.gameManager.showOverlay('Game Paused', 'Press Start to continue');
            } else {
                this.gameManager.hideOverlay();
                this.gameLoop();
            }
        }
        
        stop() {
            this.gameRunning = false;
            this.gamePaused = false;
        }
        
        handleKeyPress(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            // Set key states for smooth movement
            if (key === 'a' || key === 'arrowleft') {
                this.keys = this.keys || {};
                this.keys.left = true;
            }
            if (key === 'd' || key === 'arrowright') {
                this.keys = this.keys || {};
                this.keys.right = true;
            }
        }
        
        handleKeyUp(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            if (key === 'a' || key === 'arrowleft') {
                this.keys = this.keys || {};
                this.keys.left = false;
            }
            if (key === 'd' || key === 'arrowright') {
                this.keys = this.keys || {};
                this.keys.right = false;
            }
        }
        
        handleKeyUp(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            if (key === 'a' || key === 'arrowleft') {
                this.keys = this.keys || {};
                this.keys.left = false;
            }
            if (key === 'd' || key === 'arrowright') {
                this.keys = this.keys || {};
                this.keys.right = false;
            }
        }
        
        handleMobileInput(direction) {
            if (!this.gameRunning || this.gamePaused) return;
            
            switch(direction) {
                case 'left':
                    if (this.paddle.x > 0) this.paddle.x -= this.paddle.speed * 2;
                    break;
                case 'right':
                    if (this.paddle.x < this.canvas.width - this.paddle.width) this.paddle.x += this.paddle.speed * 2;
                    break;
            }
        }
        
        update() {
            if (!this.gameRunning || this.gamePaused) return;
            
            // Move ball
            this.ball.x += this.ball.speedX;
            this.ball.y += this.ball.speedY;
            
            // Ball collision with walls
            if (this.ball.x <= this.ball.radius || this.ball.x >= this.canvas.width - this.ball.radius) {
                this.ball.speedX = -this.ball.speedX;
            }
            
            if (this.ball.y <= this.ball.radius) {
                this.ball.speedY = -this.ball.speedY;
            }
            
            // Ball collision with paddle
            if (this.ball.y >= this.paddle.y - this.ball.radius &&
                this.ball.x >= this.paddle.x &&
                this.ball.x <= this.paddle.x + this.paddle.width) {
                this.ball.speedY = -this.ball.speedY;
                
                // Add angle based on where ball hits paddle
                const hitPos = (this.ball.x - this.paddle.x) / this.paddle.width;
                this.ball.speedX = 6 * (hitPos - 0.5);
            }
            
            // Ball collision with bricks
            for (let brick of this.bricks) {
                if (brick.active &&
                    this.ball.x >= brick.x &&
                    this.ball.x <= brick.x + brick.width &&
                    this.ball.y >= brick.y &&
                    this.ball.y <= brick.y + brick.height) {
                    
                    brick.active = false;
                    this.ball.speedY = -this.ball.speedY;
                    this.score += 10;
                    this.gameManager.updateScoreDisplay();
                    
                    const highScore = this.getHighScore();
                    if (this.score > highScore) {
                        localStorage.setItem('breakoutHighScore', this.score);
                    }
                    break;
                }
            }
            
            // Check win condition
            if (this.bricks.every(brick => !brick.active)) {
                this.level++;
                this.initializeBricks();
                this.ball.x = this.canvas.width / 2;
                this.ball.y = this.canvas.height - 30;
                this.ball.speedY = -Math.abs(this.ball.speedY);
            }
            
            // Check lose condition
            if (this.ball.y > this.canvas.height) {
                this.gameOver();
            }
        }
        
        draw() {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw paddle
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
            
            // Draw ball
            this.ctx.beginPath();
            this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw bricks
            for (let brick of this.bricks) {
                if (brick.active) {
                    this.ctx.fillStyle = brick.color;
                    this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                }
            }
            
            // Draw score
            this.ctx.fillStyle = 'white';
            this.ctx.font = '16px Arial';
            this.ctx.fillText(`Score: ${this.score}`, 10, 25);
            this.ctx.fillText(`Level: ${this.level}`, 10, 45);
        }
        
        gameOver() {
            this.gameRunning = false;
            this.gameManager.showOverlay('Game Over!', `Final Score: ${this.score}\\nLevel Reached: ${this.level}`);
        }
        
        gameLoop() {
            if (!this.gameRunning || this.gamePaused) return;
            
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    // Tetris Game Class (Simplified)
    class TetrisGame {
        constructor(canvas, gameManager) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.gameManager = gameManager;
            this.reset();
        }
        
        reset() {
            this.score = 0;
            this.level = 1;
            this.lines = 0;
            this.gameRunning = false;
            this.gamePaused = false;
            this.dropTime = 0;
            this.dropInterval = 1000;
            
            this.cols = 10;
            this.rows = 20;
            this.blockSize = 15;
            this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
            
            this.pieces = [
                { shape: [[1,1,1,1]], color: 'cyan' },     // I-piece
                { shape: [[1,1],[1,1]], color: 'yellow' }, // O-piece
                { shape: [[0,1,0],[1,1,1]], color: 'purple' }, // T-piece
                { shape: [[0,1,1],[1,1,0]], color: 'green' },  // S-piece
                { shape: [[1,1,0],[0,1,1]], color: 'red' },    // Z-piece
                { shape: [[1,0,0],[1,1,1]], color: 'blue' },   // J-piece
                { shape: [[0,0,1],[1,1,1]], color: 'orange' }  // L-piece
            ];
            
            this.spawnNewPiece();
            this.draw();
        }
        
        spawnNewPiece() {
            const pieceType = this.pieces[Math.floor(Math.random() * this.pieces.length)];
            this.currentPiece = {
                x: Math.floor(this.cols / 2) - 1,
                y: 0,
                shape: pieceType.shape,
                color: pieceType.color
            };
        }
        
        getHighScore() {
            return localStorage.getItem('tetrisHighScore') || 0;
        }
        
        start() {
            this.gameRunning = true;
            this.gamePaused = false;
            this.gameManager.hideOverlay();
            this.gameLoop();
        }
        
        pause() {
            if (!this.gameRunning) return;
            this.gamePaused = !this.gamePaused;
            if (this.gamePaused) {
                this.gameManager.showOverlay('Game Paused', 'Press Start to continue');
            } else {
                this.gameManager.hideOverlay();
                this.gameLoop();
            }
        }
        
        stop() {
            this.gameRunning = false;
            this.gamePaused = false;
        }
        
        handleKeyPress(e) {
            if (!this.gameRunning || this.gamePaused) return;
            
            const key = e.key.toLowerCase();
            
            // Prevent repeated key events
            if (e.repeat) return;
            
            if ((key === 'a' || key === 'arrowleft') && this.canMove(-1, 0)) {
                this.piece.x--;
            }
            if ((key === 'd' || key === 'arrowright') && this.canMove(1, 0)) {
                this.piece.x++;
            }
            if ((key === 's' || key === 'arrowdown') && this.canMove(0, 1)) {
                this.piece.y++;
                this.dropTime = 0; // Reset drop timer
            }
            if (key === 'w' || key === 'arrowup') {
                this.rotatePiece();
            }
        }
        
        canMove(deltaX, deltaY) {
            const newX = this.piece.x + deltaX;
            const newY = this.piece.y + deltaY;
            
            // Check boundaries
            if (newX < 0 || newX >= this.cols - 1 || newY >= this.rows - 1) {
                return false;
            }
            
            // Check collision with placed pieces
            if (newY >= 0) {
                if (this.grid[newY][newX] !== 0 || 
                    this.grid[newY][newX + 1] !== 0 || 
                    (newY + 1 < this.rows && (this.grid[newY + 1][newX] !== 0 || this.grid[newY + 1][newX + 1] !== 0))) {
                    return false;
                }
            }
            
            return true;
        }
        
        rotatePiece() {
            // Simple rotation for 2x2 piece (no change needed)
            // Could add more complex rotation logic for other pieces
        }
        
        handleMobileInput(direction) {
            if (!this.gameRunning || this.gamePaused) return;
            
            switch(direction) {
                case 'left':
                    this.movePiece(-1, 0);
                    break;
                case 'right':
                    this.movePiece(1, 0);
                    break;
                case 'down':
                    this.movePiece(0, 1);
                    break;
                case 'up':
                    this.rotatePiece();
                    break;
            }
        }
        
        update(deltaTime) {
            if (!this.gameRunning || this.gamePaused) return;
            
            this.dropTime += deltaTime;
            if (this.dropTime > this.dropInterval) {
                if (this.canMove(0, 1)) {
                    this.piece.y++;
                } else {
                    // Place piece
                    this.placePiece();
                    
                    // Check for completed lines
                    this.checkLines();
                    
                    // Create new piece
                    this.createNewPiece();
                    
                    // Check game over
                    if (!this.canMove(0, 0)) {
                        this.gameOver();
                    }
                }
                this.dropTime = 0;
            }
        }
        
        placePiece() {
            // Safely place the piece on the grid
            if (this.piece.y >= 0 && this.piece.y < this.rows - 1) {
                this.grid[this.piece.y][this.piece.x] = 1;
                if (this.piece.x + 1 < this.cols) {
                    this.grid[this.piece.y][this.piece.x + 1] = 1;
                }
                if (this.piece.y + 1 < this.rows) {
                    this.grid[this.piece.y + 1][this.piece.x] = 1;
                    if (this.piece.x + 1 < this.cols) {
                        this.grid[this.piece.y + 1][this.piece.x + 1] = 1;
                    }
                }
            }
        }
        
        createNewPiece() {
            this.piece.x = 4;
            this.piece.y = 0;
            
            // Add some variety to piece colors
            const colors = ['cyan', 'yellow', 'purple', 'orange', 'blue', 'green', 'red'];
            this.piece.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        checkLines() {
            let linesCleared = 0;
            
            for (let row = this.rows - 1; row >= 0; row--) {
                if (this.grid[row].every(cell => cell !== 0 && cell !== false)) {
                    this.grid.splice(row, 1);
                    this.grid.unshift(Array(this.cols).fill(0));
                    this.lines++;
                    linesCleared++;
                    row++; // Check the same row again since we removed one
                }
            }
            
            if (linesCleared > 0) {
                // Scoring system
                const points = [0, 40, 100, 300, 1200];
                this.score += points[linesCleared] * (this.level + 1);
                this.gameManager.updateScoreDisplay();
                
                const highScore = this.getHighScore();
                if (this.score > highScore) {
                    localStorage.setItem('tetrisHighScore', this.score);
                }
                
                // Increase level every 10 lines
                if (this.lines % 10 === 0) {
                    this.level++;
                    this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
                }
            }
        }
        
        draw() {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw placed pieces
            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    if (this.grid[row][col]) {
                        this.ctx.fillStyle = this.grid[row][col];
                        this.ctx.fillRect(col * this.blockSize, row * this.blockSize, this.blockSize - 1, this.blockSize - 1);
                        
                        // Add border
                        this.ctx.strokeStyle = 'white';
                        this.ctx.lineWidth = 1;
                        this.ctx.strokeRect(col * this.blockSize, row * this.blockSize, this.blockSize - 1, this.blockSize - 1);
                    }
                }
            }
            
            // Draw current piece
            if (this.currentPiece) {
                this.ctx.fillStyle = this.currentPiece.color;
                for (let row = 0; row < this.currentPiece.shape.length; row++) {
                    for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                        if (this.currentPiece.shape[row][col]) {
                            const x = (this.currentPiece.x + col) * this.blockSize;
                            const y = (this.currentPiece.y + row) * this.blockSize;
                            this.ctx.fillRect(x, y, this.blockSize - 1, this.blockSize - 1);
                            
                            // Add border
                            this.ctx.strokeStyle = 'white';
                            this.ctx.lineWidth = 1;
                            this.ctx.strokeRect(x, y, this.blockSize - 1, this.blockSize - 1);
                        }
                    }
                }
            }
            
            // Draw grid lines
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.lineWidth = 1;
            for (let i = 0; i <= this.cols; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(i * this.blockSize, 0);
                this.ctx.lineTo(i * this.blockSize, this.rows * this.blockSize);
                this.ctx.stroke();
            }
            for (let i = 0; i <= this.rows; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, i * this.blockSize);
                this.ctx.lineTo(this.cols * this.blockSize, i * this.blockSize);
                this.ctx.stroke();
            }
        }
        
        gameOver() {
            this.gameRunning = false;
            this.gameManager.showOverlay('Game Over!', `Final Score: ${this.score}\\nLevel: ${this.level}\\nLines: ${this.lines}`);
        }
        
        gameLoop() {
            if (!this.gameRunning || this.gamePaused) return;
            
            this.update(16); // Approximate 60fps
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    // Initialize GameManager when DOM is loaded
    let gameManager;
    setTimeout(() => {
        if (document.getElementById('snakeCanvas')) {
            gameManager = new GameManager();
        }
    }, 100);
});