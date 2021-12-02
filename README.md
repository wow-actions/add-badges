<h1 align="center">Add Badges</h1>
<p align="center">
  <strong>
    Automatically add badges from <a href="https://shields.io">shield.io</a> to <code>README.md</code> for your repository
  </strong>
</p>

<!-- [START BADGES] -->
<!-- Please keep comment here to allow auto update -->
<p align="center">
  <a href="https://github.com/wow-actions/add-badges/blob/master/LICENSE"><img src="https://img.shields.io/github/license/wow-actions/add-badges?style=flat-square" alt="MIT License" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square" alt="Language" /></a>
  <a href="https://github.com/wow-actions/add-badges/pulls"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
  <a href="https://github.com/marketplace/actions/add-badges"><img src="https://img.shields.io/static/v1?label=&labelColor=505050&message=marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" alt="website" /></a>
  <a href="https://github.com/wow-actions/add-badges/actions/workflows/release.yml"><img src="https://img.shields.io/github/workflow/status/wow-actions/add-badges/Release/master?logo=github&style=flat-square" alt="build" /></a>
  <a href="https://lgtm.com/projects/g/wow-actions/add-badges/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/g/wow-actions/add-badges.svg?logo=lgtm&style=flat-square" alt="Language grade: JavaScript" /></a>
</p>
<!-- [END BADGES] -->

## Usage

1. Specify the location of badges in your `README.md` file by adding some comments:

```md
<!-- [START BADGES] -->
<!-- [END BADGES] -->
```

2. Create a workflow file such as `.github/workflows/add-badges.yml` in your repository.

<!-- [START BADGES 1] -->
<!-- Please keep comment here to allow auto update -->

