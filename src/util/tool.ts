import { workspace,extensions } from 'vscode';
import { GitExtension } from '../types/git';

//获取是否在git扩展内 Gets whether it is in the git extension
export const  getGitExtension = ()=> {
    const vscodeGit = extensions.getExtension<GitExtension>('vscode.git');
    const gitExtension = vscodeGit && vscodeGit.exports;
    return gitExtension;
};
export const getLocalPluginConfig =(key:string)=>{
    // workspace.fs.readFile('.gitcommitplugin.json')
    const workspaceFolders = workspace.workspaceFolders;
    const gitExtension = getGitExtension();
    let localPluginConfig = workspace.getConfiguration('GitCommitPlugin').get<boolean>(key);
    if(Array.isArray(workspaceFolders)){    
        if(gitExtension !== undefined){
            const target = workspaceFolders.find((item)=>{
                return  gitExtension.getAPI(1).repositories.find(repo => {
                    return repo.rootUri.path === item.uri.path;
                });
            });
           
        }
    }
   
   
    // console.log(workspace.workspaceFolders,'workspace.workspaceFolders');

    return localPluginConfig;
    
};