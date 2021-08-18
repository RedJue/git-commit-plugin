import { workspace, QuickPickItem } from 'vscode';

/**
 * @description git commit 提交类型
 */
export interface CommitType extends QuickPickItem {
    title: string;
    icon: string;
}

//新增的自定义commit type add custom Commit Type
const CustomCommitType = workspace.getConfiguration('GitCommitPlugin').get<boolean>('CustomCommitType');
let CommitType: Array<CommitType> = [
    {
        label: '✨ feat',
        title: 'feat',
        detail: '添加新特性',
        icon:'✨'
    },
    {
        label: '🐞 fix',
        title: 'fix',
        detail: '修复bug',
        icon:'🐞'
    },
    {
        label: '📃  docs',
        title: 'docs',
        detail: '仅仅修改文档',
        icon:'📃'
    },
    {
        label: '🌈 style',
        title: 'style',
        detail: '仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑',
        icon:'🌈'
    },
    {
        label: '🦄 refactor',
        title: 'refactor',
        detail: '代码重构，没有加新功能或者修复bug',
        icon:'🦄'
    },
    {
        label: '🎈 perf',
        title: 'perf',
        detail: '优化相关，比如提升性能、体验',
        icon:'🎈'
    },
    {
        label: '🧪 test',
        title: 'test',
        detail: '增加测试用例',
        icon:'🧪'
    },
    {
        label: '🔧 build',
        title: 'build',
        detail: '依赖相关的内容',
        icon:'🔧'
    },
    {
        label: '🐎 ci',
        title: 'ci',
        detail: 'ci配置相关 例如对 k8s，docker的配置文件的修改',
        icon:'🐎'
    },
    {
        label: '🐳 chore',
        title: 'chore',
        detail: '改变构建流程、或者增加依赖库、工具等',
        icon:'🐳'
    },
    {
        label: '↩revert',
        title: '↩revert',
        detail: '回滚到上一个版本',
        icon:''
    }
];

// if (!isShowEmoji) {
//     CommitType = CommitType.map((commitType) => {
//         const labelArr = [...commitType.label];
//         labelArr.shift();
//         commitType.label = labelArr.join('').trim();
//         return commitType;
//     });
// }
if (Array.isArray(CustomCommitType)) {
    const costom_commit_type: Array<CommitType> = CustomCommitType.map((item, index) => {
        let label = '',icon='',detail = '',title='';
        if (typeof item === 'string') {
            title = label = detail = item;
        }
        if (Object.prototype.toString.call(item) === '[object Object]') {
            Reflect.has(item, 'title') && (title = item.title);
            Reflect.has(item, 'label') && (label = item.label+'test');
            Reflect.has(item, 'detail') && (detail = item.detail);
            Reflect.has(item, 'icon') && (icon = item.icon);
        }
        return {
            title,
            label,
            detail,
            icon
        };
    });
    CommitType = costom_commit_type.concat(CommitType);
}
export default CommitType;
