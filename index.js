    // Initialization
        window.onload = () => {
            lucide.createIcons();
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
            }, 500);
            initLookbook();
            initCanvas();
        };

        // Navigation Highlight
        window.onscroll = () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            const btt = document.getElementById('backToTop');

            if (window.scrollY > 500) btt.classList.add('visible');
            else btt.classList.remove('visible');

            sections.forEach(sec => {
                const top = window.scrollY;
                const offset = sec.offsetTop - 150;
                const height = sec.offsetHeight;
                const id = sec.getAttribute('id');

                if (top >= offset && top < offset + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                    });
                }
            });
        };

        // Booking Panel Toggle
        function toggleBooking() {
            document.getElementById('bookingPanel').classList.toggle('open');
        }

        function handleBooking(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerHTML = 'Sending Request...';
            setTimeout(() => {
                btn.innerHTML = 'Confirmed!';
                btn.style.borderColor = '#00ff00';
                btn.style.color = '#00ff00';
                setTimeout(() => {
                    toggleBooking();
                    btn.innerHTML = 'Confirm Request';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    e.target.reset();
                }, 2000);
            }, 1500);
        }

        // Transformation Slider
        const slider = document.getElementById('sliderHandle');
        const afterImg = document.getElementById('afterImage');
        const container = document.querySelector('.slider-container');

        let isDragging = false;

        const moveSlider = (x) => {
            const rect = container.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            if (pos < 0) pos = 0;
            if (pos > 100) pos = 100;
            slider.style.left = `${pos}%`;
            afterImg.style.clipPath = `inset(0 0 0 ${pos}%)`;
        };

        slider.onmousedown = () => isDragging = true;
        window.onmouseup = () => isDragging = false;
        window.onmousemove = (e) => { if (isDragging) moveSlider(e.clientX); };
        
        container.ontouchmove = (e) => { moveSlider(e.touches[0].clientX); };

        // Lookbook Data & Logic
        const galleryData = [
            { id: 1, category: 'bridal', img: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=400', title: 'Midnight Royal Bridal' },
            { id: 2, category: 'hair', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400', title: 'Platinum Neon Fade' },
            { id: 3, category: 'party', img: 'https://images.unsplash.com/photo-1522337660859-02fbefce4ff4?auto=format&fit=crop&q=80&w=400', title: 'Cyber Glow Makeup' },
            { id: 4, category: 'bridal', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400', title: 'Traditional Revamp' },
            { id: 5, category: 'hair', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=400', title: 'Electric Curls' },
            { id: 6, category: 'party', img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400', title: 'Sunset Eye Palette' },
        ];

        function initLookbook() {
            const container = document.getElementById('lookbookGallery');
            renderGallery(galleryData);

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.onclick = () => {
                    document.querySelector('.filter-btn.active').classList.remove('active');
                    btn.classList.add('active');
                    const filter = btn.dataset.filter;
                    const filtered = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
                    renderGallery(filtered);
                };
            });
        }

        function renderGallery(data) {
            const container = document.getElementById('lookbookGallery');
            container.innerHTML = data.map(item => `
                <div class="gallery-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <span style="font-size:0.7rem; color:var(--neon-cyan)">${item.category.toUpperCase()}</span>
                        <h4>${item.title}</h4>
                    </div>
                </div>
            `).join('');
        }

        // Style Suggester Logic
        function suggestService() {
            const hair = document.getElementById('hairType').value;
            const occ = document.getElementById('occasion').value;
            const result = document.getElementById('suggestionResult');

            if (!hair || !occ) {
                result.style.display = 'block';
                result.innerHTML = 'Please select both options first!';
                return;
            }

            let suggestion = "";
            if (occ === 'wedding') suggestion = "✨ <b>Royal Bridal Signature</b> + Deep Hair Conditioning Treatment";
            else if (occ === 'party') suggestion = "🔥 <b>Cyber-Glow Makeup</b> + Sleek High Ponytail Design";
            else if (hair === 'damaged') suggestion = "🩹 <b>Olaplex Repair Therapy</b> + Soft Trim Style";
            else suggestion = "💇‍♀️ <b>Precision Signature Cut</b> + Hydra-Flash Skin Boost";

            result.style.display = 'block';
            result.innerHTML = `<p style="margin-bottom:10px">We recommend:</p><h3 class="neon-text">${suggestion}</h3>`;
        }

        // Hero Particle Canvas
        function initCanvas() {
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let particles = [];
            const particleCount = 60;

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2;
                    this.speedX = (Math.random() - 0.5) * 1.5;
                    this.speedY = (Math.random() - 0.5) * 1.5;
                    this.color = Math.random() > 0.5 ? '#00f2ff' : '#9d00ff';
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        // Testimonial Carousel Auto-slide
        let index = 0;
        const carousel = document.getElementById('testimonialCarousel');
        setInterval(() => {
            index++;
            if (index > 2) index = 0;
            carousel.style.transform = `translateX(-${index * 380}px)`;
        }, 5000);
