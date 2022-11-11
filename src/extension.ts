import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('right-click-backup.backup', (uri:vscode.Uri) => {
		
		var backupfile = uri.fsPath + '.bak';

		if (fs.existsSync(backupfile)) {
			vscode.window
			.showInformationMessage("Backup already exist do you want to overwrite", "Yes", "No")
			.then(answer => {
				if (answer === "Yes") {
					fs.copyFile(uri.fsPath, backupfile, (err) => {
						if (err) throw err;
						vscode.window.showInformationMessage('Backed Up!');
					});
				} else {
					console.log("File didn't backed up")
				}
			});
		} else {
			fs.copyFile(uri.fsPath, backupfile, (err) => {
				if (err) throw err;
				console.log('File Backed Up!');
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('right-click-backup.restore', (uri:vscode.Uri) => {
		
		var restorefile = uri.fsPath.replace('.bak', '');

		var fileName = restorefile.split("/");

		var showInformationMessage = fileName[fileName.length-1] + ' already exist do you want to overwrite?';

		if (fs.existsSync(restorefile)) {
			vscode.window
			.showInformationMessage(showInformationMessage, "Yes", "No")
			.then(answer => {
				if (answer === "Yes") {
					fs.copyFile(uri.fsPath, restorefile, (err) => {
						if (err) throw err;
						vscode.window.showInformationMessage('Restored!');
					});
				} else {
					console.log("User De-Activated")
				}
			});
		} else {
			fs.copyFile(uri.fsPath, restorefile, (err) => {
				if (err) throw err;
				console.log('File Restored!');
			});
		}
	}));
}

export function deactivate() {}
