class MainComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
          <style>
              @import "../../stylesheets/main-component.css";
          </style>
          <header-component></header-component>
          <body-component></body-component>
          <footer-component></footer-component>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// declare component
customElements.define('main-component', MainComponent);
