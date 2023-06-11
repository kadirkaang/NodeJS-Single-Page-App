$(document).ready(function () {
	let locations = $.getJSON('/api/location')

	locations
		.then(add_locations)
	$('#myInput').keypress((e) => {
		if (e.which == 13) {
			add_new_city()
		}
	})

	$('.locations').on('click', '.dltfa', function () {
		let onClick = $(this).parent().parent()
		let deleteUrl = '/api/location/' + onClick.data('id')

		$.ajax({
			method: "DELETE",
			url: deleteUrl
		})
			.then((deleted_data) => {
				console.log(deleted_data)
				onClick.remove()
			})
	})

	$('.locations').on('click', '.myLocations', function() {
		zirayetDurumunuGuncelle($(this))
	})
})

function add_locations(locations) {
	locations.forEach(function (location) {
		add_location(location)
	})
}

function add_location(location) {
	let new_location = $('<li class="myLocations">' + location.name + '<span><i class="dltfa fa-solid fa-trash"></i></span> </li>')

	new_location.data('id', location._id)
	new_location.data('visited', location.visited)

	$('.locations').append(new_location)
}

function add_new_city() {
	let new_city = $('#myInput').val()
	// console.log(new_city)

	$.post('/api/location', { name: new_city })
		.then((new_added_city) => {
			add_location(new_added_city)
			$('#myInput').val('')
		})
}

function zirayetDurumunuGuncelle(location) {
	let update_url = '/api/location/' + location.data('id')
	let ziyaretDurumu = location.data('visited')
	let guncelle = {visited: !ziyaretDurumu}
	console.log(guncelle)
	$.ajax({
		method: "PUT",
		url: update_url,
		data: guncelle
	})
		.then((guncellenmisData) => {
			location.toggleClass('ziyaretEdilmis')
			console.log(!ziyaretDurumu)
			console.log("before" ,location.data('visited'))
			location.data('visited', !ziyaretDurumu)
			console.log('son' , location.data('visited'))
		})
}