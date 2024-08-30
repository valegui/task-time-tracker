import { App, Modal, Setting } from "obsidian";

export class TaskModal extends Modal {
  taskName: string;
  taskCategory: string;
  taskProject: string;
  onSubmit: (
    taskName: string,
    taskCategory: string,
    taskProject: string,
  ) => void;

  constructor(
    app: App,
    onSubmit: (
      taskName: string,
      taskCategory: string,
      taskProject: string,
    ) => void,
  ) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.createEl("h1", { text: "Task" });
    new Setting(contentEl).setName("name").addText((text) =>
      text.onChange((valueName: string) => {
        this.taskName = valueName;
      }),
    );
    new Setting(contentEl).setName("category").addText((text) =>
      text.onChange((valueCategory: string) => {
        this.taskCategory = valueCategory;
      }),
    );
    new Setting(contentEl).setName("project").addText((text) =>
      text.onChange((valueProject: string) => {
        this.taskProject = valueProject;
      }),
    );
    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText("Submit")
        .setCta()
        .onClick(() => {
          this.close();
          this.onSubmit(this.taskName, this.taskCategory, this.taskProject);
        }),
    );
  }

  onClose(): void {
    const { contentEl } = this;
    contentEl.empty();
  }
}
