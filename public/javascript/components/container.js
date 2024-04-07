function getSlot() {
    return (
        <span slot="lefv-io-container-child"><slot>test</slot></span>
    );
}

class Container extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement(
      "lefv-io-container"
    );
    template.innerHTML = `${getSlot}`;
    template.in
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.cloneNode(true));
  }
}

customElements.define("lefv-io-container", Container);