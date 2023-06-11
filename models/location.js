const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:5252/Visited_Locations')
mongoose.set('debug', true)

mongoose.Promise = Promise

let location_schema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Yer ismi bos olmaz'
	},
	visited: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

module.exports = mongoose.model('location', location_schema)
