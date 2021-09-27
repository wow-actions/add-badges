import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from './octokit'
import { Badge } from './badge'
import { Inputs } from './inputs'

async function getContent(octokit: Octokit, path: string) {
  try {
    return await octokit.rest.repos.getContent({
      ...github.context.repo,
      path,
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
  const openingRegex = new RegExp(openingComment)
  const closingRegex = new RegExp(closingComment)

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (!hasStart && openingRegex.test(line)) {
      startIndex = i
      hasStart = true
    } else if (!hasEnd && closingRegex.test(line)) {
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
    const res = await getContent(octokit, options.path)

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

    const { startIndex, endIndex } = detection
    const dropCount = endIndex - startIndex + 1
    const rendered = Badge.render(badges, options.center)
    const content = lines.splice(startIndex, dropCount, rendered).join('\n')

    if (oldContent !== content) {
      await octokit.rest.repos.createOrUpdateFileContents({
        ...github.context.repo,
        path: options.path,
        content: Buffer.from(content).toString('base64'),
        message: options.commitMessage,
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
