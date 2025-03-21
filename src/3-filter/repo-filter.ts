import {ComplexAttributeConverter, css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

export interface TopicsChangedEvent extends CustomEvent {
    /** Selected topics */
    detail: string[];
}

class CommaSeparatedStringToArrayConverter implements ComplexAttributeConverter {
    fromAttribute(value: string | null, type?: String): string[] {
        return value ? value.split(',') : [];
    }

    toAttribute(value: string[], type?: String): string {
        return value.join(',')
    }
}

@customElement('virtua-repo-filter')
export class RepoFilter extends LitElement {

    @property({type: String, reflect: true})
    label = 'Filter by topic(s):';

    @property({type: Array, reflect: true, converter: new CommaSeparatedStringToArrayConverter()})
    topics: string[] = [];

    @property({type: String, reflect: true, converter: new CommaSeparatedStringToArrayConverter()})
    selectedTopics: string[] = [];

    connectedCallback() {
        super.connectedCallback();
        console.log(this.tagName + ' added to DOM');
    }

    protected render() {
        return html`
            <div>
                <label>${this.label}</label>
            </div>        
            ${this.topics.map(
            topic => html`
                        <span>                            
                            <input id="${topic}" type="checkbox" value="${topic}" @change="${this.onTopicToggle}">
                            <label for="${topic}">${topic}</label>
                        </span>
            `)}
        `;
    }

    protected onTopicToggle(event: Event) {
        if (!this.selectedTopics) {
            this.selectedTopics = [];
        }
        const checkbox = event.target as HTMLInputElement;
        const toggledTopic = checkbox.value;
        if (checkbox.checked) {
            this.selectedTopics = [...this.selectedTopics, toggledTopic]
        } else {
            this.selectedTopics = this.selectedTopics.filter(topic => topic !== toggledTopic);
        }
        const changeEvent: TopicsChangedEvent = new CustomEvent('topicsChanged', {
            detail: this.selectedTopics,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(changeEvent);
    }
}