[![MIT License](https://img.shields.io/github/license/wow-actions/add-badges?style=flat-square)](https://github.com/wow-actions/add-badges/blob/master/LICENSE) [![Language](https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org) [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](https://github.com/wow-actions/add-badges/pulls) [![website](https://img.shields.io/static/v1?label=&labelColor=505050&message=marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6)](https://github.com/marketplace/actions/add-badges) [![build](https://img.shields.io/github/workflow/status/wow-actions/add-badges/Release/master?logo=github&style=flat-square)](https://github.com/wow-actions/add-badges/actions/workflows/release.yml) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/wow-actions/add-badges.svg?logo=lgtm&style=flat-square)](https://lgtm.com/projects/g/wow-actions/add-badges/context:javascript)

<!-- [END BADGES 1] -->

```yml
name: Add Badges
on:
  push:
    branches:
      - master
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/add-badges@v1
        env:
          repo_url: ${{ github.event.repository.html_url }}
          repo_name: ${{ github.event.repository.name }}
          repo_owner: ${{ github.event.repository.owner.login }}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          badges: |
            [
              {
                "badge": "https://img.shields.io/github/license/${{ env.repo_owner }}/${{ env.repo_name }}?style=flat-square",
                "alt": "MIT License",
                "link": "${{ env.repo_url }}/blob/master/LICENSE"
              },
              {
                "badge": "https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square",
                "alt": "Language",
                "link": "https://www.typescriptlang.org"
              },
              {
                "badge": "https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square",
                "alt": "PRs Welcome",
                "link": "${{ env.repo_url }}/pulls"
              },
              {
                "badge": "https://img.shields.io/static/v1?label=&labelColor=505050&message=marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6",
                "alt": "website",
                "link": "https://github.com/marketplace/actions/${{ env.repo_name }}"
              },
              {
                "badge": "https://img.shields.io/github/workflow/status/${{ env.repo_owner }}/${{ env.repo_name }}/Release/master?logo=github&style=flat-square",
                "alt": "build",
                "link": "${{ env.repo_url }}/actions/workflows/release.yml"
              },
              {
                "badge": "https://img.shields.io/lgtm/grade/javascript/g/${{ env.repo_owner }}/${{ env.repo_name }}.svg?logo=lgtm&style=flat-square",
                "alt": "Language grade: JavaScript",
                "link": "https://lgtm.com/projects/g/${{ env.repo_owner }}/${{ env.repo_name }}/context:javascript"
              }
            ]
```

We also can add multi-line badges with nested array.

<!-- [START BADGES 2] -->
<!-- Please keep comment here to allow auto update -->
<p align="center">
  <a href="https://github.com/wow-actions/add-badges/blob/master/LICENSE"><img src="https://img.shields.io/github/license/wow-actions/add-badges?style=flat-square" alt="MIT License" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square" alt="Language" /></a>
  <a href="https://github.com/wow-actions/add-badges/pulls"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
  <a href="https://github.com/marketplace/actions/add-badges"><img src="https://img.shields.io/static/v1?label=&labelColor=505050&message=marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" alt="website" /></a>
</p>

<p align="center">
  <a href="https://github.com/wow-actions/add-badges/actions/workflows/release.yml"><img src="https://img.shields.io/github/workflow/status/wow-actions/add-badges/Release/master?logo=github&style=flat-square" alt="build" /></a>
  <a href="https://lgtm.com/projects/g/wow-actions/add-badges/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/g/wow-actions/add-badges.svg?logo=lgtm&style=flat-square" alt="Language grade: JavaScript" /></a>
</p>
<!-- [END BADGES 2] -->

```yml
name: Add Badges
on:
  push:
    branches:
      - master
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/add-badges@v1
        env:
          repo_url: ${{ github.event.repository.html_url }}
          repo_name: ${{ github.event.repository.name }}
          repo_owner: ${{ github.event.repository.owner.login }}
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          center: true
          badges: |
            [
              [
                {
                  "badge": "https://img.shields.io/github/license/${{ env.repo_owner }}/${{ env.repo_name }}?style=flat-square",
                  "alt": "MIT License",
                  "link": "${{ env.repo_url }}/blob/master/LICENSE"
                },
                {
                  "badge": "https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square",
                  "alt": "Language",
                  "link": "https://www.typescriptlang.org"
                },
                {
                  "badge": "https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square",
                  "alt": "PRs Welcome",
                  "link": "${{ env.repo_url }}/pulls"
                },
                {
                  "badge": "https://img.shields.io/static/v1?label=&labelColor=505050&message=marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6",
                  "alt": "website",
                  "link": "https://github.com/marketplace/actions/${{ env.repo_name }}"
                }
              ],
              [
                {
                  "badge": "https://img.shields.io/github/workflow/status/${{ env.repo_owner }}/${{ env.repo_name }}/Release/master?logo=github&style=flat-square",
                  "alt": "build",
                  "link": "${{ env.repo_url }}/actions/workflows/release.yml"
                },
                {
                  "badge": "https://img.shields.io/lgtm/grade/javascript/g/${{ env.repo_owner }}/${{ env.repo_name }}.svg?logo=lgtm&style=flat-square",
                  "alt": "Language grade: JavaScript",
                  "link": "https://lgtm.com/projects/g/${{ env.repo_owner }}/${{ env.repo_name }}/context:javascript"
                }
              ]
            ]
```

## Inputs

Various inputs are defined to let you configure the action:

> Note: [Workflow command and parameter names are not case-sensitive](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#about-workflow-commands).

| Name | Description | Default |
| --- | --- | --- |
| `GITHUB_TOKEN` | The GitHub token for authentication | N/A |
| `badges` | Badges to add | N/A |
| `path` | The file path to add badges | `'README.md'` |
| `center` | Should center align the badges or not | `false` |
| `commit_message` | Commit message | `'docs: add badges [skip ci]'` |
| `committer_name` | The name of the author or committer of the commit. | `'github-actions[bot]'` |
| `committer_email` | The email of the author or committer of the commit. | `'github-actions[bot]@users.noreply.github.com'` |
| `opening_comment` | The comment to match the start line of badges section | `'<!-- [START BADGES] -->'` |
| `closing_comment` | The comment to match the end line of badges section | `'<!-- [END BADGES] -->'` |

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
