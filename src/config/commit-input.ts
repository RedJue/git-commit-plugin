import { InputBoxOptions } from 'vscode';

/**
 * @description git commit input 输入提交信息的配置对象
 */
export interface CommitInputType extends InputBoxOptions {}
const CommitInputType: CommitInputType = {
    placeHolder: '请输入提交信息 Input Commit Message',
    ignoreFocusOut: true,
    prompt: '',
    value: ''
};

export default CommitInputType;
