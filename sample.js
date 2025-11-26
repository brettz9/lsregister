import * as lsregister from './src/index.js'

;(async () => {
try {
  const result = await lsregister.dump()
  console.log('result', result)
} catch (err) {
  console.log('er', err)
}
})()
