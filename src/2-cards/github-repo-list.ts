import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {RepositoryResults} from './github-model';
import './repo-card';
import {card} from './styles';

@customElement('virtua-github-repo-list')
export class GithubRepoList extends LitElement {

    static get styles() {
        return [
            card,
            css`
                section.card {
                  padding: 20px;
                }
            `];
    }

    @property({type: String, reflect: true})
    url = 'https://api.github.com/search/repositories';

    get query(): string | null {
        return this._query;
    }

    @property({type: String, reflect: true})
    set query(query: string | null) {
        this._query = query;
        this.performQuery();
    }

    results: RepositoryResults | null = null;
    errorMsg: string | null = null;

    private _query: string | null = null;

    connectedCallback() {
        super.connectedCallback();
        console.log(this.tagName + ' added to DOM');
    }

    protected render() {
        return html`
            <section class='card'>               
                ${this.errorMsg ? html`Error: ${this.errorMsg}` : null}
                ${!this.errorMsg ? this.renderCard() : null}
            </section>               
        `;
    }

    private renderCard() {
        return this.results && this.results.total_count > 0 ? this.results.items.map(repository =>
            html` 
                    <virtua-repo-card .repository='${repository}'></virtua-repo-card>          
                `) : 'No repositories found.';
    }

    private async performQuery() {
        if (this.query) {
            const response = await fetch(`${this.url}?q=${this.query}`);
            if (response.ok) {
                this.errorMsg = null;
                this.results = await response.json();
            } else {
                this.errorMsg = `${response.status} ${response.statusText}`;
            }
            this.requestUpdate();
        } else {
            this.results = null;
        }
    }
}
