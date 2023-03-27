import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from './octokit'
import { Badge } from './badge'
import { Inputs } from './inputs'

async function getContent(octokit: Octokit, path: string, ref: string) {
  try {
    return await octokit.rest.repos.getContent({
      ...github.context.repo,
      path,
      ref,
    })
  } catch (e) {
    return null
  }
}

function detect(
  lines: string[],
  openingComment: string,
  closingComment: string,
) {
  let startIndex = -1
  let endIndex = -1
  let hasStart = false
  let hasEnd = false

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (!hasStart && line.includes(openingComment)) {
      startIndex = i
      hasStart = true
    } else if (!hasEnd && line.includes(closingComment)) {
      endIndex = i
      hasEnd = true
    }
    if (hasStart && hasEnd) {
      break
    }
  }

  return {
    hasStart,
    hasEnd,
    startIndex,
    endIndex,
  }
}

export async function run() {
  try {
    const options = Inputs.get()
    const badges = Badge.parse(options.badges)

    core.debug(JSON.stringify(options, null, 2))

    const octokit = Octokit.get()
    const res = await getContent(octokit, options.path, options.ref)

    if (res == null) {
      core.setFailed(
        `Should specify a valid file path, check the input of "path"`,
      )
      return
    }

    const oldContent = Buffer.from(
      (res.data as any).content,
      'base64',
    ).toString()

    const lines = oldContent.split('\n')
    const detection = detect(
      lines,
      options.openingComment,
      options.closingComment,
    )

    if (!detection.hasStart) {
      core.setFailed(
        `The opening comment "${options.openingComment}" not found in the target file`,
      )
      return
    }

    if (!detection.hasEnd) {
      core.setFailed(
        `The closing comment "${options.closingComment}" not found in the target file`,
      )
      return
    }

    core.debug(JSON.stringify(detection, null, 2))

    const { startIndex, endIndex } = detection
    const dropCount = endIndex - startIndex + 1
    const rendered = Badge.render(badges, options.center)

    lines.splice(
      startIndex,
      dropCount,
      options.openingComment,
      '<!-- Please keep comment here to allow auto update -->',
      rendered,
      options.closingComment,
    )

    const content = lines.join('\n')

    if (oldContent !== content) {
      await octokit.rest.repos.createOrUpdateFileContents({
        ...github.context.repo,
        path: options.path,
        branch: options.ref,
        content: Buffer.from(content).toString('base64'),
        message: options.commitMessage,
        committer: {
          name: options.committerName,
          email: options.committerEmail,
        },
        sha: res ? (res.data as any).sha : undefined,
      })
      core.info(`Badges updated`)
    } else {
      core.info(`Badges are not changed, no need to update`)
    }
  } catch (e) {
    core.setFailed(e)
  }
}
