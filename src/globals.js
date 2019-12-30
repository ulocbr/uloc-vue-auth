import {version} from '../package.json'
import config from './config'
import {http} from './lib/http'

const globals = {
  logged: false,
  version,
  config,
  http
}

export default globals
