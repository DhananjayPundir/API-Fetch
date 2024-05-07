
const accessKey = "Qg9gQsQxrmejnAa_8xm1ggi6IciYpKKXjgiB3DaH5mo";
const searchForm = document.querySelector('form');
const imageContainer = document.querySelector('.image-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadmoreBtn');
let page = 1;

const fetchImages = async (query, pageNo) => {
    if (pageNo === 1) {
        imageContainer.innerHTML = '';
    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    data.results.forEach(photo => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('imageDiv');
        imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}">`;

        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`;
        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imageContainer.appendChild(imageElement);
    });
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imageContainer.innerHTML = '<h2>Please enter a search query.</h2>';
    }
});

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
});
