const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error("Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("Internal Server Error")
    }
  })

  server.timeout = 30000 // 30 seconds timeout

  server.on("error", (err) => {
    console.error("Server error:", err)
    process.exit(1)
  })

  server.listen(port, (err) => {
    if (err) throw err
    const address = server.address()
    const actualPort = typeof address === "string" ? port : address?.port
    console.log(`> Ready on http://${hostname}:${actualPort}`)
  })
})

