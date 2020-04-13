const { Contact } = require('../models/contact')
const { User } = require('../models/user')


module.exports.list = (req, res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    Contact.find({ user: req.user._id }).limit(limit).skip(startIndex).
        populate({ path: 'user', select: 'username email' })
        .then((contact) => {
            res.json(contact)
        })
        .catch((err) => {
            res.status(500).json('invalid page number')
        })


};


module.exports.create = (req, res) => {
    const body = req.body
    const contact = new Contact(body)
    contact.save()
        .then((contact) => {
            res.json({
                notice: 'successfully created',
                contact
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body

    Contact.findOneAndUpdate({ _id: id, user: req.user._id }, body,
        { new: true, runValidators: true })
        .then((contact) => {
            if (contact) {
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Contact.findOneAndDelete({ _id: id, user: req.user._id })

        .then((contact) => {
            if (contact) {
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports.show = (req, res) => {
    const id = req.params.id
    Contact.findOne({ _id: id, user: req.user._id })
        .then((contact) => {
            if (contact) {
                res.json(contact)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}