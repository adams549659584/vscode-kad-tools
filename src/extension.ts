'use strict';
import * as vscode from 'vscode';
import { RemProcess } from './process';
import { RemProvider } from './provider';
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';

let cog = null;
export function activate(context: vscode.ExtensionContext) {
  cog = vscode.workspace.getConfiguration('kad-tools');

  const process = new RemProcess(cog);
  let provider = new RemProvider(process);
  const LANS = ['html', 'vue', 'css', 'less', 'scss', 'sass', 'stylus'];
  for (let lan of LANS) {
    let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, provider);
    context.subscriptions.push(providerDisposable);
  }

  const ingoresViaCommand = ((cog.ingoresViaCommand || []) as string[]).filter(w => !!w).map(v => (v.endsWith('px') ? v : `${v}px`));
  context.subscriptions.push(
    // registerCmd('extension.px2rem', process.convertAllPx),
    vscode.commands.registerTextEditorCommand('extension.px2rem', (textEditor, edit) => {
      const doc = textEditor.document;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
        selection = new vscode.Range(start, end);
      }

      let text = doc.getText(selection);
      textEditor.edit(builder => {
        builder.replace(selection, process.convertAllPx2Rem(text, ingoresViaCommand));
      });
    }),
    vscode.commands.registerTextEditorCommand('extension.rpx2rem', (textEditor, edit) => {
      const doc = textEditor.document;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
        selection = new vscode.Range(start, end);
      }

      let text = doc.getText(selection);
      textEditor.edit(builder => {
        builder.replace(selection, process.convertAllRpx2Rem(text, ingoresViaCommand));
      });
    }),
    vscode.commands.registerTextEditorCommand('extension.rem2px', (textEditor, edit) => {
      const doc = textEditor.document;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
        selection = new vscode.Range(start, end);
      }

      let text = doc.getText(selection);
      textEditor.edit(builder => {
        builder.replace(selection, process.convertAllRem2Px(text, ingoresViaCommand));
      });
    }),
    vscode.commands.registerTextEditorCommand('extension.rem2rpx', (textEditor, edit) => {
      const doc = textEditor.document;
      let selection: vscode.Selection | vscode.Range = textEditor.selection;
      if (selection.isEmpty) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
        selection = new vscode.Range(start, end);
      }

      let text = doc.getText(selection);
      textEditor.edit(builder => {
        builder.replace(selection, process.convertAllRem2Rpx(text, ingoresViaCommand));
      });
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
