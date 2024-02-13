
class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <main class="flex-1 p-4">
                <section class="mb-4">
                    <h2>Main Content</h2>
                    <p>This is the main section of the webpage, styled using Tailwind CSS.</p>
                </section>
                <section>
                    <h2>More Information</h2>
                    <p>This is another section to provide additional information.</p>
                </section>
            </main>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('main-component', MainComponent);
