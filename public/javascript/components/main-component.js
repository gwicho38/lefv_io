
class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
          <header-component></header-component>
          <body-component></body-component>
          <footer-component></footer-component>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('main-component', MainComponent);
