import express from 'express'
import passwd from 'passwd-linux'

import usersConfig from '../users'

const router = express.Router()
export default router

router.post('/auth', (req, res, next) => {
	const { username, password } = req.body
	if (!username || !password)
		return res.status(400).json('missing username or password').end()

	const users: { [key: string]: string } = usersConfig
	const systemUsers = Object.keys(users)

	if (systemUsers.includes(username) && users[username] === password) {
		req.session.username = username
		req.session.password = password

		return res.json(true).end()
	} else {
		return res.status(401).json('invalid username or password').end()
	}
})

router.delete('/auth', (req, res) => {
	req.session.destroy(() => {
		res.json(true).end()
	})
})
