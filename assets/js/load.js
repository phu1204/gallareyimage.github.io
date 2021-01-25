class galleryImages {
  constructor() {
    this.API_KEY = "563492ad6f917000010000013ed01c22a5d443e196ab03edef45c9a3";
    this.galleryDiv = document.querySelector(".gallery");
    this.searchForm = document.querySelector(".header form");
    this.loadMore = document.querySelector(".loadmore");
    this.logo = document.querySelector(".header .header-logo");
    this.indexPage = 1;
    this.searchValueGlobal = "";
    this.eventHandle();
  }

  eventHandle() {
    document.addEventListener("DOMContentLoaded", () => {
      this.indexPage = 1;
      this.getImg(this.indexPage);
    });
    this.loadMore.addEventListener("click", (e) => {
      console.log("apsdpasp");
      this.loadMoreImage(e);
    });
    this.searchForm.addEventListener("submit", (e) => {
      this.indexPage = 1;
      this.searchedImages(e);
    });
    
    this.logo.addEventListener("click", () => {
      this.indexPage = 1;
      this.galleryDiv.innerHTML = "";
      this.getImg(this.indexPage);
    });
  }

  async getImg(index) {
    this.loadMore.setAttribute("data-img", "curated");
    const baseURL = `https://api.pexels.com/v1/curated?&page=${index}&per_page=15`;
    const data = await this.fetchImage(baseURL);
    this.generateHTML(data.photos);
  }

  async fetchImage(baseURL) {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.API_KEY,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
  async searchedImages(e) {
    this.loadMore.setAttribute("data-img", "search");
    e.preventDefault();
    this.galleryDiv.innerHTML = "";
    const searchValue = e.target.querySelector("input").value;
    this.searchValueGlobal = searchValue;
    const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=15`;
    const data = await this.fetchImage(baseURL);
    this.generateHTML(data.photos);
    e.target.reset();
  }
  async getMoreSearchedImages(index) {
    const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=15`;
    const data = await this.fetchImage(baseURL);
    this.generateHTML(data.photos);
  }
  generateHTML(photos) {
    photos.forEach((photo) => {
      const item = document.createElement("div");
      item.classList.add("gallery-item");
      item.innerHTML = `<a href="${photo.src.original}" target="_blank"><img src="${photo.src.large}" alt="image" /></a>
      <h3>${photo.photographer}</h3>`;
      this.galleryDiv.appendChild(item);
    });
  }
  loadMoreImage(e) {
    let index = ++this.indexPage;
    const loadMoreData = e.target.getAttribute("data-img");
    if (loadMoreData === "curated") {
      this.getImg(index);
    } else {
      this.getMoreSearchedImages(index);
    }
  }
}
const gallery = new galleryImages();
