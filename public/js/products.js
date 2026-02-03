// get CSS Variables
const styles = getComputedStyle(document.documentElement);
const sliderAnimationSpeed = 0.5;

// header
const header = document.getElementById("header");
let headerRect = header.getBoundingClientRect();

// Direction Buttons
const leftButton = document.getElementById("prev");
const rightButton = document.getElementById("next");

let leftButtonClicked = false;
let rightButtonClicked = false;

let leftButtonRect = leftButton.getBoundingClientRect();
let leftButtonCenter = (leftButtonRect.left + leftButtonRect.right) / 2;

let rightButtonRect = rightButton.getBoundingClientRect();
let rightButtonCenter = (rightButton.left + rightButton.right) / 2;

let buttonWidth = rightButtonRect.width;

let imageAndInfoDiv = document.querySelectorAll(".image-and-info"); // helps to get the left center and right bottle colors
// Buttons End

// Background Color
const backgroundPopup = document.getElementById("background-color-popup");

let backgroundColorPopupRect = backgroundPopup.getBoundingClientRect();
let BackgroundColorRectCenter =
  (backgroundColorPopupRect.left + backgroundColorPopupRect.right) / 2;
let backgroundPopupPositionX = rightButton.left;
let backgroundPopupPositionY = rightButton.top + window.pageYOffset;

let backgroundColorList = [];

let currentBackgroundColor = null;
let gsapSetBackgroundColorStyle;

let prevBackgroundColor = null;
let gsapSetprevBackgroundColorStyle;

let nextBackgroundColor = null;
let gsapSetnextBackgroundColorStyle;

// Location of where the circle will popup
let popupCirclePosX = null;
let popupCirclePosY = null;

// Background Color Ends

// ImageDivs and section
let imageContainersSection = document.getElementById(
  "bottle-images-and-info-container"
);
let imageDivs = document.querySelectorAll(".image-and-info");
const imageDivsCount = imageDivs.length;

// appending the first two divs to the end
let clonefirstImage = imageDivs[0].cloneNode(true);
imageContainersSection.append(clonefirstImage);
let clonelastImage = imageDivs[1].cloneNode(true);
imageContainersSection.append(clonelastImage);

function setbackgroundColorList() {
  // background color popup for left (index 0) right(index 2) and current (index 1)
  backgroundColorList = [];
  let getMiddleBottlePositon = Math.ceil((imageDivsCount + 2) / 2);

  imageAndInfoDiv = document.querySelectorAll(".image-and-info");
  for (
    let color = getMiddleBottlePositon - 2;
    color < getMiddleBottlePositon + 1;
    color++
  ) {
    backgroundColorList.push(imageAndInfoDiv[color].getAttribute("data-color"));
  }
}

// GSAP CSS Set Styles

// Is the popup coming from prev button or next button?
function setBackgroundPopupPosition() {
  gsap.set("#background-color-popup", {
    transform: `translate(${popupCirclePosX}px, ${popupCirclePosY}px)`,
  });
}

// Sets the background color Of the current bottle to the popup
function gsapSetBackgroundColor() {
  gsapSetBackgroundColorStyle = styles.getPropertyValue(
    `--${currentBackgroundColor}`
  );

  // background color for the popup when it increases size
  gsap.set("#background-color-popup", {
    backgroundColor: gsapSetBackgroundColorStyle,
  });

  // Update the accent color for the page
  gsap.to("html", {
    "--accent-color": `var(--${currentBackgroundColor})`,
    duration: 0.5,
    ease: Power2.easeOut
  });
}

function gsapSetNextAndPrevBackgroundColor() {
  // Refer to CSS file for better understanding
  prevBackgroundColor = backgroundColorList[0];
  nextBackgroundColor = backgroundColorList[2];

  // Sets the previous bottle background color on the prev button when hovered
  gsap.set("html", {
    "--opacity": 0,
  });

  gsap.to("html", {
    "--prevBackgroundColor": `var(--${prevBackgroundColor})`,
    "--opacity": 1,

    duration: 0,
    delay: sliderAnimationSpeed + 0.25,
  });

  // Sets the next bottle background color on the next button when hovered
  gsap.to("html", {
    "--nextBackgroundColor": `var(--${nextBackgroundColor})`,
    "--opacity": 1,

    duration: 0,
    delay: sliderAnimationSpeed + 0.25,
  });
}

// GSAP CSS Set End

// GSAP Animations
let tl = gsap.timeline();

function gsapToAnimation() {
  if (imageDivsCount % 2 === 1) {
    gsap.to(".image-and-info", {
      translate: `0`,
      duration: sliderAnimationSpeed,
      ease: Power3.easeOut,
    });
  } else {
    gsap.to(".image-and-info", {
      translate: `50%`,
      duration: sliderAnimationSpeed,
      ease: Power3.easeOut,
    });
  }
}

function backgroundColorPosition() {
  setBackgroundPopupPosition();
  gsapSetBackgroundColor();

  tl.to("#background-color-popup", {
    scale: 50,
    duration: sliderAnimationSpeed,
    ease: Power3.easeOut,
  });

  tl.set("#background-color-popup", {
    scale: 1,
    opacity: 1,
    duration: 0,
  });
}

