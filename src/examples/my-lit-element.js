import {html, LitElement} from 'lit';

class MyLitElement extends LitElement {
    static get properties() {
        return {
            prop1: {type: String},
            prop2: {type: Number},
            prop3: {type: Boolean},
            prop4: {type: Array},
            prop5: {type: Object}
        };
    }

    constructor() {
        super();
        this.prop1 = 'Hello World';
        this.prop2 = 5;
        this.prop3 = false;
        this.prop4 = [1, 2, 3];
        this.prop5 = {subprop1: 'prop 5 subprop1 value'}
    }

    render() {
        return html`
      <div>prop1: ${this.prop1}</div>
      <div>prop2: ${this.prop2}</div>
      <div>prop3: ${this.prop3}</div>
      <div>prop4[0]: ${this.prop4[0]}</div>
      <div>prop5.subprop1: ${this.prop5.subprop1}</div>
    `;
    }

    connectedCallback() {
        super.connectedCallback();
        console.log('MyWebComponent added to page.');
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        console.log('MyWebComponent removed from page.');
    }

    adoptedCallback() {
        console.log('MyWebComponent moved to new page.');
    }
}

customElements.define('my-lit-element', MyLitElement);
