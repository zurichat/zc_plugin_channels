# Git Workflow

## Table of Contents

- [Git Workflow](#git-workflow)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Issues](#issues)
  - [Branching](#branching)
  - [Committing](#committing)
    - [Commit Message Header](#commit-message-header)
      - [Type](#type)
      - [Scope](#scope)
  - [Merging](#merging)
  - [Workflow](#workflow)

## Introduction

This document describes the workflow, conventions, and best practices we use concerning to Git in [this project](https://gitlab.com/synapse-analytics/konan/backend/konan-backend).

## Issues

Defining new issue can inspire from fixing already implemented story, or planning for new feature and mostly told in a meeting.

- How to add new issue ?
  - Open issue tab in repo side bar.
  - Click on new issue button.
  - Fill the new issue form:
      1. Issue title separated by "-".
      2. Issue description.
      3. Assignee who associated to solve the issue.
  - Issue is created and got an issue ID that used in next flow.

## Branching

- `` `master` `` is the branch that gets deployed to production so it should be in a production-ready state.
- `` `develop` `` is the branch that staged the version of implemented features. # To be determined

Branch name

- Every change, whether it's a new feature, bug fix, or spelling correction should developed in separate branch.
- Branch names should start with issue id that it's responsible to solve which helps in mapping branch with issue and make workflow easier with merge requests later, then be lower-case and use hyphens to separate words.

>Recommended:

    79-update-app-dependency-packages
    114-fix-row-validation-error

>Not Recommended:

    53-update (not descriptive)
    131_fix_syncing_raw_data_error (uses underscores instead of hyphens)
    adding-new-api-token (miss issue ID)

## Committing

A commit should contain one conceptual change to code which makes commit easily to describe and review in the same time more easier in reverting case.

<a name="commit-header"></a>

### Commit Message Header

    <type>(<scope>): <short summary>
      │       │             │
      │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
      │       │
      │       └─⫸ Commit Scope:  local|ci|django|config|users|application|candidate|
                                  company|job|message|organization|pipeline|recruiter|search
      │
      └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

#### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- `local`
- `ci`
- `django`
- `config`
- `users`

for now, will include as we go on

For more info check [Angular contributing guide](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)

## Merging

- Merge requests happen when feature developing is done and need to be merged to target branch happened by filling merge request form following these steps:

    1. Choose the target branch, mostly ```develop``` unless you working on hot fix which should be merged to ```master``` directly.
    2. Merge request title will be by default " Resolve <issue_title> "
    3. Merge request description content by default " Closes #issue_id" that close issue after accepting the request, you can write more description in this field and assign more issues to be closed.
    4. Assign the merge request to the person who is associated to review it.
    5. Set merge request labels
    6. Finally submit the merge request

- Make sure the all tests pass before pushing because the merge request can't be approved with failed tests, the CI/CD pipeline checks the tests with every push to remote branch.

- Once merge request is reviewed you will be notified if merge request is approved or be mentioned with comments that have to solve comments and push changes.

## Workflow

Here is the simplest development workflow you should use:

1. Get the latest version of ```develop```.

         git pull develop

2. Make a new branch off of ```develop```.

         git checkout -b {BRANCH_NAME}

   name the branch with the convention described above.
3. Implement your changes, pass tests, pushing your commits along the way

         git commit
         git push -u origin branch_name # for the first time, then:
         git push

   You should push early and often to ensure that the most up to date code is on repo. That can mean pushing some of commits, or pushing every time you stop a work session. At the bare minimum, push before you stop for the day.
   If you are developing over a long time, and ```develop``` is changing, you should merge ```develop``` into your branch often to make sure it stays up to date. This will reduce merge conflicts when you finally rebase your branch onto ```develop```.

         git rebase --interactive origin/develop

4. When you are ready to start having your code reviewed, open a merge request and assign it to a reviewer.
As a reviewer, use comments to communicate your feedback on the merge request and mention the requester to resolve comments.
As a requester, make changes based on the reviewer's comments. Once you have addressed the comments make sure you checked resolve mark to notify the reviewer automatically after resolving the comments to review them again. Repeat this until the reviewer no longer has comments.

5. Finally, once the merge request is approved the reviewer have to merge your branch into ```develop```, then delete feature branch.
