import { workspace, QuickPickItem } from 'vscode';

/**
 * @description git commit 提交类型
 */
export interface CommitType extends QuickPickItem {}
//是否展现 Emoji图标 show Emoji or not
const isShowEmoji = workspace.getConfiguration('GitCommitPlugin').get<boolean>('ShowEmoji');
//新增的自定义commit type add custom Commit Type
const CustomCommitType = workspace.getConfiguration('GitCommitPlugin').get<boolean>('CustomCommitType');
let CommitType: Array<CommitType> = [
    {
        label: '✨feat',
        detail: '添加新特性'
    },
    {
        label: '🐞fix',
        detail: '修复bug'
    },
    {
        label: '📃docs',
        detail: '仅仅修改文档'
    },
    {
        label: '🌈style',
        detail: '仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑'
    },
    {
        label: '🦄refactor',
        detail: '代码重构，没有加新功能或者修复bug'
    },
    {
        label: '🎈pref',
        detail: '优化相关，比如提升性能、体验'
    },
    {
        label: '🧪test',
        detail: '增加测试用例'
    },
    {
        label: '🔧build',
        detail: '依赖相关的内容'
    },
    {
        label: '🐎ci',
        detail: 'ci配置相关 例如对 k8s，docker的配置文件的修改'
    },
    {
        label: '🐳chore',
        detail: '改变构建流程、或者增加依赖库、工具等'
    },
    {
        label: '↩revert',
        detail: '回滚到上一个版本'
    }
];

if (!isShowEmoji) {
    CommitType = CommitType.map((commitType) => {
        const labelArr = [...commitType.label];
        labelArr.shift();
        commitType.label = labelArr.join('');
        return commitType;
    });
}
if (Array.isArray(CustomCommitType)) {
    const costom_commit_type: Array<CommitType> = CustomCommitType.map((item, index) => {
        return {
            label: item,
            detail: item
        };
    });
    CommitType = CommitType.concat(costom_commit_type);
}
export default CommitType;
