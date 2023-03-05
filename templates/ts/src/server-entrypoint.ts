import express from 'express'
import { ssr } from 'express-ssr'
import { resolve } from 'path'
import { cwd } from 'process'

const getPath = (...args: string[]) => resolve(cwd(), ...args)

const app = express()
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'development'

// We need it because of the client-entrypoint
app.use('/public', express.static(getPath('dist')))
app.get('/favicon.ico', (_, res) => res.send('ok'))
app.use(
  ssr({
    debug: isDev,
    clientEntrypoint: '/public/client-entrypoint.js',
  })
)

app.listen(port, () => console.log(`The app listens on port :${port}`))
