const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Joi = require('joi')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user/:id', (req, res) => {

    let schema = Joi.object({
        id: Joi.number().required()
    })

    let options = {
        language: {
            number: {
                base: 'deve ser um número.'
            },
            any: {
                required: 'é obrigatório.',
                unknown: 'não é permitido.',
                invalid: 'contém um valor inválido.',
                empty: 'não é permitido estar vazio.'
            }
        }
    }

    const result = Joi.validate(req.params, schema, options)

    if (result.error) {
        let erMsg = result.error.details[0].message || 'error'
        res.status(500).send(erMsg)
        return
    }
    req.params.msg = 'id válido.'
    res.send(req.params)
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))