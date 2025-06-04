import gsap from "./gsap";

export class Headings {
  items = [...document.querySelectorAll(".nav_wrapper .h1")];

  constructor() {
    this.items.forEach((item, index) => {
      setTimeout(() => {
        scrambleText(item, 1);
      }, index * 100);
    });

    gsap.fromTo(
      ".project_container",
      {
        opacity: 0,
        yPercent: 50, // Start 50% below its final position
      },
      {
        delay: 0.8, // Wait a bit so text scramble begins first
        duration: 1,
        opacity: 1,
        yPercent: 0,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }
}

function scrambleText(el, scrambleDuration = 1) {
  // Characters used during scramble
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const finalText = el.textContent; // We'll eventually restore this
  let startTime = null;

  function updateScramble(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000; // convert ms to seconds

    if (elapsed > scrambleDuration) {
      // Time’s up: set final text and stop
      el.textContent = finalText;
      return;
    }

    // fraction of the animation complete (0 to 1)
    const fraction = elapsed / scrambleDuration;

    // Build a scrambled string
    let scrambled = finalText
      .split("")
      .map((letter) => {
        // If random < fraction, show real letter; otherwise, random char
        return Math.random() < fraction
          ? letter
          : chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    el.textContent = scrambled;
    requestAnimationFrame(updateScramble);
  }

  // Start the animation loop
  requestAnimationFrame(updateScramble);
}
