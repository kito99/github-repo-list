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
              <div>foo: ${this.getAttribute('foo')}</div>
              <div>bar: ${this.bar}</div>`;
    }

    connectedCallback() {
        console.log('MyWebComponent added to page.');
    }

    disconnectedCallback() {
        console.log('MyWebComponent removed from page.');
    }

    adoptedCallback() {
        console.log('MyWebComponent moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('MyWebComponent attributes changed:', name, oldValue, newValue);
        this[name] = newValue;
        this.render();
    }

}

customElements.define('my-web-component', MyWebComponent);

