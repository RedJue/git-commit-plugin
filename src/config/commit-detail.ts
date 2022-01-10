import { QuickPickItem, QuickPickOptions, workspace } from 'vscode';
import { localize } from 'vscode-nls-i18n';

/**
 * @description git commit detail 提交信息的详情
 */
export interface CommitDetailType extends QuickPickItem {
    key?: string | number;
    isEdit?: boolean;
}
//最大的 subject 限制字数 Max subject words
export const MaxSubjectWords =
    workspace.getConfiguration('GitCommitPlugin').get<boolean>('MaxSubjectWords') || 20;

export function GetCommitDetailType() {
    const CommitDetailType: Array<CommitDetailType> = [
        {
            label: '<Scope>',
            key: 'scope',
            description: localize('extension.commitDetailType.scope.description'),
            detail: localize('extension.commitDetailType.scope.detail'),
            isEdit: false,
        },
        {
            label: '<Subject>',
            key: 'subject',
            description: localize('extension.commitDetailType.subject.description'),
            detail: localize(
                'extension.commitDetailType.subject.detail',
                MaxSubjectWords.toString(),
            ),
            isEdit: false,
        },
        {
            label: '<Body>',
            key: 'body',
            description: localize('extension.commitDetailType.body.description'),
            detail: localize('extension.commitDetailType.body.detail'),
            isEdit: false,
        },
        {
            label: '<Footer>',
            key: 'footer',
            description: localize('extension.commitDetailType.footer.description'),
            detail: localize('extension.commitDetailType.footer.detail'),
            isEdit: false,
        },
        {
            label: 'Complete',
            key: 'complete',
            detail: localize('extension.commitDetailType.complete.detail'),
        },
        {
            label: 'Select template for commit',
            key: 'template',
            detail: localize('extension.commitDetailType.template.detail'),
        },
        {
            label: 'Back',
            key: 'back',
            detail: localize('extension.commitDetailType.back.detail'),
        },
    ];

    return CommitDetailType;
}

// export const CommitDetailType: Array<CommitDetailType> = [
//     {
//         label: '<Scope>',
//         key: 'scope',
//         description: '修改范围',
//         detail: '本次修改包含哪些模块',
//         isEdit: false
//     },
//     {
//         label: '<Subject>',
//         key: 'subject',
//         description: '概述',
//         detail: `commit 概述 不超过${MaxSubjectWords}字`,
//         isEdit: false
//     },
//     {
//         label: '<Body>',
//         key: 'body',
//         description: '详情',
//         detail: 'commit 详情 可换行显示',
//         isEdit: false
//     },
//     {
//         label: '<Footer>',
//         key: 'footer',
//         description: '备注',
//         detail: '通常是修复 bug 的链接',
//         isEdit: false
//     },
//     {
//         label: 'Complete',
//         key: 'complete',
//         detail: '完成 commit 的编写'
//     },
//     {
//         label: 'Select template for commit',
//         key: 'template',
//         detail: '选择提交使用的模板'
//     },
//     {
//         label: 'Back',
//         key: 'back',
//         detail: '返回 commit type 选择页'
//     }
// ];

export const CommitDetailQuickPickOptions: QuickPickOptions = {
    matchOnDescription: true,
    matchOnDetail: true,
    ignoreFocusOut: true,
};
