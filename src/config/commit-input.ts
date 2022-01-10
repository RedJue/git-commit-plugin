import { InputBoxOptions } from 'vscode';
import { localize } from 'vscode-nls-i18n';

/**
 * @description git commit input 输入提交信息的配置对象
 */
export interface CommitInputType extends InputBoxOptions {}

export default function GetCommitInputType() {
    const CommitInputType: CommitInputType = {
        placeHolder: localize('extension.commitInputType.detail'),
        ignoreFocusOut: true,
        prompt: '',
        value: '',
    };

    return CommitInputType;
}
