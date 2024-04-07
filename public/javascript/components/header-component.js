class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
            <head>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@^2.0/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <style>
              @import "../../stylesheets/header-component.css"
            </style>
            <header class="justify-center items-center  bg-gray-700 text-white p-4">
                <h1>lefv.io</h1>
            </header>
        `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('header-component', HeaderComponent);
