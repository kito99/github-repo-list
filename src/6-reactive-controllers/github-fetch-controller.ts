import {ReactiveController, ReactiveControllerHost} from 'lit';
import {RepositoryResults} from "./github-model";

export class GithubFetchController implements ReactiveController {

    get results(): RepositoryResults | null {
        return this._results;
    }
    get errorMsg(): string | null {
        return this._errorMsg;
    }
    public query : string | null | undefined = null;
    public url : string | null = null;

    private _results: RepositoryResults | null = null;
    private _errorMsg: string | null = null
    private host: ReactiveControllerHost;

    constructor(host: ReactiveControllerHost, url: string, query?: string | null) {
        (this.host = host).addController(this);
        this.url = url;
        this.query = query;
    }

    hostConnected() {
       this.performQuery();
    }

    hostDisconnected() {
        // Clear the timer when the host is disconnected
    }

    public async performQuery() {
        if (this.query) {
            const response = await fetch(`${this.url}?q=${this.query}`);
            if (response.ok) {
                this._errorMsg = null;
                this._results = await response.json();
            } else {
                this._errorMsg = `${response.status} ${response.statusText}`;
            }
            this.host.requestUpdate();
        } else {
            this._results = null;
        }
    }
}
