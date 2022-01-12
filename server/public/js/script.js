const form = document.querySelector('#weather_form');
const search = document.querySelector('#address');
const msgOne = document.querySelector('#location-msg');
const msgTwo = document.querySelector('#forecast-msg');
const error = document.querySelector('#error');
error.style.display = 'none';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;

	if (location === '') {
		error.style.display = 'block';
		error.textContent = 'Please Provide a Location';
		error.style.color = 'red';
		return;
	}

	msgOne.textContent = 'Loading....';
	msgTwo.textContent = '';
	(async () => {
		try {
			let resp = await fetch(`https://stormweather.herokuapp.com/weather?address=${location}`);
			let data = await resp.json();
			msgOne.textContent = data.address;
			msgTwo.textContent = data.current;
			error.style.display = 'none';
		} catch (e) {
			msgOne.textContent = 'Unable to find location! Try again ';
			msgTwo.textContent = '';
		}
	})();
});
