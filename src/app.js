import { createModules } from "./modules/_/create";
import { Scroll } from "./scroll";
import { State } from "./state";
import { Slider } from "./slider";
import { Video } from "./videos";
import { Headings } from "./headings";

const modules = createModules();

export class App {
  constructor() {
    // console.log("App2");

    this.state = new State();
    this.headings = new Headings();
  }
}

new App();
