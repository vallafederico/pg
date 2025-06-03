import Core from "smooothy";
import gsap from "gsap";
import hey from "./hey";

export class _Slider extends Core {
  constructor() {
    super(document.querySelector("[data-slider='wrapper']"), {
      infinite: true,
      snap: true,
      dragSensitivity: 0.01,
    });

    const arrows = document.querySelector('[data-slider="arrows"]');
    arrows.children[0].onclick = () => this.goToPrev();
    arrows.children[1].onclick = () => this.goToNext();

    gsap.ticker.add(this.animate.bind(this));

    // queueMicrotask(() => {
    //   console.log(this.items);
    // });
  }

  animate() {
    this.update();
  }

  onSlideChange = (index) => {
    console.log(index);
    hey.SLIDE = index;
  };
}

export const Slider = new _Slider();
