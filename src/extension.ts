import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('rcb.backup', (uri:vscode.Uri) => {
		
		var backupfile = uri.fsPath + '.bak';

		if (fs.existsSync(backupfile)) {
			vscode.window
			.showInformationMessage(".bak already exist do you want to overwrite", "Yes", "No")
			.then(answer => {
				if (answer === "Yes") {
					fs.copyFile(uri.fsPath, backupfile, (err) => {
						if (err) throw err;
						console.log('File Backed Up!');
					});
				} else {
					console.log("File didn't backed up")
				}
			})
		} else {
			fs.copyFile(uri.fsPath, backupfile, (err) => {
				if (err) throw err;
				console.log('File Backed Up!');
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
