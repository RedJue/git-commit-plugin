import { workspace, QuickPickItem } from 'vscode';

/**
 * @description git commit 提交类型
 */
export interface CommitType extends QuickPickItem {
    icon?: string;
    key?:string;
}
//是否展现 Emoji图标 show Emoji or not
const isShowEmoji = workspace.getConfiguration('GitCommitPlugin').get<boolean>('ShowEmoji');
//新增的自定义commit type add custom Commit Type
const CustomCommitType = workspace.getConfiguration('GitCommitPlugin').get<boolean>('CustomCommitType');

let CommitType: Array<CommitType> = [
    {
        label: 'feat',
        key: 'feat',
        detail: '添加新特性',
        icon: '✨'
    },
    {
        label: 'fix',
        key: 'fix',
        detail: '修复bug',
        icon: '🐞'
    },
    {
        label: 'docs',
        key: 'docs',
        detail: '仅仅修改文档',
        icon: '📃'
    },
    {
        label: 'style',
        key: 'style',
        detail: '仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑',
        icon: '🌈'
    },
    {
        label: 'refactor',
        key: 'refactor',
        detail: '代码重构，没有加新功能或者修复bug',
        icon: '🦄'
    },
    {
        label: 'perf',
        key: 'perf',
        detail: '优化相关，比如提升性能、体验',
        icon: '🎈'
    },
    {
        label: 'test',
        key: 'test',
        detail: '增加测试用例',
        icon: '🧪'
    },
    {
        label: 'build',
        key: 'build',
        detail: '依赖相关的内容',
        icon: '🔧'
    },
    {
        label: 'ci',
        key: 'ci',
        detail: 'ci配置相关 例如对 k8s，docker的配置文件的修改',
        icon: '🐎'
    },
    {
        label: 'chore',
        key: 'chore',
        detail: '改变构建流程、或者增加依赖库、工具等',
        icon: '🐳'
    },
    {
        label: 'revert',
        key: 'revert',
        detail: '回滚到上一个版本',
        icon: '↩'
    }
];

if (Array.isArray(CustomCommitType)) {
    CustomCommitType.forEach((item) => {
        let label = '',icon='',detail = '';
        if (typeof item === 'string') {
            label = detail = item;
        }
        const resultType = {
            label,
            icon,
            detail
        };
        if (Object.prototype.toString.call(item) === '[object Object]') {
            if(Reflect.has(item, 'label')){resultType.label = item.label;}else{Reflect.deleteProperty(resultType,'label');};
            if(Reflect.has(item, 'detail')){resultType.detail = item.detail;}else{Reflect.deleteProperty(resultType,'detail');};
            if(Reflect.has(item, 'icon')){resultType.icon = item.icon;}else{Reflect.deleteProperty(resultType,'icon');};
        }
        const target = CommitType.find((type)=>type.key === item.key);
       
        if(target !== undefined){
            Object.assign(target,resultType);
        }else{
            CommitType.unshift(resultType);
        }
    });
}
if (!isShowEmoji) {
    CommitType = CommitType.map((commitType) => {
        commitType.icon = '';
        return commitType;
    });
}

if(isShowEmoji){
    CommitType.forEach((item)=>{
        // If there is an icon display
        if(typeof item.icon === 'string' && item.icon.length > 0){        
            item.label = `${item.icon} ${item.label}`;
        }
    });
}
  

export default CommitType;
