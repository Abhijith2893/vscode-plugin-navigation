import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const stack: Array<vscode.TextDocument> = [];

	vscode.window.onDidChangeActiveTextEditor(() => {
		let textDocument: vscode.TextDocument = vscode.window.activeTextEditor?.document!;
		textDocument && stack.push(textDocument);
	});

	let navigateBack = vscode.commands.registerCommand('file-navigator.navigateBack', () => {
		if (stack.length){
			if (stack.length !== 1){
				stack.pop();
			}
			let currentTextDocument: vscode.TextDocument = stack.pop()!;
			vscode.window.showTextDocument(currentTextDocument);
		}
	});

	context.subscriptions.push(navigateBack);
}

export function deactivate() {}
