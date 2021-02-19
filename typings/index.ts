import { Session, SessionData } from 'express-session'

declare module 'express-session' {
	interface SessionData {
		username?: string
		password?: string
	}
}

declare module 'connect' {
	interface IncomingMessage {
		session: Session & Partial<SessionData>
	}
}
