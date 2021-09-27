<h1 align="center">Add Badges</h1>
<p>
  <strong>
    Automatically add badges to <code>README.md</code> for your repository
  </strong>
</p>

<!-- [START BADGES] -->
<!-- [END BADGES] -->

## Usage

Create a workflow file such as `.github/workflows/add-badges.yml` in your repository:

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
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          badges: |
            [
              {

              },
              {

              },
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
| `opening_comment` | The comment to match the start line of badges section | `'<!-- [START BADGES] -->'` |
| `closing_comment` | The comment to match the end line of badges section | `'<!-- [END BADGES] -->'` |

## Examples

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
