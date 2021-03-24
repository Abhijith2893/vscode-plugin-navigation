import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const stack: Array<vscode.TextDocument> = [];

	let createStack = vscode.commands.registerCommand('file-navigator.createStack', () => {
		vscode.window.showInformationMessage('Hello World from File Navigator!');
		
		vscode.window.onDidChangeActiveTextEditor(() => {
			console.log(vscode.window.activeTextEditor?.document.fileName);
			let textDocument: vscode.TextDocument = vscode.window.activeTextEditor?.document!;
			textDocument && stack.push(textDocument);
		});
	});

	let navigateBack = vscode.commands.registerCommand('file-navigator.navigateBack', () => {
		if (stack){
			stack.pop();
			let currentTextDocument: vscode.TextDocument = stack.pop()!;
			console.log("POPPED " + currentTextDocument);
			vscode.window.showTextDocument(currentTextDocument);
		}
	});

	context.subscriptions.push(createStack);
	context.subscriptions.push(navigateBack);
}

export function deactivate() {}
