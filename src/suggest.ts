import { TFile, AbstractInputSuggest, App} from "obsidian";

export class FileSuggest extends AbstractInputSuggest<string> {
    content: Set<TFile>;

    constructor(private inputEl: HTMLInputElement, content: Set<TFile>, private onSelectCb: (value: string) => void, app: App) {
        super(app, inputEl);
        this.content = content;
    }

    getSuggestions(input: string): string[] {
        const lowerCaseInput = input.toLocaleLowerCase();
        let files = [...this.content].filter((content) =>
            content.path.contains(lowerCaseInput)
        );
        return files.map((tfiles) =>
            tfiles.path
        );
    }

    renderSuggestion(content: string, el: HTMLElement): void {
        el.setText(content);
    }

    selectSuggestion(content: string, evt: MouseEvent | KeyboardEvent): void {
        this.onSelectCb(content);
        this.inputEl.value = "";
        this.inputEl.blur();
        this.close();
    }
}