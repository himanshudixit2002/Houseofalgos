document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.point img.feature-image');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Show the first image initially
    showImage(currentIndex);

    // Set up automatic sliding every 3 seconds
    setInterval(nextImage, 3000);
});
