import { TFile, AbstractInputSuggest, App} from "obsidian";

export class FileSuggest extends AbstractInputSuggest<TFile> {
    textInputEl: HTMLInputElement;

    constructor(app: App, textInputEl: HTMLInputElement) {
        super(app, textInputEl);
        this.textInputEl = textInputEl;
    }

    getSuggestions(input: string): TFile[] {
        const loadedFiles = this.app.vault.getMarkdownFiles();
        const lowerCaseInput = input.toLocaleLowerCase();
        let files = loadedFiles.filter((f) =>
            f.path.toLocaleLowerCase().contains(lowerCaseInput)
        );
        return files as TFile[];
    }

    renderSuggestion(content: TFile, el: HTMLElement): void {
        el.setText(content.path);
    }

    selectSuggestion(file: TFile, evt: MouseEvent | KeyboardEvent): void {
        this.textInputEl.value = file.path;
        this.textInputEl.trigger("input");
        this.close();
    }
}