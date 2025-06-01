const modules = import.meta.glob("../*.ts", { eager: true });
// console.log("modules -> []", modules);

export function createModules(dataAttribute = "module") {
  return Array.from(document.querySelectorAll(`[data-${dataAttribute}]`))
    .map((element) => {
      const attributeValue = (element as HTMLElement).dataset[dataAttribute];
      const modulePath = `./../${attributeValue}.ts`;

      if (modules[modulePath]) {
        const ModuleClass = Object.values(modules[modulePath])[0];
        try {
          return new ModuleClass(element);
        } catch (error) {
          console.warn(
            `Failed to instantiate ${dataAttribute} ${attributeValue}:`,
            error
          );
          return null;
        }
      } else {
        console.warn(`${dataAttribute} not found: ${attributeValue}`);
        return null;
      }
    })
    .filter((item) => item !== null);
}
