const constructorMethod = (app) => {
    app.get('/', (_, res) => {
        res.sendFile('public/index.html', { root: __dirname })
    })
    app.use('*', (_, res) => {
      res.status(404).json({ error: "Page Not found" })
    })
}
module.exports = constructorMethod;