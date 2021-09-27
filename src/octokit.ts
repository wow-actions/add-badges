import * as core from '@actions/core'
import * as github from '@actions/github'

export namespace Octokit {
  export function get() {
    const token = core.getInput('GITHUB_TOKEN', { required: true })
    return github.getOctokit(token)
  }
}

export type Octokit = ReturnType<typeof Octokit.get>
