import { TFile, type ISuggestOwner} from "obsidian";

export class FileSuggest implements ISuggestOwner<string>{
    renderSuggestion(value: string, el: HTMLElement): void {
        throw new Error("Method not implemented.");
    }
    selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
        throw new Error("Method not implemented.");
    }


}