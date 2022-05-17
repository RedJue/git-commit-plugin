# Git Commit Plugin For VS Code
> Automatically generate git commit messages

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/redjue.git-commit-plugin)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/redjue.git-commit-plugin)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/redjue.git-commit-plugin)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/redjue.git-commit-plugin)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/redjue.git-commit-plugin)
![GitHub contributors](https://img.shields.io/github/contributors/RedJue/git-commit-plugin)
![GitHub last commit](https://img.shields.io/github/last-commit/RedJue/git-commit-plugin)
![GitHub](https://img.shields.io/github/license/RedJue/git-commit-plugin?color=green)


## Requirements

- VS Code `1.42.0` or higher.
- VS Code's built-in Git plugin 

## Format

This extension follows the [Angular Team Commit Specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines), as follows:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

See info on the fields below.

### Type

Must be one of the following:

Type | Description
---  | ---
**feat** | A new feature
**fix** | A bug fix
**docs** | Documentation only changes
**style**: | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
**refactor** | A code change that neither fixes a bug nor adds a feature
**perf** | A code change that improves performance
**test** | Adding missing or correcting existing tests
**chore** | Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope could be anything specifying place of the commit change. For example `$location`, `$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

You can use `*` when the change affects more than a single scope.

### Subject

The subject contains succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize first letter
-   no dot (`.`) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to [reference GitHub issues that this commit closes](https://help.github.com/articles/closing-issues-via-commit-messages/).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

## Quick Start

1. Install the plugin
1. Use the command shortcut `showGitCommit` to open the command window or Click the icon on the git plugin navigation bar
    ![open](/assets/open.gif)
1. Enter the commit information, which automatically generates a commit message that conforms to the specification
    ![edit](/assets/edit.gif)

## Locale Support
The plugin will automatically switch the language description based on the `vscode` language environment.

**Support Language**
- en-US as default
- zh-CN
- ja-JP

## Settings Options

-   `GitCommitPlugin.ShowEmoji`: whether to show emoji, default `true`.
    ```json
    {
      "GitCommitPlugin.ShowEmoji": true
    }
    ```
-   `GitCommitPlugin.CustomCommitType`: customize the commit type, default `null`.
    ```json5
    { 
      "GitCommitPlugin.CustomCommitType": [
        "customTypeName"
      ]
    }
    ```
    or
    ```json5
    [
       {
           // If there are duplicate keys, rewrite the config，otherwise add As a new configuration addition
           "key": "customTypeKey", 
           "label": "customTypeName",
           "detail": "customTypeDetail",
           "icon":"customIcon"
       }
    ]
    ```
-   `GitCommitPlugin.MaxSubjectWords`: customize the maximum number of words on the subject, default `20`.
    ```json
    {
      "GitCommitPlugin.MaxSubjectWords": 20
    }
    ```
-   `GitCommitPlugin.Template`: customize the git commit template.
    ```json5
    {
      "GitCommitPlugin.Templates": [
        {
            "templateName": "Angular",
            "templateContent": "<icon><space><type>(<scope>):<space><subject><enter><body><enter><footer>"
        },
        {
            "templateName": "git-cz",
            "templateContent": "<type>(<scope>):<space><icon><space><subject><enter><body><enter><footer>",
             // Set as default commit template
            "default":true
        }
      ]
    }
    ```

## License

Released under [MIT](/LICENSE) by [@RedJue](https://github.com/RedJue).
