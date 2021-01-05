import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError } from '@wmenegalitickets/common'

const app = express()

// behind the proxy of nginx
app.set('trust proxy', true)
app.use(json())

/**
 * Cookies are not signed to avoid complications when handling them
 * in different languages that other microservices might be written in.
 * As a best practice, sensitive information should never be stored in a cookie.
 */
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }
