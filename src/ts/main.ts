import { DarkModeSetting } from './Setting/DarkModeSetting.js'

const { BUILD_ENV, BUILD_VERSION } = process.env
console.debug(BUILD_ENV === 'production' ? { BUILD_VERSION } : process.env)

new DarkModeSetting().followUserPreference()
