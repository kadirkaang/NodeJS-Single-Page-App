const express = require('express')
const router = express.Router()
const Location = require('../models/location')



// DB`de olan butun yerleri JSON olarak gonder
router.get('/', (req, res) => {
	Location.find()
		.then((res_location) => {
			res.send(res_location)
		})
		.catch(err => res.send(err))
})

// DB`ye yeni yer eklemek icin 
router.post('/', (req, res) => {
	Location.create(req.body)
		.then((new_location) => {
			res.status(201).json(new_location)
		})
		.catch(err => console.log(`error: create ${err}`))
})

// Show routes
router.get('/:location_id', (req, res) => {
	Location.findById(req.params.location_id)
		.then((find_location) => {
			res.json(find_location)
		})
		.catch(err => console.log(`error: findById ${err}`))
})

// Update routes
router.put('/:location_id', (req, res) => {
	Location.findByIdAndUpdate({ _id: req.params.location_id }, req.body, { new: true })
		.then((update_loc) => {
			res.json(update_loc)
		})
		.catch(err => console.log(`error: update ${err}`))
})

// Delete routes 
router.delete('/:location_id', (req, res) => {
	Location.findByIdAndRemove(req.params.location_id)
		.then(() => {
			res.json({ message: "Silindi" })
		})
		.catch(err => console.log(`error: delete ${err}`))

})







module.exports = router