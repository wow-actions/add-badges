import * as core from '@actions/core'

export namespace Inputs {
  export const getArrayInput = (name: string): Array<string> =>
    core
      .getInput(name)
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter((item) => item)

  export function get() {
    const inputs = {
      badges: core.getInput('badges'),
      center: core.getInput('center') === 'true',
      path: core.getInput('path') || 'README.md',
      ref:  core.getInput('ref') || 'master',
      commitMessage:
        core.getInput('commit_message') || 'docs: update badges [skip ci]',
      committerName: core.getInput('committer_name'),
      committerEmail: core.getInput('committer_email'),
      openingComment:
        core.getInput('opening_comment') || '<!-- [START BADGES] -->',
      closingComment:
        core.getInput('closing_comment') || '<!-- [END BADGES] -->',
    }

    if (!inputs.path) {
      throw new Error(
        `Should specify a valid file path, check the input of "path"`,
      )
    }

    return inputs
  }
}
