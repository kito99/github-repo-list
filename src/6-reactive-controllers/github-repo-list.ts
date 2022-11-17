import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import './repo-card';
import {card} from './styles';
import {TopicsChangedEvent} from './repo-filter';
import {GithubFetchController} from "./github-fetch-controller";

@customElement('virtua-github-repo-list')
export class GithubRepoList extends LitElement {

    static get styles() {
        return [
            card,
            css`
              section.card {
                padding: 20px;
              }

              section.header-card {
                margin-bottom: 20px;
              }

              ::slotted(header) {
                font-size: var(--header-font-size, 24pt);
                font-family: var(--header-font-family);
                margin-bottom: 10px;
              }
            `];
    }

    @property({type: String, reflect: true})
    url = 'https://api.github.com/search/repositories';

    @property({type: String, reflect: true})
    get query(): string | null {
        return this._query
    }

    set query(query: string | null) {
        const oldValue = this._query;
        this._query = query;
        this.requestUpdate('query', oldValue);
        this.githubController.query = query;
        this.githubController.performQuery();
    }

    private githubController = new GithubFetchController(this, this.url)
    private _query: string | null = null;

    connectedCallback() {
        super.connectedCallback();
        console.log(this.tagName + ' added to DOM');
        document.addEventListener('topicsChanged', this.topicsChangedListener);
    }

    disconnectedCallback() {
        document.removeEventListener('topicsChange', this.topicsChangedListener);
    }

    protected render() {
        const errorMsg = this.githubController.errorMsg;
        return html`
            <section class='card'>
                ${this.childElementCount > 0 ? this.renderHeader() : null}
                ${errorMsg ? html`Error: ${errorMsg}` : null}
                ${!errorMsg ? this.renderCard() : null}
            </section>
        `;
    }

    private renderHeader() {
        return html`
            <section class="card header-card">
                <slot></slot>
            </section>
        `;
    }

    private renderCard() {
        const results = this.githubController.results;
        return results && results.total_count > 0 ? results.items.map(repository =>
            html`
                <virtua-repo-card .repository='${repository}'></virtua-repo-card>
            `) : 'No repositories found.';
    }

    // preserve "this"
    private topicsChangedListener = (event: Event) => this.filter(event);

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
