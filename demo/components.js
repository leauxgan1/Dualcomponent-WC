
class CustomWidget extends HTMLElement {
  constructor() {
    super();
  }
}

class Clicker extends HTMLElement {
  constructor() {
    super();
    this.root = this.shadowRoot || this;
    // WC properties
    this.count = parseInt(this.getAttribute("start")) || 0;
    this.max = parseInt(this.getAttribute("end")) || 100;

    this.button = this.root.querySelector("button");
    this.label = this.root.querySelector("p");

    this.button.addEventListener("click", this);
  }
  connectedCallback() {
    this.label.textContent = this.count.toString();
  }
  handleEvent(event) {
    if (event.type == "click") {
      if (this.count < this.max) {
        this.count += 1;
        this.label.textContent = this.count.toString();
      }
    }
  }
}

class SortedList extends HTMLElement {
  static observedAttributes = ["ascending", "num-items"];
  #listItems = [];

  constructor() {
    super();
    this.root = this.shadowRoot || this;

    this.form = this.root.querySelector("form");
    this.input = this.form.querySelector("input");
    this.list = this.root.querySelector("ul");
    this.ascendingButton = this.root.querySelector("#asc-button");
    this.descendingButton = this.root.querySelector("#desc-button");

    this.setAttribute("ascending", true);
    this.setAttribute("num-items", 1);
    for (const child of this.list.children) {
      this.#listItems.push(child.textContent.trim());
    }

    this.form.addEventListener("submit", this)
    this.ascendingButton.addEventListener("click", this);
    this.descendingButton.addEventListener("click", this);

  }
  connectedCallback() {
    this.sort();
    this.render();
  }
  handleEvent(event) {
    if (event.type === "submit") {
      event.preventDefault();
      // Add current content to listItems as a new string
      if (this.input.value !== "") {
        this.#listItems.push(this.input.value.trim());
        this.setAttribute("num-items", this.#listItems.length);
        this.input.value = "";
      }
    } else if (event.type === "click") {
      if (event.target == this.ascendingButton) {
        this.setAttribute("ascending", true)
      } else if (event.target == this.descendingButton) {
        this.setAttribute("ascending", false)
      }
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    console.log("rerender");
    this.sort();
    this.render();
  }

  sort() {
    this.#listItems.sort((a,b) => {
      const asc = this.getAttribute("ascending") === "true";
      if(asc == true) {
          return a.toLowerCase().localeCompare(b.toLowerCase());
      } else {
          return b.toLowerCase().localeCompare(a.toLowerCase());
      }
    });
  }
  render() {
    // Update list to have an li for every element in the list property in sorted order
    this.list.textContent = "";
    for (const item of this.#listItems) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      this.list.appendChild(listItem);
    }
  }
}

customElements.define("custom-widget", CustomWidget);
customElements.define("clicker-wc", Clicker);
customElements.define("sorted-list", SortedList);
