const constructorMethod = (app) => {
    app.get('/', (req, res) => {
        res.sendFile('public/index.html', { root: __dirname })
    })
    app.use('*', (req, res) => {
      res.status(404).json({ error: "Page Not found" })
    })
}

module.exports = constructorMethod;