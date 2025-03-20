class MyWebComponent extends HTMLElement {

    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
        return ['foo', 'bar'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.mainDiv = document.createElement('div');
        this.render();
        shadow.appendChild(this.mainDiv);
    }

    render() {
        this.mainDiv.innerHTML = `
              <p>foo: ${this.getAttribute('foo')}</p>
              <p>bar: ${this.bar}</p>`;
    }

    connectedCallback() {
        console.log('Custom square element added to page.');
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed:', name, oldValue, newValue);
        this[name] = newValue;
        this.render();
    }

}

customElements.define('my-web-component', MyWebComponent);

