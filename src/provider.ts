import * as vscode from 'vscode';
import { RemProcess } from './process';

export class RemProvider implements vscode.CompletionItemProvider {
  constructor(private process: RemProcess) {}

  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    return new Promise((resolve, _reject) => {
      const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position));
      const res = this.process.convert(lineText);
      if (!res) {
        return resolve([]);
      }

      const pxItem = new vscode.CompletionItem(`${res.pxValue}px -> ${res.rem}`, vscode.CompletionItemKind.Snippet);
      pxItem.insertText = res.rem;
      return resolve([pxItem]);
    });
  }
}
