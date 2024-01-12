const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "Urity-Frontend/data/login/")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "Urity-Frontend/data/login/", "login.html"))
})

app.listen(3000)
console.log("Servidor corriendo en el puerto 3000")