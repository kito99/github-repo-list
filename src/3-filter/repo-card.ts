import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Repository} from "./github-model";
import {card} from "./styles";

@customElement('virtua-repo-card')
export class RepoCard extends LitElement {

    static get styles() {
        return [
            card,
            css`
                a {
                  text-decoration: none;             
                }
                a, a:visited, a:hover  {
                  color: inherit;
                }       
                header {
                  display: block;
                  margin-bottom: 10px;
                  font-size: 14pt;       
                }         
                header h1 {
                  font-size: 18pt;              
                  margin: 0 0 5px 0;
                }
            `];
    }

    @property({type: Object})
    repository: Repository | null = null;

    protected render() {
        if (this.repository) {
            return html`
                <a href="${this.repository.html_url}" target="${this.repository.id}">
                    <article class="card">
                        <header>
                            <h1>${this.repository.name}</h1>
                            ${this.repository.description}
                        </header>
                        <div>Home page: ${this.repository.homepage}</div>                      
                        <div>Language: ${this.repository.language}</div>
                        <div>Owner: ${this.repository.owner.login}</div>
                        <div>Created: ${this.repository.created_at}</div>
                        <div>Last Updated: ${this.repository.updated_at}</div>
                        <div>Number of Stars: ${this.repository.stargazers_count}</div>
                        <div>Number of Open Issues: ${this.repository.open_issues_count}</div>                                
                        <div>Number of Watchers: ${this.repository.watchers_count}</div>
                        <div>Number of Subscribers: ${this.repository.subscribers_count}</div>                                                
                    </article>
                </a>                    
            `;
        } else {
            return html``;
        }
    }
}
