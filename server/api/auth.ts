import express from 'express'
import passwd from 'passwd-linux'

const router = express.Router()
export default router

router.post('/auth', (req, res, next) => {
	const { username, password } = req.body
	if (!username || !password)
		return res.status(400).json('missing username or password').end()

	try {
		passwd.checkPassword(username, password, (err: any, authed: any) => {
			if (err || !authed) return res.status(401).end()

			req.session.username = username
			req.session.password = password

			return res.json(true).end()
		})
	} catch (e) {
		return res.status(401).end()
	}
})

router.delete('/auth', (req, res) => {
	req.session.destroy(() => {
		res.json(true).end()
	})
})
