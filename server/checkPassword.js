export default function checkPassword(username, password, callback) {
	var fs = require('fs')

	fs.readFile(shadowFile, 'utf-8', function (err, file) {
		if (err) {
			return callback("Error: Can't open shadow file!", null)
		}
		var shadowArray = file.toString().split('\n')
		var passwordHash

		shadowArray.forEach(function (line) {
			var shadowLine = line.split(':')
			if (shadowLine[0] === username) {
				passwordHash = shadowLine[1]
			}
		})

		if (passwordHash) {
			var shadowSplit = passwordHash.split('$')
			var algorithm = shadowSplit[1]
			var passwordSalt = shadowSplit[2]
			if (algorithm === '6') {
				var sha512crypt = require('sha512crypt-node')
				if (sha512crypt.sha512crypt(password, passwordSalt) === passwordHash) {
					callback(null, true)
				} else {
					callback(null, false)
				}
			} else if (algorithm === '1') {
				var exec = require('child_process').exec
				exec(
					'openssl passwd -1 -salt $salt $pass',
					{
						env: {
							salt: passwordSalt,
							pass: password,
						},
					},
					function (err, stdout, stderr) {
						console.log(err, stdout, stderr)
						if (stdout.trim() === passwordHash) {
							callback(null, true)
						} else {
							callback(null, false)
						}
					}
				)
			}
		} else {
			console.log('no password found')
			callback(null, false)
		}
	})
}
