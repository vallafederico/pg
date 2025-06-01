import { createModules } from "./modules/_/create";

const modules = createModules();
// console.log("---", modules);

export class App {
  constructor() {
    console.log("App2");
  }
}

new App();
