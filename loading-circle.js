window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    if (!loader) return;

    loader.classList.add('loader-hidden');
    
    loader.addEventListener('transitionend', () => {
        loader.remove();
    }, { once: true });
});

// fixed loader
