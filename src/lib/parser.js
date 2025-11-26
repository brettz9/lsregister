import {PlistParser} from 'mac-defaults'

const documentDivider = Array(80).fill('-').join('')

/**
 * @param {string} data
 */
const separateDocuments = data => data.split(documentDivider).slice(1)

/**
 * @param {string} str
 */
const separateLines = str => str.split('\n\t')

/**
 * @param {string} data
 */
const normalizeData = data => {
  return (
    data
    .replace(/----------*/g, documentDivider)
    .replace(/displayVersion/g, 'displayVersion:')
    .replace(/\nbundle\tid/g, '\n\tbundle id')
    .replace(/\nContainer/g, 'Container')
    .replace(/\n\t*</g, '<')
  )
}

/**
 * @param {string} str
 */
const normalizeKey = str => {
  return (
    str.slice(0, 1).toLowerCase() +
    str.slice(1)
      .replace(/\s./g, match => match[1].toUpperCase())
      .replace(/-/g, () => '_')
  )
}

/**
 * @param {string} data
 */
const parse = data => {
  const normalizedData = normalizeData(data)
  return (
    separateDocuments(normalizedData)
      .reduce((acc, doc) => {
        return acc.concat([
          separateLines(doc)
            .reduce((obj, line) => {
              const k = normalizeKey(line.slice(0, line.indexOf(':')).trim())
              const v = line.slice(line.indexOf(':') + 1).trim()
              /**
               * @type {Record<string, any>}
               */
              const o = {}
              o[k] = k === 'plistCommon' ? new PlistParser({plist: v}).start() : v;
              if (k.length > 0) {
                return Object.assign(obj, o)
              } else {
                return obj
              }
            }, {})
        ])
      }, /** @type {Record<string, any>[]} */ ([]))
  )
}

export default parse
