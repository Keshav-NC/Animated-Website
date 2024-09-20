function FullNav() {
  let menuBtn = document.querySelector("#bar");
  let fullNav = document.querySelector("#full-nav");
  let open = document.querySelector("nav .right .menu-cart .toggles .open");
  let close = document.querySelector("nav .right .menu-cart .toggles .close");
  let logo1 = document.querySelector("nav svg:first-child");
  let logo2 = document.querySelector("nav svg:last-child");

  gsap.from("#full-nav .links a", {
    transform: "translateY(200px)",
    stagger: 0.1,
  });

  menuBtn.addEventListener("click", () => {
    fullNav.style.top = 0;
    open.style.display = "none";
    close.style.display = "flex";
    logo1.style.color = "#fff";
    logo1.style.zIndex = 9;
    logo2.style.color = "#fff";
    logo2.style.zIndex = 9;
  });

  close.addEventListener("click", () => {
    fullNav.style.top = "-100%";
    open.style.display = "flex";

    logo1.style.color = "#000";
    logo2.style.color = "#000";
    close.style.display = "none";
  });
}

// Locomotive Scrollriger JS
function LocomotiveScrollTriger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

// ScrollTriger nav
function NavScrollAnimation() {
  gsap.to("nav svg", {
    transform: "translateY(-130%)",
    scrollTrigger: {
      trigger: "#landing-page",
      scroller: "#main",
      start: "top 0",
      end: "top -75px",
      scrub: true,
      ease: "power4.out",
    },
  });

  gsap.to("nav .right a", {
    transform: "translateY(-130%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#landing-page",
      scroller: "#main",
      start: "top 0",
      end: "top -75px",
      scrub: true,
      ease: "power4.out",
    },
  });
} // end of nav bar animation

// Custom cursor animation
function CursorInit() {
  let listContainer = document.querySelectorAll("#product-list .list");
  let cursor = document.querySelector("#cursor");
  let videoContainer = document.querySelector("#video-container");
  let video = document.querySelector("video");

  videoContainer.addEventListener("click", () => {
    video.muted = false;
    video.controls = true;
    cursor.style.display = "none";
  });

  videoContainer.addEventListener("mouseenter", () => {
    cursor.style.height = "7rem";
    cursor.style.width = "7rem";
    cursor.style.backgroundColor = "#000";
    cursor.style.zIndex = 1;
    cursor.innerHTML = "PLAY";
    gsap.to(cursor, {
      transform: "translate(-50%, -50%) scale(1)",
    });
  });

  videoContainer.addEventListener("mousemove", (event) => {
    gsap.to(cursor, {
      left: event.x,
      top: event.y,
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    cursor.style.height = "15rem";
    cursor.style.width = "15rem";
    cursor.style.zIndex = 0;
    cursor.innerHTML = "";
    cursor.style.backgroundColor = "rgb(253, 239, 207)";
    video.controls = false;
    cursor.style.display = "flex";
    gsap.to(cursor, {
      transform: "translate(-50%, -50%) scale(0)",
    });
  });

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
function VideoPlayButtonAnimationInit() {
  let playBtn = document.querySelector("#play");
  let videoContainer = document.querySelector("video");

  videoContainer.addEventListener("mouseenter", () => {
    //   playBtn.style.opacity = 1;
    //   playBtn.style.scale = 1;
    gsap.to(playBtn, {
      transform: "translate(-50%, -50%) scale(1)",
    });
  });

  videoContainer.addEventListener("mousemove", (event) => {
    //   playBtn.style.top = event.y + "px";
    //   playBtn.style.left = event.x + "px";
    gsap.to(playBtn, {
      left: event.x,
      top: event.y,
    });
  });

  videoContainer.addEventListener("mouseleave", () => {
    //   playBtn.style.opacity = 0;
    //   playBtn.style.scale = 0;
    gsap.to(playBtn, {
      transform: "translate(-50%, -50%) scale(0)",
    });
  });
} // end of Play button animation

// Landing page text animation
function TextAnimation() {
  let tl = gsap.timeline();
  let first = document.querySelector("#first");
  let second = document.querySelector("#second");

  tl.from("nav .left svg:first-child", {
    transform: "translateY(-100px)",
  });

  tl.from("nav .right a", {
    transform: "translateY(-100px)",
    stagger: 0.1,
  });

  tl.from("nav .toggles", {
    transform: "translateY(-100px)",
  });

  tl.from("nav .menu-cart i", {
    transform: "translateY(-100px)",
  });

  tl.from(first, {
    y: 50,
    opacity: 0,
  });
  tl.from(second, {
    y: 50,
    opacity: 0,
  });
  tl.from("#video-container", {
    scale: 0.96,
    opacity: 0,
    duration: 0.4,
  });
} // end of landing text animation

LocomotiveScrollTriger();
FullNav();
NavScrollAnimation();
VideoPlayButtonAnimationInit();
TextAnimation();
CursorInit();
