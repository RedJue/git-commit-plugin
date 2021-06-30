import { workspace, QuickPickItem } from 'vscode';

/**
 * @description git commit template 类型
 */
export interface CommitTemplateType extends QuickPickItem {
    label: string;
    detail: string;
	templateName: string;
	templateContent: string;
}
let CommitTemplate: Array<CommitTemplateType> = new Array<CommitTemplateType>();
const configTemplate = workspace.getConfiguration('GitCommitPlugin').get<Array<CommitTemplateType>>('Templates');
if (Array.isArray(configTemplate)) {
    CommitTemplate = configTemplate.map((item, index) => {
        let templateName = '', label = '', detail = '', templateContent = '';
        return {
            label: item.templateName,
            detail: item.templateContent,
            templateName: item.templateName,
            templateContent:item.templateContent,
        }
    });
}
export default CommitTemplate;