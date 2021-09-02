# Git Workflow

## Table of Contents

- [Git Workflow](#git-workflow)
  - [Table of Contents](#table-of-contents)
    - [Workflow for Pull Requests](#workflow-for-pull-requests)
    - [Testing](#testing)
    - [Setting up project locally](#setting-up-project-locally)

Please always open a separate issue for each problem. In particular, do
not add your bugs to closed issues. They may looks similar to you but
often are completely different from the maintainer's point of view.

### Workflow for Pull Requests

We love to get pull requests from you. We operate the "Fork & Pull" model
explained at [link](https://help.github.com/articles/using-pull-requests)

You should fork the project into your own repo, create a *topic/issue* branch from *dev* branch (already created)
there and then make one or more pull requests back to the upstream repository into the dev branch, always make sure your created branch is up to date with *dev* branch.

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

### Testing

Before submitting a pull request if you're up to the task create test cases and make sure that the tests pass using :)[pytest](https://github.com/pytest-dev/pytest).

### Setting up project locally
Kindly check [here](README.md)
