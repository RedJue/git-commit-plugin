import { workspace, QuickPickItem } from 'vscode';
import * as defaultTemp from './default-temp';

/**
 * @description git commit template 类型
 */
export interface CommitTemplateType extends QuickPickItem {
    label: string;
    detail: string;
	templateName: string;
	templateContent: string;
    /** default template */
    default?:boolean;
}
let CommitTemplate: Array<CommitTemplateType> = new Array<CommitTemplateType>();
const configTemplate = workspace.getConfiguration('GitCommitPlugin').get<Array<CommitTemplateType>>('Templates');
if (Array.isArray(configTemplate)) {
    CommitTemplate = configTemplate.map((item, index) => {
        return {
            label: item.templateName,
            detail: item.templateContent,
            templateName: item.templateName,
            templateContent:item.templateContent,
            default:item.default || false
        };
    });

}
const def:Array<CommitTemplateType> =  Object.values(defaultTemp).map((item)=>({
    label: item.templateName,
    detail: item.templateContent,
    templateName: item.templateName,
    templateContent:item.templateContent,
}));
CommitTemplate = CommitTemplate.concat(def);
export default CommitTemplate;