// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function getModuleScope(text: string): string | null {
	// Look for module and class names using regular expressions
	const pattern = /(module|class)\s+(\S+)\s*/g;
	const matches = text.matchAll(pattern);

	const names: string[] = [];
	for (const match of matches) {
		names.push(match[2]);
	}

	if (names.length > 0) {
		return names.join('::');
	}

	return null;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ruby-copy-modulized.rubyCopyModulized', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}

		const selection = editor.selection;
		let selectedText = '';

		if (selection.isEmpty) {
			selectedText = editor.document.lineAt(selection.active.line).text;
		} else {
			selectedText = editor.document.getText(selection);
		}

		const moduleScope = getModuleScope(selectedText);

		if (moduleScope) {
			await vscode.env.clipboard.writeText(moduleScope);
			vscode.window.showInformationMessage(`Module scope copied to clipboard. ${moduleScope}`);
		} else {
			vscode.window.showErrorMessage('No valid module scope found in the selection.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
