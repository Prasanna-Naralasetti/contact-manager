const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: [{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            }
        }
    }],
    mobile:
        [{
            type: String,
            minlength: 10,
            maxlength: 10,
            unique: true
        }
        ]
    ,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = {
    Contact
}