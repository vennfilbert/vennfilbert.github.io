document.addEventListener('DOMContentLoaded', () => {

    // 1. Responsive Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // 2. Smooth Scrolling Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // 3. Hero Section Slider Logic
    const slides = document.querySelector('.slides');
    if (slides) {
        const slide = document.querySelectorAll('.slide');
        const heroPrevBtn = document.querySelector('.slider .prev');
        const heroNextBtn = document.querySelector('.slider .next');
        let currentIndex = 0;
        const slideCount = slide.length;
        let autoSlideInterval;

        const goToSlide = (index) => {
            slides.style.transform = `translateX(-${index * 100}%)`;
        };
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slideCount;
            goToSlide(currentIndex);
        };
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            goToSlide(currentIndex);
        };
        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        };
        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        heroNextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        heroPrevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        goToSlide(0);
        startAutoSlide();
    }

    // 4. Reusable Modal Image Gallery Logic
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        const modalImg = document.getElementById('modal-image');
        const closeBtn = document.querySelector('.close-btn');
        const galleryPrevBtn = document.querySelector('.modal .prev-btn');
        const galleryNextBtn = document.querySelector('.modal .next-btn');

        const galleries = {
            'safeus': [
                'images/safeus/HomeScreen.png',
                'images/safeus/LoginScreen.png',
                'images/safeus/SignupScreen.png',
                'images/safeus/UploadScreen.png',
                'images/safeus/ArticleScreen.png',
                'images/safeus/StatusScreen.png',
                'images/safeus/ReportDetailScreen.png',
                'images/safeus/ProfileScreen.png'
            ],
            'securelink': [
                'images/securelink/XGBoost.gif'
            ]
        };

        let currentImages = [];
        let currentImageIndex = 0;

        function openModal(galleryKey, startIndex) {
            currentImages = galleries[galleryKey];
            if (!currentImages || currentImages.length === 0) return;

            currentImageIndex = startIndex;
            modalImg.src = currentImages[currentImageIndex];
            modal.style.display = 'flex';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            modalImg.src = currentImages[currentImageIndex];
        }

        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            modalImg.src = currentImages[currentImageIndex];
        }

        document.querySelectorAll('.project-gallery-trigger').forEach(card => {
            card.addEventListener('click', () => {
                const galleryKey = card.getAttribute('data-gallery');
                openModal(galleryKey, 0);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        galleryNextBtn.addEventListener('click', showNextImage);
        galleryPrevBtn.addEventListener('click', showPrevImage);

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (modal.style.display === 'flex') {
                if (event.key === 'ArrowRight') showNextImage();
                else if (event.key === 'ArrowLeft') showPrevImage();
                else if (event.key === 'Escape') closeModal();
            }
        });
    }
});