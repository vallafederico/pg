import Core from "smooothy";
import gsap from "gsap";

export class Slider extends Core {
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
  }

  animate() {
    this.update();
  }
}
