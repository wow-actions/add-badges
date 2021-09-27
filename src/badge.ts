import * as core from '@actions/core'
import * as github from '@actions/github'
import mustache from 'mustache'

interface Badge {
  badge: string
  link?: string
  alt?: string
}

export namespace Badge {
  export function parse(raw: string) {
    const groups: Badge[][] = []
    const insert = (group: any) => {
      if (Array.isArray(group)) {
        const badges: Badge[] = []
        group.forEach((item) => {
          if (typeof item === 'object') {
            const badge = item as Badge
            if (badge.badge) {
              badges.push(badge)
            }
          }
        })
        if (badges.length) {
          groups.push(badges)
        }
      }
    }

    try {
      const input = JSON.parse(raw)
      if (Array.isArray(input)) {
        if (Array.isArray(input[0])) {
          input.forEach(insert)
        } else {
          insert(input)
        }
      }
    } catch (error) {
      core.setFailed(
        `Should specipy a valid JSON string for the input of "badges"`,
      )
      throw error
    }

    return groups
  }

  export function render(groups: Badge[][], center?: boolean) {
    const renderLine = (item: Badge) => {
      const img = center
        ? `<img src="${item.badge}" alt="${item.alt || ''}" />`
        : `![${item.alt}](${item.badge})`

      const line = item.link
        ? center
          ? `<a href="${item.link}">${img}</a>`
          : `[${img}](${item.link})`
        : img

      return mustache.render(line, github.context)
    }

    return groups
      .map((badges) => {
        const lines = badges.map((item) => renderLine(item))
        return center
          ? `<p align="center">\n  ${lines.join('\n  ')}\n</p>`
          : lines.join('\n')
      })
      .join('\n\n')
  }
}
