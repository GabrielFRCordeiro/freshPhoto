window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const speedFactor1 = 0.005;
    const speedFactor2 = 0.01;

    const backgroundPosition = `
    0% ${5 + scrollPosition * speedFactor2}%, 
    0% ${80 + scrollPosition * speedFactor1}%, 
    26% ${-13 + scrollPosition * speedFactor2}%, 
    42% ${42 + scrollPosition * speedFactor2}%, 
    69% ${113 + scrollPosition * 0}%, 
    69% ${-5 + scrollPosition * speedFactor1}%, 
    78% ${65 + scrollPosition * speedFactor1}%, 
    96% ${93 + scrollPosition * speedFactor1}%,
    112.5% ${30 + scrollPosition * speedFactor2}%;
    `;

    const fundoMelancia = document.querySelector('#parallax');
    fundoMelancia.style = `background-position: ${backgroundPosition}`;
});
