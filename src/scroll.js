import Lenis from "lenis";
import gsap from "./gsap";

class _Scroll extends Lenis {
  constructor() {
    super({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    console.log("Scroll");
    // this.lenis = new Lenis();

    gsap.ticker.add(this.update.bind(this));
  }

  update(time) {
    this.raf(time * 1000);
  }

  updateStagger() {}
}

export const Scroll = new _Scroll();

/*
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
*/
