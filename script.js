// Locomotive JS
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// Custom cursor animation
function cursorInit() {
  let listContainer = document.querySelectorAll("#product-list .list");
  let cursor = document.querySelector("#cursor");

  listContainer.forEach((list) => {
    list.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    list.addEventListener("mousemove", (event) => {
      gsap.to(cursor, {
        left: event.x,
        top: event.y,
      });
    });
    list.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
} // end of cursor animation

// Play button animation begin
function videoPlayButtonAnimationInit() {
  let playBtn = document.querySelector("#play");
  let videoContainer = document.querySelector("#video-container");

  videoContainer.addEventListener("mouseenter", () => {
    //   playBtn.style.opacity = 1;
    //   playBtn.style.scale = 1;
    gsap.to(playBtn, {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 1,
      duration: 0.5,
    });
  });

  videoContainer.addEventListener("mousemove", (event) => {
    //   playBtn.style.top = event.y + "px";
    //   playBtn.style.left = event.x + "px";
    gsap.to(playBtn, {
      left: event.x,
      top: event.y,
      duration: 0.5,
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    //   playBtn.style.opacity = 0;
    //   playBtn.style.scale = 0;
    gsap.to(playBtn, {
      transform: "translate(-50%, -50%) scale(0)",
      opacity: 0,
      duration: 0.5,
    });
  });
} // end of Play button animation

// Landing page text animation
function textAnimation() {
  let tl = gsap.timeline();
  let first = document.querySelector("#first");
  let second = document.querySelector("#second");
  tl.from(first, {
    y: 50,
    opacity: 0,
    duration: 0.4,
  });
  tl.from(second, {
    y: 50,
    opacity: 0,
    duration: 0.8,
  });
  tl.from("#video-container", {
    scale: 0.96,
    opacity: 0,
    duration: 0.4,
  });
} // end of landing text animation

videoPlayButtonAnimationInit();
textAnimation();
cursorInit();
