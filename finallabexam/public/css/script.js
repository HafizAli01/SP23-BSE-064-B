/*Function for Search Bar*/
function toggleSearchBar() {
    document.getElementById('search-section').style.display = "block";
}

function closeSearchBar() {
    document.getElementById('search-section').style.display = "none";
}

/* For Products Image Hover Effect*/
document.querySelectorAll('.hover-image').forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
    });

    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
    });
});