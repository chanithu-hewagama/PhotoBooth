document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (!slider || slides.length === 0) return;

    let slideIndex = 0;
    let isTransitioning = false;
    let startX = null;
    let isDragging = false;

    slides.forEach(s => s.classList.remove('active'));
    slides[slideIndex].classList.add('active');
    
    slider.style.transition = 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
    slider.style.transform = 'translateX(0)';

    const goTo = (index) => {
        if (isTransitioning || index === slideIndex) return;
        
        isTransitioning = true;
        slides[slideIndex].classList.remove('active');
        slideIndex = (index + slides.length) % slides.length;
        slides[slideIndex].classList.add('active');
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        setTimeout(() => { isTransitioning = false; }, 600);
    };

    const prevSlide = () => goTo(slideIndex - 1);
    const nextSlide = () => goTo(slideIndex + 1);

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    slider.addEventListener('touchstart', (e) => { 
        startX = e.touches[0].clientX;
        isDragging = true;
    }, false);
    
    slider.addEventListener('touchmove', (e) => {
        if (!startX || !isDragging) return;
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 50) {
            isDragging = false;
            if (dx > 0) prevSlide(); else nextSlide();
            startX = null;
        }
    }, false);
    
    slider.addEventListener('touchend', () => { 
        startX = null;
        isDragging = false;
    }, false);
});