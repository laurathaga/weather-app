const form = document.querySelector('#weather_form');
const search = document.querySelector('#address');
const msgOne = document.querySelector('#location-msg');
const error = document.querySelector('#error');
const texts = document.querySelectorAll('.weather_col > p ');
error.style.display = 'none';
let countryLocation = '';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	countryLocation = search.value;

	if (countryLocation === '') {
		error.style.display = 'block';
		error.textContent = 'Please Provide a Location';
		error.style.color = 'red';
		return;
	}

	msgOne.textContent = 'Loading....';
	(async () => {
		try {
			let resp = await fetch(`/weather?address=${countryLocation}`);
			let data = await resp.json();
			msgOne.textContent = data.address;
			error.style.display = 'none';
			texts.forEach((t) => {
				let attr = t.getAttribute('name');
				if (attr === 'temp') {
					t.innerHTML = `Temperature: ${data.current.current.temperature}&#x2103`;
				} else if (attr === 'feels') {
					t.innerHTML = `Feels like: ${data.current.current.feelslike}&#x2103 `;
				} else if (attr === 'wind') {
					t.innerHTML = `Wind speed: ${data.current.current.wind_speed}`;
				} else if (attr === 'd-n') {
					t.innerHTML = `Mood: ${data.current.current.is_day === 'no' ? 'Night' : 'Day'}`;
				} else if (attr === 'weather') {
					t.innerHTML = `Current weather: ${data.current.current.weather_descriptions[0]}`;
				}
			});
		} catch (e) {
			msgOne.textContent = 'Unable to find location! Try again ';
			msgTwo.textContent = '';
		}
	})();
});
