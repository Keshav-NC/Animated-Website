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

  tl.from("nav .menu-cart i", {
    transform: "translateY(-100px)",
    stagger: 0.1,
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
NavScrollAnimation();
VideoPlayButtonAnimationInit();
TextAnimation();
CursorInit();
