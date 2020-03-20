// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { GitExtension } from './types/git';
import CommitType from './config/commit-type';
import { CommitDetailType, CommitDetailQuickPickOptions } from './config/commit-detail';
import CommitInputType from './config/commit-input';
export interface GitMessage {
    [index: string]: string;
    type: string;
    scope: string;
    subject: string;
    body: string;
    footer: string;
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    //获取是否在git扩展内 Gets whether it is in the git extension
    function getGitExtension() {
        const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
        const gitExtension = vscodeGit && vscodeGit.exports;
        return gitExtension;
    }
    //Commit message config
    const message_config: GitMessage = {
        type: '',
        scope: '',
        subject: '',
        body: '',
        footer: ''
    };
    //清除填写信息 clear message
    function clearMessage() {
        Object.keys(message_config).forEach(key => (message_config[key] = ''));
        CommitDetailType.map(item => {
            item.isEdit = false;
            return item;
        });
    }
    //组合信息 Portfolio information
    function messageCombine(config: GitMessage) {
        return `${config.type}(${config.scope}): ${config.subject}\n${config.body}\n${config.footer}`;
    }
    const gitExtension = getGitExtension();
    if (!gitExtension?.enabled) {
        vscode.window.showErrorMessage('Git extensions are not currently enabled, please try again after enabled!');
        return false;
    }
    //获取当前的 git仓库实例 Get git repo instance
    const repo = gitExtension?.getAPI(1).repositories[0];
    // 递归输入信息 Recursive input message
    const recursiveInputMessage = (startMessageInput?: () => void) => {
        CommitDetailQuickPickOptions.placeHolder = 'Search Commit Describe';
        const _CommitDetailType: Array<CommitDetailType> = JSON.parse(JSON.stringify(CommitDetailType));
        _CommitDetailType.map((item: any) => {
            if (item.isEdit) {
                item.description = `${item.description} 👍 >> ${message_config[item.key || '']}`;
            }
            return item;
        });
        vscode.window.showQuickPick(_CommitDetailType, CommitDetailQuickPickOptions).then(select => {
            const label = (select && select.label) || '';
            if (label !== '') {
                const _key = select?.key || 'body';
                if (_key === 'complete') {
                    vscode.commands.executeCommand('workbench.view.scm');
                    repo.inputBox.value = messageCombine(message_config);
                    clearMessage();
                    return false;
                }
                if (_key === 'back') {
                    startMessageInput && startMessageInput();
                    clearMessage();
                    return false;
                }
                const _detailType = CommitDetailType.find(item => item.key === _key);
                CommitInputType.prompt = `${_detailType?.description} >> ${_detailType?.detail}`;
                CommitInputType.value = message_config[_key] ? message_config[_key] : '';
                vscode.window.showInputBox(CommitInputType).then(value => {
                    if (_key === 'subject') {
                        if (value && value?.length > 20) {
                            vscode.window.showErrorMessage('The commit overview is no more than 20 words');
                            recursiveInputMessage(startMessageInput);
                            return false;
                        }
                    }
                    message_config[_key] = value || message_config[_key];
                    _detailType && (_detailType.isEdit = true);
                    recursiveInputMessage(startMessageInput);
                });
            } else {
                clearMessage();
            }
        });
    };
    //开始输入 Start input
    const startMessageInput = () => {
        CommitDetailQuickPickOptions.placeHolder = 'Search Commit Type';
        vscode.window.showQuickPick(CommitType, CommitDetailQuickPickOptions).then(select => {
            const label = (select && select.label) || '';
            message_config.type = label;
            if (label !== '') {
                recursiveInputMessage(startMessageInput);
            }
        });
    };
    //点击图标触发快捷选项 Click the icon to trigger shortcut options
    let disposable = vscode.commands.registerCommand('extension.showGitCommit', () => {
        startMessageInput();
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
