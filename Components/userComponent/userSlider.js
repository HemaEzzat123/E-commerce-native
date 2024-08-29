document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".user-slider");

  const images = [
    "../../IMAGES/Slider-5.jpg",
    "../../IMAGES/Slider-5-1.jpg",
    "../../IMAGES/Slider-6.jpg",
    "../../IMAGES/Slider-7.jpg",
    "../../IMAGES/Slider-7-1.jpg",
    "../../IMAGES/Slider-8.jpg",
    "../../IMAGES/Slider-5-1.jpg",
    "../../IMAGES/Slider-6.jpg",
    "../../IMAGES/Slider-7.jpg",
    "../../IMAGES/Slider-7-1.jpg",
    "../../IMAGES/Slider-8.jpg",
    "../../IMAGES/Slider-5-1.jpg",
    "../../IMAGES/Slider-6.jpg",
    "../../IMAGES/Slider-7.jpg",
    "../../IMAGES/Slider-7-1.jpg",
    "../../IMAGES/Slider-8.jpg",
    "../../IMAGES/Slider-5-1.jpg",
    "../../IMAGES/Slider-6.jpg",
    "../../IMAGES/Slider-7.jpg",
    "../../IMAGES/Slider-7-1.jpg",
    "../../IMAGES/Slider-8.jpg",
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

  const sliderContainer2 = document.querySelector(".user-slider2");

  const images2 = [
    "../../IMAGES/Slider-2.jpg",
    "../../IMAGES/Slider-1.jpg",
    "../../IMAGES/Slider-4.jpg",
    "../../IMAGES/Slider-3.jpg",
    "../../IMAGES/Slider-2.jpg",
    "../../IMAGES/Slider-1.jpg",
    "../../IMAGES/Slider-4.jpg",
    "../../IMAGES/Slider-3.jpg",
    "../../IMAGES/Slider-2.jpg",
    "../../IMAGES/Slider-1.jpg",
    "../../IMAGES/Slider-4.jpg",
    "../../IMAGES/Slider-3.jpg",
    "../../IMAGES/Slider-2.jpg",
    "../../IMAGES/Slider-1.jpg",
    "../../IMAGES/Slider-4.jpg",
    "../../IMAGES/Slider-3.jpg",
  ];

  function updateImage2() {
    // Update the image source
    sliderContainer2.innerHTML = `<img src="${images2[currentIndex]}" alt="slider">`;

    // Move to the next image index
    currentIndex = (currentIndex + 1) % images2.length;
  }

  // Initialize the slider with the first image
  updateImage2();

  // Change the image every 3 seconds
  setInterval(updateImage2, 3000);


  window.onscroll = function () {
      console.log(window.scrollY);
      
    }

  const sale = document.querySelector(".sale50");
  function checkSaleVisibility() {
    const salePosition = sale.getBoundingClientRect().top; 
    const windowHeight = window.innerHeight; 

    if (scrollY > 5200) {
      sale.style.display = "block";
      sale.style.animation = "popUp 0.5s ease-in-out";
    } else {
      sale.style.display = "none";
      sale.style.animation = "none";
    }
  }
  window.addEventListener("scroll", checkSaleVisibility);
  checkSaleVisibility();

  const top = document.querySelector(".toTop");
  const down = document.querySelector(".toDown");

  top.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  down.addEventListener("click", () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });

  window.onscroll = function () {
    if (window.scrollY > 1000) {
      top.style.display = "block";
      down.style.display = "none";
    } else {
      top.style.display = "none";
      down.style.display = "block";
    }
  };
});