// GSAP Animations End


function nextItem() {
  imageDivs = document.querySelectorAll(".image-and-info");
  let cloneCurrentImage = imageDivs[2].cloneNode(true);
  imageContainersSection.append(cloneCurrentImage);
  gsapToAnimation();
  imageDivs[0].remove();
}

function prevItem() {
  imageDivs = document.querySelectorAll(".image-and-info");

  imageDivs[imageDivsCount + 1].remove(); // Remove the very last node in the new array
  let cloneCurrentImage = imageDivs[imageDivsCount - 1].cloneNode(true);
  imageContainersSection.prepend(cloneCurrentImage);
  gsapToAnimation();
}

// Event Listeners

let canClick = true;
function reenableClick(seconds) {
  // seconds as in 1s not 1000ms
  setTimeout(()=> {
    canClick = true;
  }, (sliderAnimationSpeed + 0.5) * 1000);
}


rightButton.addEventListener("click", () => {
  if (!canClick) return;
  canClick = false;

  rightButtonRect = rightButton.getBoundingClientRect();
  buttonWidth = rightButtonRect.width;

  let rightButtonCircleExpanPositionX =
    (rightButtonRect.left + rightButtonRect.right) / 2;
  popupCirclePosX = rightButtonCircleExpanPositionX - buttonWidth / 2;

  let rightButtonCircleExpanPositionY =
    (rightButtonRect.top + rightButtonRect.bottom) / 2;
  popupCirclePosY =
    rightButtonCircleExpanPositionY - buttonWidth / 2 + window.pageYOffset;

  if (imageDivsCount % 2 === 1) {
    gsap.set(".image-and-info", {
      translate: `100%`,
    });
    nextItem();
  } else {
    gsap.set(".image-and-info", {
      translate: `150%`,
    });
    nextItem();
  }


  currentBackgroundColor = backgroundColorList[2];
  backgroundColorPosition();
  setbackgroundColorList();
  gsapSetNextAndPrevBackgroundColor();

  reenableClick(sliderAnimationSpeed);
});

leftButton.addEventListener("click", () => {
  if (!canClick) return;
  canClick = false;

  leftButtonRect = leftButton.getBoundingClientRect();

  buttonWidth = leftButtonRect.width;
  let leftButtonCircleExpanPositionX =
    (leftButtonRect.left + leftButtonRect.right) / 2;
  popupCirclePosX = leftButtonCircleExpanPositionX - buttonWidth / 2;

  let leftButtonCircleExpanPositionY =
    (leftButtonRect.top + leftButtonRect.bottom) / 2;
  popupCirclePosY =
    leftButtonCircleExpanPositionY - buttonWidth / 2 + window.pageYOffset;

  if (imageDivsCount % 2 === 1) {
    gsap.set(".image-and-info", {
      translate: `-100%`,
    });
    prevItem();
  } else {
    gsap.set(".image-and-info", {
      translate: `-50%`,
    });
    prevItem();
  }

  currentBackgroundColor = backgroundColorList[0];
  backgroundColorPosition();
  setbackgroundColorList();
  gsapSetNextAndPrevBackgroundColor();

  reenableClick(sliderAnimationSpeed);
});

window.addEventListener("load", () => {
  setInitialPositions();
  setbackgroundColorList();
  gsapSetBackgroundColor();

  // Set initial accent color
  gsap.set("html", {
    "--accent-color": `var(--${backgroundColorList[1]})`,
  });

  gsapSetNextAndPrevBackgroundColor();
});

window.addEventListener("resize", (e) => {
  headerRect = header.getBoundingClientRect();
});

// Event Listeners End


function setInitialPositions() {
  if (imageDivsCount % 2 === 1) {
    gsap.set(".image-and-info", {
      translate: `0%`,
    });
  } else {
    gsap.set(".image-and-info", {
      translate: `50%`,
    });
  }
}

// OGM Navigation Overlay Functionality
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger input');
  const navOverlay = document.getElementById('nav-overlay');
  const navClose = document.querySelector('.nav-close');
  const navLinks = document.querySelectorAll('.nav-link');

  // Only proceed if all required elements exist
  if (!hamburger || !navOverlay || !navClose) {
    console.log('OGM Navigation elements not found, skipping navigation init');
    return;
  }

  // Function to open navigation overlay
  function openNavOverlay() {
    navOverlay.classList.add('active');
    hamburger.checked = true;
  }

  // Function to close navigation overlay
  function closeNavOverlay() {
    navOverlay.classList.remove('active');
    hamburger.checked = false;
  }

  // Toggle navigation overlay when hamburger is clicked
  hamburger.addEventListener('change', () => {
    if (hamburger.checked) {
      openNavOverlay();
    } else {
      closeNavOverlay();
    }
  });

  // Close navigation when close button is clicked
  navClose.addEventListener('click', closeNavOverlay);

  // Close navigation when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeNavOverlay();
    });
  });

  // Close navigation when clicking outside the nav content
  navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) {
      closeNavOverlay();
    }
  });

  // Close navigation on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
      closeNavOverlay();
    }
  });
});