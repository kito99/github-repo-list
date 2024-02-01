import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {RepositoryResults} from './github-model';
import './repo-card';
import {card} from './styles';
import {TopicsChangedEvent} from './repo-filter';


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
    errorMsg: string | null = null;

    private _query: string | null = null;
    private topicsChangedListener = (event: Event) => this.filter(event);

    connectedCallback() {
        super.connectedCallback();
        console.log(this.tagName + ' added to DOM');
        document.addEventListener('topicsChanged', this.topicsChangedListener);
    }

    disconnectedCallback() {
        document.removeEventListener('topicsChange', this.topicsChangedListener);
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

    private filter(event: Event) {
        const topics = (event as TopicsChangedEvent).detail;
        let newQuery: string | null = null;
        if (topics.length > 0) {
            newQuery = topics.map(topic => 'topic:' + topic).join(',') +
                '&sort=stars&order=desc&client_id=kmann&client_secret=76d8e82c65b291a6da41e73a7d4deedcee063a24';
        }
        console.log('newQuery', newQuery);
        this.query = newQuery;
    }
}
