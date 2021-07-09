import { QuickPickItem, QuickPickOptions, workspace } from 'vscode';

/**
 * @description git commit detail 提交信息的详情
 */
export interface CommitDetailType extends QuickPickItem {
    key?: string | number;
    isEdit?: boolean;
}
//最大的 subject 限制字数 Max subject words
export const MaxSubjectWords = workspace.getConfiguration('GitCommitPlugin').get<boolean>('MaxSubjectWords') || 20;

export const CommitDetailType: Array<CommitDetailType> = [
    {
        label: '<Scope>',
        key: 'scope',
        description: '修改范围',
        detail: '本次修改包含哪些模块',
        isEdit: false
    },
    {
        label: '<Subject>',
        key: 'subject',
        description: '概述',
        detail: `commit 概述 不超过${MaxSubjectWords}字`,
        isEdit: false
    },
    {
        label: '<Body>',
        key: 'body',
        description: '详情',
        detail: 'commit 详情 可换行显示',
        isEdit: false
    },
    {
        label: '<Footer>',
        key: 'footer',
        description: '备注',
        detail: '通常是修复 bug 的链接',
        isEdit: false
    },
    {
        label: 'Complete',
        key: 'complete',
        detail: '完成 commit 的编写'
    },
    {
        label: 'Select template for commit',
        key: 'template',
        detail: '选择提交使用的模板'
    },
    {
        label: 'Back',
        key: 'back',
        detail: '返回 commit type 选择页'
    }
];

export const CommitDetailQuickPickOptions: QuickPickOptions = {
    matchOnDescription: true,
    matchOnDetail: true,
    ignoreFocusOut: true
};
