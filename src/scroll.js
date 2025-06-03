import Lenis from "lenis";
import gsap from "./gsap";

class _Scroll extends Lenis {
  #update = null;
  constructor() {
    super({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    gsap.ticker.add(this.update.bind(this));

    this.init();
  }

  init() {
    const container = document.querySelector(".work_wrapper");
    const items = document.querySelectorAll(".work_wrapper .work_item");
    const numColumns = 6;

    items.forEach((item) => (item.extraOffset = 0));

    let currentVelocity = 0;
    this.on("scroll", ({ velocity }) => {
      currentVelocity = velocity;
    });

    function updateStagger() {
      const damping = 0.1;
      const effectFactor = 5;
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const relativeX = itemRect.left - containerRect.left;

        let colIndex = Math.floor((relativeX / containerWidth) * numColumns);
        colIndex = Math.max(0, Math.min(colIndex, numColumns - 1));

        const multiplier = 1 - colIndex / (numColumns - 1);
        const targetOffset = -currentVelocity * effectFactor * multiplier;

        item.extraOffset += (targetOffset - item.extraOffset) * damping;
        item.style.transform = `translateY(${item.extraOffset}px)`;
      });
    }

    this.#update = updateStagger;
  }

  update(time) {
    this.raf(time * 1000);
    if (this.#update) this.#update();
  }

  updateStagger() {}
}

export const Scroll = new _Scroll();
