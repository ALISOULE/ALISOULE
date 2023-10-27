

$(document).ready(function(){
    "use strict"

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.querySelector('.indicators');
    const container = document.querySelector('.carousel');
    const nextBtn = document.querySelector('.sibar_left .bottom_body .controls .btnNext');
    const presBtn = document.querySelector('.sibar_left .bottom_body .controls .btnPres');
    let autoSlideInterval;

    function createIndicators() {
        for (let i = 0; i < items.length; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 320}px)`;
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        nextBtn.addEventListener('click', function(){
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
    }
    
    function Auto_prevSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function Auto_nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }
    
    function prevSlide() {
        presBtn.addEventListener('click', function(){
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            Auto_nextSlide();
        }, 3000); // Change de diapositive toutes les 3 secondes (ajustez selon vos préférences)
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    createIndicators();
    updateCarousel();
    startAutoSlide(); // Démarre le contrôle automatique
    nextSlide();
    prevSlide();

});