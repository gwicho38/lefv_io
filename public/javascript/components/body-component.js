class BodyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.counter = 0; // Initialize counter
    const template = document.createElement("template");
    template.innerHTML = `
          <style>
              @import "../../stylesheets/body-component.css";
          </style>
          <div class="flex-container" id="flexContainer">
            <slot name="lefv-io-container">${this.content}</slot>
          </div>
          </div>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.getElementById('applyStyleBtn').addEventListener('click', () => {
      this.applyStyle();
    });

    this.shadowRoot.getElementById('addChildBtn').addEventListener('click', () => {
      this.addChild();
    });

    this.shadowRoot.getElementById('incrementSlotBtn').addEventListener('click', () => {
      this.incrementSlot();
    });
  };

  content = `<iframe width="100%" height="100%" src="https://ambientweather.net/devices/public/5433c07a4d144ebbe63a450ecc7879e7?embed=true"></iframe>`;


  // Method to add child elements
  addChild() {
    const flexContainer = this.shadowRoot.getElementById("flexContainer");
    const child = document.createElement('div');
    child.textContent = `Child ${++this.counter}`; // Increment counter and set text
    flexContainer.appendChild(child);
    // Update slot content dynamically
    const slot = this.shadowRoot.querySelector('slot[name="lefv-io-container"]');
    slot.textContent = `Slot ${this.counter}`;
  };

  incrementSlot() {
    // Update slot content dynamically
    const slot = this.shadowRoot.querySelector('slot[name="lefv-io-container"]');
    slot.textContent = `Slot ${++this.counter}`;
  }

  // Method to remove all child elements
  clearChildren() {
    const flexContainer = this.shadowRoot.getElementById("flexContainer");
    flexContainer.innerHTML = "";
    this.counter = 0; // Reset counter when clearing children
    // Update slot content dynamically
    const slot = this.shadowRoot.querySelector('slot[name="lefv-io-container"]');
    slot.textContent = `Slot`;
  };

  // Apply style based on user input
  applyStyle() {
    const styleInput = this.shadowRoot.getElementById('styleInput');
    const newStyle = styleInput.value;
    const flexContainer = this.shadowRoot.getElementById('flexContainer');
    flexContainer.style = newStyle;
  }

  // Listen for changes in attributes
  static get observedAttributes() {
    return ["style"];
  };

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'style') {
      // Update style if needed
      const flexContainer = this.shadowRoot.getElementById('flexContainer');
      flexContainer.style = newValue;
    }
  };
}
customElements.define("body-component", BodyComponent);
const bodyContainer = document.createElement('body-component');