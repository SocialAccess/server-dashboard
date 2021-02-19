import { dir } from 'console'
import fs from 'fs'
import path from 'path'

const dirs = ['~/components']
const componentDir = path.resolve('components')

fs.readdirSync(componentDir).forEach((file) => {
	const filePath = path.resolve(componentDir, file)
	if (fs.lstatSync(filePath).isDirectory()) {
		dirs.push({
			path: filePath,
			prefix: file,
		})
	}
})

console.log(dirs)

export default {
	dirs,
}
