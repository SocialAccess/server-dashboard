export default [
	'nuxt-session',
	(session) => {
		const FileStore = require('session-file-store')(session)
		return {
			secret: 'super-secret-key',
			resave: false,
			saveUninitialized: false,
			//cookie: { maxAge: 60000 },
			store: new FileStore({
				path: './.sessions',
			}),
		}
	},
]
