class ButtonCount extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        let button = document.createElement('button');
        button.innerText = 'Times Clicked: ';
        
        // Create a span element to display the click count
        this.clicks = 0;
        let countSpan = document.createElement('span');
        countSpan.innerText = this.clicks;

        button.addEventListener('click', () => {
            countSpan.innerText = ++this.clicks;
        });

        button.appendChild(countSpan);

        this.shadowRoot.appendChild(button);
    }
}

customElements.define('button-count', ButtonCount);