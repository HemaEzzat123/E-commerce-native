const sliderContainer = document.querySelector(".admin-slider");

const images = [
  "../../IMAGES/Slider-5.jpg",
  "../../IMAGES/Slider-5-1.jpg",
  "../../IMAGES/Slider-6.jpg",
  "../../IMAGES/Slider-7.jpg",
  "../../IMAGES/Slider-7-1.jpg",
  "../../IMAGES/Slider-8.jpg",
];

let currentIndex = 0;

function updateImage() {
  // Update the image source
  sliderContainer.innerHTML = `<img src="${images[currentIndex]}" alt="slider">`;

  // Move to the next image index
  currentIndex = (currentIndex + 1) % images.length;
}

// Initialize the slider with the first image
updateImage();

// Change the image every 3 seconds
setInterval(updateImage, 3000);
