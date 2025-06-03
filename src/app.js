import { createModules } from "./modules/_/create";
import { Scroll } from "./scroll";
import { State } from "./state";
import { Slider } from "./slider";

const modules = createModules();

export class App {
  constructor() {
    // console.log("App2");

    this.state = new State();
  }
}

new App();
