import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-ts-lit-element')
export class MyTsLitElement extends LitElement {
    @property({type: String}) prop1 = 'Hello World';
    @property({type: Number}) prop2 = 5;
    @property({type: Boolean}) prop3 = true;
    @property({type: Array}) prop4 = [1, 2, 3];
    @property({type: Object}) prop5 = {subprop1: 'prop 5 subprop1 value'};

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

