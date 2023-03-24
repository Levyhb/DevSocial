const images = document.getElementsByTagName("img");
for (let i = 0; i < images.length; i++) {
  images[i].setAttribute("crossOrigin", "false");
}