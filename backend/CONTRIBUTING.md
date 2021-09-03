# Git Workflow

## Table of Contents

- [Git Workflow](#git-workflow)
  - [Table of Contents](#table-of-contents)
    - [Workflow for Pull Requests](#workflow-for-pull-requests)
    - [Contribution Guidelines](#contribution-guidelines)
  - [Forking](#forking)
    - [Cloning](#cloning)
    - [Change to project directory](#change-to-project-directory)
    - [Set Upstream Remote](#set-upstream-remote)
    - [Checkout Dev Branch](#checkout-dev-branch)
    - [Checkout Your Feature Branch](#checkout-your-feature-branch)
    - [Setup Development Environment](#setup-development-environment)
  - [When You Have Fixed The Issue](#when-you-have-fixed-the-issue)
    - [Check status of files to be committed](#check-status-of-files-to-be-committed)
    - [Stage changes for commit](#stage-changes-for-commit)
    - [Commit staged changes](#commit-staged-changes)
    - [Pull Update from Remote](#pull-update-from-remote)
    - [Push Local Changes to origin](#push-local-changes-to-origin)
    - [Make PR](#make-pr)
  - [Testing](#testing)
    - [Setting up project locally](#setting-up-project-locally)

Please always open a separate issue for each problem. In particular, do
not add your bugs to closed issues. They may looks similar to you but
often are completely different from the maintainer's point of view.

### Workflow for Pull Requests

We love to get pull requests from you. We operate the "Fork & Pull" model
explained at [link](https://help.github.com/articles/using-pull-requests)

You should fork the project into your own repo then checkout to *dev* branch `git checkout dev`, create a *topic/issue* branch from *dev* branch (already created)
there and then make one or more pull requests back to the upstream repository into the *dev* branch, always make sure your created branch is up to date with *dev* branch.

Your pull requests will then be reviewed and discussed. Please be aware
that you are responsible for your pull requests. You should be prepared
to get change requests because as the maintainers we have to make sure
that your contribution fits well with the rest of the code. Please make
sure that you have time to react to these comments and amend the code or
engage in a conversion. Do not expect that others will pick up your code,
it will almost never happen.

Please open a separate pull request for each issue you want to address.
Don't mix multiple changes. In particular, don't mix style cleanups with
feature pull requests. If you plan to make larger changes, please open
an issue first or comment on the appropriate issue already existing so
that duplicate work can be avoided.

### Contribution Guidelines

Guidelines for contributing to this project. Must be strictly followed by all team members.
This will guide you from cloning this repository to pushing your contributions.

## Forking

Fork this repository to get a personal copy on your github account

### Cloning

To clone the forked repository to your local machine, open command prompt and run:

  git clone https://github.com/your-account-name/zc_plugin_channels

### Change to project directory

Change to the project directory you just cloned

  cd zc_plugin_channels

### Set Upstream Remote

To set upstream remote so you can pull changes from upstream to update your repo run:

  git remote add upstream https://github.com/zurichat/zc_plugin_channels

### Checkout Dev Branch

Checkout *dev* branch by running

  git checkout dev

### Checkout Your Feature Branch

Feature Branching Workflow means you create a new branch for every feature or issue you are working on.
It is goood practice for the branch name to end with the issue id.
So if an issue id is **#5** and issue title is **Update ReadMe.md** then our branch name would be **update-readme-#5**.
create and checkout feature branch by running:

  git checkout -b issue-name-id

### Setup Development Environment

see [README.md](README.md)

## When You Have Fixed The Issue

When you have finished making changes perform the following to commit your code:

### Check status of files to be committed

  git status

### Stage changes for commit

  git add --all

### Commit staged changes

  git commit -m "descriptive commit message"

### Pull Update from Remote

Pull latest update from the upstream remote repo by running:

  git pull upstream dev

### Push Local Changes to origin

Push your new fix or feature to the origin remote branch of your feature.
If your feature branch title is **update-readme-#5** then run:

  git push origin update-readme-#5

### Make PR

Goto your github account and make a **Pull Request** to merge your changes to upstream.

## Testing

Before submitting a pull request if you're up to the task create test cases and make sure that the tests pass using [pytest](https://github.com/pytest-dev/pytest).

### Setting up project locally

Kindly check [here](README.md)

Goodluck :)
