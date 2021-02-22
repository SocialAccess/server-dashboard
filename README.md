![Dashboard Preview](/static/images/preview.jpg)

# Server Dashboard

Built with NuxtJS, TypeScript, Socket.io, and more. This server dashboard lets you keep an eye on your server without the need to ssh into it. Currently only tested on Ubuntu 20.04.

## Current Features

- Live CPU, Memory, and Network stats
- Minecraft Server
  - Download Latest Paper 1.16 Server Jar
  - Start, Stop, and Restart controls
  - Console window
- Very Basic User System

## Planned Features

- Improve security
- Network view and controller
- Process view and controller
- User management system based on system users
- File management & basic file editor
- Apache vHost controller
- Possibly more

## Getting Started

The first thing you should probably do before deploying this is updating the users. Currently, user accounts are stored in `server/users.js`. This will change later. To add a user account, simply add a new line like so:

```javascript
export default {
	admin: 'password',
	user2: 'password2',
}
```

After updating the user accounts/password, you need to build it. You can do so by running the following command:

```bash
yarn install #if you have not already ran this command
yarn build
```

Then, to deploy:

```bash
yarn start
```

The dashboard should be running at http://localhost:3000 now. If you need to change this, you can do so in the server property inside of `nuxt.config.js`

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
