import bodyParser from 'body-parser'

import api from './api'

export default [bodyParser.json(), api]
