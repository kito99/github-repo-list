import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {RepositoryResults} from './github-model';

@customElement('virtua-github-repo-list')
export class GithubRepoList extends LitElement {

    static get styles() {
        return css`
             .card {
                  display: block;
                  border-radius: 4px;
                  background: #fff;
                  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
                  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
                  padding: 14px 36px 18px 36px;
                  cursor: pointer;
                  margin: 5px;
             }
        `;
    }

    @property({type: String, reflect: true})
    url = 'https://api.github.com/search/repositories';

    @property({type: String, reflect: true})
    get query(): string | null {
        return this._query;
    }

    set query(query: string | null) {
        const oldValue = this._query;
        this._query = query;
        this.performQuery();
        this.requestUpdate('query', oldValue);
    }

    results: RepositoryResults | null = null;

    private _query: string | null = null;

    connectedCallback() {
        super.connectedCallback();
        console.log(this.tagName + ' added to DOM');
    }

    protected render() {
        return html`
            <section class='card'>
                ${this.results && this.results.total_count > 0 ? this.results.items.map(repository =>
            html`<div>${repository.name}</div>`) : 'No repositories found.'}
            </section>               
        `;
    }

    private async performQuery() {
        if (this.query) {
            const response = await fetch(`${this.url}?q=${this.query}`);
            this.results = await response.json();
            this.requestUpdate();
        } else {
            this.results = null;
        }
    }
}
