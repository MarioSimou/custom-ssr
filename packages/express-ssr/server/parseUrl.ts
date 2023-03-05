import fg from 'fast-glob'
import { getPath } from './getPath'
import type { Maybe } from '@ssr/core'

const calcIsDynamicSegment = (segment: string): [boolean, Maybe<string>] => {
  const [match, identifier] = segment.match(/^\[(.+)\]$/) ?? []
  return [Boolean(match), identifier]
}

const readPagesFiles = async (prefix: string[]): Promise<string[]> => {
  const matchPattern = getPath(...prefix, '**', '*')
  const ignorePatterns = [
    getPath(...prefix, '_entrypoint.(ts|tsx|js|jsx)'),
    getPath(...prefix, '**', 'chunk.js'),
  ]
  return await fg(matchPattern, {
    ignore: ignorePatterns,
    onlyFiles: true,
    unique: true,
  })
}

const mapFilepathsToRoutePatterns = (filepaths: string[]) =>
  filepaths.map(mapFilepathToRoutePattern)

const mapFilepathToRoutePattern = (filepath: string): Maybe<string> => {
  const [_, match] = filepath.match(/.+pages\/\w+(.+).js/) ?? []
  return match
}

type ParseUrlFailure = { success: false; message: string }
type ParseUrlSuccessStatic = {
  success: true
  type: 'static'
  filepath: string
  routePattern: string
}
type ParseUrlSuccessDynamic = {
  success: true
  type: 'dynamic'
  filepath: string
  params: Record<string, string>
  routePattern: string
}
export type ParseUrlResult =
  | ParseUrlFailure
  | ParseUrlSuccessStatic
  | ParseUrlSuccessDynamic

const convertToSegments = (path: string): string[] => {
  const [_, ...segments] = path.split('/')
  return segments
}

export const parseUrl = async (
  url: string,
  prefix: string[] = ['dist', 'pages']
): Promise<ParseUrlResult> => {
  const filepaths = await readPagesFiles(prefix)
  const routePatterns = mapFilepathsToRoutePatterns(filepaths)
  const urlSegments = convertToSegments(url)
  const dynamicParams = {}

  for (let i = 0; i < filepaths.length; i++) {
    const filepath = filepaths[i]
    const routePattern = routePatterns[i] as string
    const routePatternSegments = convertToSegments(routePattern)

    if (routePatternSegments.length !== urlSegments.length) {
      continue
    }

    for (let j = 0; j < routePatternSegments.length; j++) {
      const routePatternSegment = routePatternSegments[j]

      const urlSegment = urlSegments[j]
      const isFinal = j === routePatternSegments.length - 1

      if (!routePatternSegment || !urlSegment) {
        break
      }

      if (routePatternSegment !== urlSegment) {
        const [isDynamicPath, identifier] =
          calcIsDynamicSegment(routePatternSegment)
        if (!isDynamicPath) {
          break
        }

        if (identifier) {
          dynamicParams[identifier] = urlSegment
        }
      }

      if (isFinal) {
        const hasParams = Object.keys(dynamicParams).length > 0
        if (hasParams) {
          return {
            success: true,
            type: 'dynamic',
            filepath,
            params: dynamicParams,
            routePattern,
          }
        }

        return {
          success: true,
          type: 'static',
          filepath,
          routePattern,
        }
      }
    }
  }

  return { success: false, message: 'Route not found' }
}
