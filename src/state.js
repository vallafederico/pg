import gsap from "./gsap";

export class State {
  wrappers = [...document.querySelectorAll("[data-item='wrapper']")];
  triggers = [...document.querySelectorAll("[data-item='trigger']")];
  closes = [...document.querySelectorAll("[data-item='close']")];
  ui = document.querySelector("[data-ui]");
  nav = document.querySelector("[data-nav]");
  current = null;

  constructor() {
    this.closes.forEach((close, index) => {
      close.onclick = this.close.bind(this, index);
    });

    this.triggers.forEach((trigger, index) => {
      trigger.onclick = this.open.bind(this, index);
    });

    this.wrappers.forEach((wrapper, index) => {
      gsap.set(wrapper, {
        yPercent: 99,
        autoAlpha: 1,
      });
    });

    gsap.set(this.ui, {
      autoAlpha: 1,
      yPercent: 99,
    });
  }

  open(index) {
    this.current = index;

    gsap.to(this.wrappers[index], {
      yPercent: 0,
      duration: 0.8,
    });

    gsap.to(this.ui, {
      yPercent: 0,
      duration: 0.8,
      delay: 0.1,
    });

    this.nav.classList.add("is-open");
  }

  close() {
    gsap.to(this.wrappers[this.current], {
      yPercent: 99,
      duration: 0.8,
      delay: 0.05,
    });

    gsap.to(this.ui, {
      yPercent: 99,
      duration: 0.8,
    });

    this.nav.classList.remove("is-open");

    this.current = null;
  }
}
