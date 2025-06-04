import gsap from "./gsap";
import { Slider } from "./slider";
import hey from "./hey";

export class State {
  wrappers = [...document.querySelectorAll("[data-item='wrapper']")];
  triggers = [...document.querySelectorAll("[data-item='trigger']")];
  closes = [...document.querySelectorAll("[data-item='close']")];
  images = [...document.querySelectorAll("[data-item='img']")];
  bg = document.querySelector("[data-item='bg']");
  ui = document.querySelector("[data-ui]");
  nav = document.querySelector("[data-nav]");
  current = null;

  #change = hey.on("SLIDE", (index) => {
    gsap.to(this.wrappers[this.current], {
      autoAlpha: 0,
      duration: 0.2,
    });

    this.current = index;

    gsap.to(this.wrappers[index], {
      autoAlpha: 1,
      duration: 0.2,
    });
  });

  constructor() {
    this.closes.forEach((close, index) => {
      close.onclick = this.close.bind(this, index);
    });

    this.triggers.forEach((trigger, index) => {
      trigger.onclick = this.open.bind(this, index);
    });

    this.wrappers.forEach((wrapper, index) => {
      gsap.set(wrapper, {
        autoAlpha: 0,
      });
    });

    gsap.set(this.bg, {
      yPercent: 100,
    });

    gsap.set(this.ui, {
      autoAlpha: 1,
      yPercent: 200,
    });

    gsap.set(this.images, {
      clipPath: "inset(100% 0% 0% 0%)",
    });
  }

  open(index) {
    this.current = index;

    Slider.target = Slider.current = -index;

    gsap.to(this.wrappers[index], {
      autoAlpha: 1,
      duration: 0.8,
    });

    gsap.to(this.bg, {
      yPercent: -100,
      duration: 0.8,
    });

    gsap.to(this.ui, {
      yPercent: 0,
      duration: 0.8,
      delay: 0.1,
    });

    gsap.to(this.images[index], {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      delay: 0.3,
      onComplete: () => {
        gsap.set(this.images, {
          clipPath: "inset(0% 0% 0% 0%)",
        });
      },
    });

    this.nav.classList.add("is-open");
  }

  close() {
    gsap.to(this.bg, {
      yPercent: 100,
      duration: 0.8,
      onComplete: () => {
        gsap.set(this.images, {
          clipPath: "inset(100% 0% 0% 0%)",
        });
      },
    });

    gsap.to(this.wrappers[this.current], {
      autoAlpha: 0,
      duration: 0.8,
      delay: 0.05,
    });

    gsap.to(this.ui, {
      yPercent: 200,
      duration: 0.8,
    });

    this.nav.classList.remove("is-open");

    this.current = null;
  }
}
