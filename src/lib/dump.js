import {execFile as exec} from 'node:child_process'
import binary from './defaultPath.js'
import parse from './parser.js'

const dump = () => {
  return new Promise((resolve, reject) => {
    // @ts-expect-error other exec options are optional
    exec(
      binary,
      ['-dump'],
      { maxBuffer: 102400*102400 },
      /**
       * @param {Error} error
       * @param {string} stdout
       * @param {string} stderr
       */
      (error, stdout, stderr) => {
        if (error) reject(error)
        if (stderr) reject(stderr)
        resolve(parse(stdout.trim()))
      }
    )
  })
}

export {dump}
