```js
gsap.registerPlugin(Flip);

document.addEventListener("DOMContentLoaded", function () {
  // Select all CMS items within your .work_wrapper container
  const items = document.querySelectorAll(".work_wrapper .work_item");

  // Determine how many digits the highest number needs
  const digits = Math.max(String(items.length).length, 2); // always at least 2 digits

  // Loop over each item and assign a descending number
  items.forEach(function (item, index) {
    const numberEl = item.querySelector(".project-number");
    if (numberEl) {
      // Calculate the reverse index: total items minus the current index
      const reverseIndex = items.length - index;
      // Convert to string and pad with zeros up to the required number of digits
      numberEl.textContent = String(reverseIndex).padStart(digits, "0");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lenis for smooth vertical scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  // Start the Lenis update loop
  function raf(time) {
    lenis.raf(time);
    updateStagger();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const container = document.querySelector(".work_wrapper");
  const items = document.querySelectorAll(".work_wrapper .work_item");

  // Assume there are 6 effective columns in your grid.
  const numColumns = 6;

  // Initialize each item's extra vertical offset
  items.forEach((item) => (item.extraOffset = 0));

  // Store current scroll velocity (positive when scrolling down, negative when scrolling up)
  let currentVelocity = 0;
  lenis.on("scroll", ({ velocity }) => {
    currentVelocity = velocity;
  });

  function updateStagger() {
    // Damping controls how quickly the offset eases to the target.
    const damping = 0.1;
    // Effect factor controls overall intensity. Lower to reduce the effect.
    const effectFactor = 5;

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;

    items.forEach((item) => {
      // Determine the item's horizontal position relative to the container.
      const itemRect = item.getBoundingClientRect();
      const relativeX = itemRect.left - containerRect.left;
      // Compute effective column index: 0 (leftmost) to numColumns - 1 (rightmost)
      let colIndex = Math.floor((relativeX / containerWidth) * numColumns);
      colIndex = Math.max(0, Math.min(colIndex, numColumns - 1));

      // Always use the same multiplier: left columns get full effect, right columns less.
      const multiplier = 1 - colIndex / (numColumns - 1);

      // Compute the target extra vertical offset.
      // A negative sign ensures that when scrolling down (positive velocity),
      // the left columns (multiplier near 1) get a larger negative offset.
      const targetOffset = -currentVelocity * effectFactor * multiplier;

      // Ease the extra offset toward the target.
      item.extraOffset += (targetOffset - item.extraOffset) * damping;

      // Apply vertical translation only.
      item.style.transform = `translateY(${item.extraOffset}px)`;
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navHeadings = document.querySelectorAll(".nav_wrapper .h1");

  // 1) Scramble each nav heading in a slight stagger
  navHeadings.forEach((heading, i) => {
    // Each heading starts scrambling 0.1s after the previous
    setTimeout(() => {
      scrambleText(heading, 1); // scramble for 1 second
    }, i * 100);
  });

  // 2) Staggered entrance for .project_container (images) after a short delay
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
});

/**
 * Scrambles the text of an element over a given duration (in seconds).
 * Replaces characters with random ones until time is up, then sets the final text.
 */
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
```
