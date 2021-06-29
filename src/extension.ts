// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { workspace } from 'vscode';
import * as vscode from 'vscode';
import { GitExtension } from './types/git';
import CommitType from './config/commit-type';
import { CommitDetailType, CommitDetailQuickPickOptions, MaxSubjectWords } from './config/commit-detail';
import CommitInputType from './config/commit-input';
import CommitTemplate from './config/template-type';
export interface GitMessage {
    [index: string]: string;
    type: string;
    scope: string;
    subject: string;
    body: string;
    footer: string;
}
//是否展现 Emoji图标 show Emoji or not
const isShowEmoji = workspace.getConfiguration('GitCommitPlugin').get<boolean>('ShowEmoji');
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
        templateName: '',
        templateContent: '',
        icon:'',
        type: '',
        scope: '',
        subject: '',
        body: '',
        footer: ''
    };
    //清除填写信息 Clear message
    function clearMessage() {
        Object.keys(message_config).forEach((key) => (message_config[key] = ''));
        CommitDetailType.map((item) => {
            item.isEdit = false;
            return item;
        });
    }
    //组合信息 Portfolio information
    function messageCombine(config: GitMessage) {
        let result = config.templateContent;
        result = isShowEmoji ? result.replace(/<icon>/g, config.icon) : result.replace(/<icon>/g, '');
        result = config.type ? result.replace(/<type>/g, config.type) : result.replace(/<type>/g, '');
        result = config.scope ? result.replace(/<scope>/g, config.scope) : result.replace(/<scope>/g, '');
        result = config.subject ? result.replace(/<subject>/g, config.subject) : result.replace(/<subject>/g, '');
        result = config.body ? result.replace(/<body>/g, config.body) : result.replace(/<body>/g, '');
        result = config.footer ? result.replace(/<footer>/g, config.footer) : result.replace(/<footer>/g, '');
        result = result.replace(/<enter>/g, '\n\n');
        result = result.replace(/<space>/g, ' ');
        return result;
        // return [`${config.type}${config.scope ? '(' + config.scope + ')' : ''}: ${config.subject} -- ${config.templateName}`, config.body, config.footer]
        //     .filter((item) => item)
        //     .join('\n\n');
    }
    const gitExtension = getGitExtension();
    if (!gitExtension?.enabled) {
        vscode.window.showErrorMessage('Git extensions are not currently enabled, please try again after enabled!');
        return false;
    }

    //获取当前的 git仓库实例 Get git repo instance
    let repo: any = gitExtension.getAPI(1).repositories[0];
    console.log(repo, 'repo');

    //输入提交详情 Input message detail
    const inputMessageDetail = (_key: string | number) => {
        const _detailType = CommitDetailType.find((item) => item.key === _key);
        CommitInputType.prompt = `${_detailType?.description} 👉 ${_detailType?.detail}`;
        CommitInputType.value = message_config[_key] ? message_config[_key] : '';
        vscode.window.showInputBox(CommitInputType).then((value) => {
            const _value = value || '';
            message_config[_key] = _value;
            _detailType && (_detailType.isEdit = true);
            if (_key === 'subject') {
                const input_value_length = value ? value?.length : 0;
                if (input_value_length > MaxSubjectWords) {
                    vscode.window.showErrorMessage(
                        `The commit overview is no more than ${MaxSubjectWords} words but the current input is ${input_value_length} words`,
                        ...['ok']
                    );
                    inputMessageDetail(_key);
                    return false;
                }
            }
            recursiveInputMessage(startMessageInput);
        });
    };
    // 递归输入信息 Recursive input message
    const recursiveInputMessage = (startMessageInput?: () => void) => {
        CommitDetailQuickPickOptions.placeHolder = '搜索提交描述(Search Commit Describe)';
        const _CommitDetailType: Array<CommitDetailType> = JSON.parse(JSON.stringify(CommitDetailType));
        _CommitDetailType.map((item: any) => {
            if (item.isEdit) {
                item.description = `${item.description} 👍 >> ${message_config[item.key || '']}`;
            }
            return item;
        });
        vscode.window.showQuickPick(_CommitDetailType, CommitDetailQuickPickOptions).then((select) => {
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
                inputMessageDetail(_key);
            } else {
                clearMessage();
            }
        });
    };
    //开始输入 Start input
    const startMessageInput = () => {
        CommitDetailQuickPickOptions.placeHolder = '搜索 Git 提交类型(Search Commit Type)';
        vscode.window.showQuickPick(CommitType, CommitDetailQuickPickOptions).then((select) => {
            const label = (select && select.label) || '';
            const icon = (select && select.icon) || '';
            message_config.type = label;
            message_config.icon = icon;
            if (label !== '') {
                recursiveInputMessage(startMessageInput);
            }
        });
    };
    //选择commit 提交的模板
    const SelectTemplate = () => {
        CommitDetailQuickPickOptions.placeHolder = '选择提交使用的模板';
        vscode.window
            .showQuickPick(CommitTemplate, CommitDetailQuickPickOptions).then((select) => {
                const templateName = (select && select.templateName) || '';
                const templateContent = (select && select.templateContent) || '';
                message_config.templateName = templateName;
                message_config.templateContent = templateContent;
                if (templateName !== '') {
                    startMessageInput();
                    // recursiveInputMessage(startMessageInput);
                }
            });
    };
    //点击图标触发快捷选项 Click the icon to trigger shortcut options
    let disposable = vscode.commands.registerCommand('extension.showGitCommit', (uri?) => {
        if (uri) {
            //如果有多个repo 寻找当前的 进行填充 If there are multiple repos looking for the current to populate
            repo = gitExtension.getAPI(1).repositories.find((repo) => {
                return repo.rootUri.path === uri._rootUri.path;
            });
        }
        SelectTemplate();
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}