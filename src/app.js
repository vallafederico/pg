import { createModules } from "./modules/_/create";
import { Scroll } from "./scroll";
import { State } from "./state";

const modules = createModules();
// console.log("---", modules);

export class App {
  constructor() {
    console.log("App2");

    this.state = new State();
  }
}

new App();
