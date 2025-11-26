#!/usr/bin/env node

import * as lsregister from '../index.js'

lsregister.dump()
  .then(data => {
      process.stdout.write(JSON.stringify(data, null, 2))
  })
  .catch(e => console.error(e))
