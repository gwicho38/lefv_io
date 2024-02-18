class BodyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
          <style>
              @import "../../stylesheets/body-component.css";
          </style>
          <h1>Hello</h1>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('body-component', BodyComponent);
