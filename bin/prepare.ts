import { env } from 'node:process'
import install from 'husky'

/* istanbul ignore next */
if (typeof env.CI === 'undefined') install('bin/husky')
