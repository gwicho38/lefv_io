
class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <footer class="flex justify-center items-center bg-gray-700 text-white p-4">
                <p>© 2024 My Website. All rights reserved.</p>
            </footer>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('footer-component', FooterComponent);
