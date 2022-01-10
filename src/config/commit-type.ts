import { workspace, QuickPickItem } from 'vscode';
import { localize } from 'vscode-nls-i18n';

/**
 * @description git commit 提交类型
 */
export interface CommitType extends QuickPickItem {
    icon?: string;
    key?: string;
}
//是否展现 Emoji图标 show Emoji or not
const isShowEmoji = workspace
    .getConfiguration('GitCommitPlugin')
    .get<boolean>('ShowEmoji');
//新增的自定义commit type add custom Commit Type
const CustomCommitType = workspace
    .getConfiguration('GitCommitPlugin')
    .get<boolean>('CustomCommitType');

export default function GetCommitTypes() {
    let CommitType: Array<CommitType> = [
        {
            label: 'init',
            key: 'init',
            detail: localize('extension.commitType.init.detail'),
            icon: '🎉',
        },
        {
            label: 'feat',
            key: 'feat',
            detail: localize('extension.commitType.feat.detail'),
            icon: '✨',
        },
        {
            label: 'fix',
            key: 'fix',
            detail: localize('extension.commitType.fix.detail'),
            icon: '🐞',
        },
        {
            label: 'docs',
            key: 'docs',
            detail: localize('extension.commitType.docs.detail'),
            icon: '📃',
        },
        {
            label: 'style',
            key: 'style',
            detail: localize('extension.commitType.style.detail'),
            icon: '🌈',
        },
        {
            label: 'refactor',
            key: 'refactor',
            detail: localize('extension.commitType.refactor.detail'),
            icon: '🦄',
        },
        {
            label: 'perf',
            key: 'perf',
            detail: localize('extension.commitType.perf.detail'),
            icon: '🎈',
        },
        {
            label: 'test',
            key: 'test',
            detail: localize('extension.commitType.test.detail'),
            icon: '🧪',
        },
        {
            label: 'build',
            key: 'build',
            detail: localize('extension.commitType.build.detail'),
            icon: '🔧',
        },
        {
            label: 'ci',
            key: 'ci',
            detail: localize('extension.commitType.ci.detail'),
            icon: '🐎',
        },
        {
            label: 'chore',
            key: 'chore',
            detail: localize('extension.commitType.chore.detail'),
            icon: '🐳',
        },
        {
            label: 'revert',
            key: 'revert',
            detail: localize('extension.commitType.revert.detail'),
            icon: '↩',
        },
    ];

    if (Array.isArray(CustomCommitType)) {
        CustomCommitType.forEach(item => {
            let label = '',
                icon = '',
                detail = '';
            if (typeof item === 'string') {
                label = detail = item;
            }
            const resultType = {
                label,
                icon,
                detail,
            };
            if (Object.prototype.toString.call(item) === '[object Object]') {
                if (Reflect.has(item, 'label')) {
                    resultType.label = item.label;
                } else {
                    Reflect.deleteProperty(resultType, 'label');
                }
                if (Reflect.has(item, 'detail')) {
                    resultType.detail = item.detail;
                } else {
                    Reflect.deleteProperty(resultType, 'detail');
                }
                if (Reflect.has(item, 'icon')) {
                    resultType.icon = item.icon;
                } else {
                    Reflect.deleteProperty(resultType, 'icon');
                }
            }

            const target = CommitType.find(
                type =>
                    typeof item.key === 'string' &&
                    item.key.length > 0 &&
                    type.key === item.key,
            );

            if (target !== undefined) {
                Object.assign(target, resultType);
            } else {
                CommitType.unshift(resultType);
            }
        });
    }
    if (!isShowEmoji) {
        CommitType.forEach(commitType => {
            commitType.icon = '';
        });
    }

    if (isShowEmoji) {
        CommitType.forEach(item => {
            // If there is an icon display
            if (typeof item.icon === 'string' && item.icon.length > 0) {
                item.label = `${item.icon} ${item.label}`;
            }
        });
    }

    return CommitType;
}
