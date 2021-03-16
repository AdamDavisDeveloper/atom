//Global Variables
const auth = "563492ad6f9170000100000111e5c5985efe4098a02259ff2021fde2";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentPage = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

//Functions
function updateInput(e) {
  searchValue = e.target.value;
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a href="${photo.src.original}">Download</a>
    </div>
    <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink =
    "https://api.pexels.com/v1/search?query=abstract+query&per_page=16";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
  currentSearch = query;
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=16`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=16&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

//Calls
curatedPhotos();
