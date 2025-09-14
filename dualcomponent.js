// Super-class for webcomponents to provide a switch on using the shadow dom or not
// Meant to enforce using webcomponents as wrappers for base html to enhance its functionality
// Elements given no shadow dom will inherit styles from the global scope, 

// Use this.root in your sub-classes to get the element in a light-dom context or the shadowRoot in the shadow-dom context

// DualComponent Class
//  options:
//   Shadowed - Boolean:
//    true -> attach all children to a shadowroot and use shadowDOM
//    false -> leave elements in lightDOM 
//   ShadowRootOpen - Boolean:
//    true -> use mode: open
//    false -> use mode: closed
//   Style - string:
//    styles to be used for the shadow dom if it is present, otherwise the styles are overrides for this component 
 
class DualComponent extends HTMLElement {
    constructor(options) {
      super();
      if (!options) {
        this.root = this;
        return;
      }
      if(options["shadowed"]) {
        const isOpen = options["shadowRootOpen"] === true;
        this.root = this.attachShadow({"mode": isOpen ? "open" : "closed"})

        const children = Array.from(this.children);
        for (const child of children) {
          this.root.appendChild(child);
        }
        if (options["style"] != "") {
          const style = document.createElement("style");
          style.textContent = options["style"];
          this.root.appendChild(style);
        }
      } else {
        this.root = this;
        const style = document.createElement("style");
        style.textContent = this.tagName + " { " + options["style"] + " }";
        this.root.appendChild(style);

      } 
    }
}
