import {css, customElement, html, LitElement, property} from 'lit-element';
import {RepositoryResults} from "./github-model";
import "./repo-card";
import {card} from "./styles";

@customElement('virtua-github-repo-viewer')
export class GithubRepoViewer extends LitElement {

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

    protected render() {
        return html`
        <section class="card">               
               ${this.results ? this.results.items.map(
            repository => html`<virtua-repo-card .repository="${repository}"></virtua-repo-card>`) : ''}
        </section>               
            `;
    }

    private async performQuery() {
        if (this.query) {
            const response = await fetch(`${this.url}?q=${this.query}`);
            this.results = await response.json();
            this.requestUpdate();
        }
    }

}
