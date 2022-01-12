import axios from 'axios';

//BASE URL
const weatherUrl =
	'http://api.weatherstack.com/current?access_key=4c7de1d63ea7ab7aedfdf183c9da9e85&query=37.8267,-122.4233';
const geocodeUrl =
	'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibGF0aWhhZ2EiLCJhIjoiY2t5OHRoY3loMWhkeDJvb3llamxvdmYzayJ9.c4YN0d83a19osF8BPtxCDw';

//General Fetching Function
export const fetchUrl = async (url) => {
	try {
		const resp = await axios.get(url);
		const data = await resp.data;
		return data;
	} catch (e) {
		return e;
	}
};

//get the weather for specific city
export const weathercode = async ({ latitude, longitude, location = '' } = {}) => {
	const url = `http://api.weatherstack.com/current?access_key=4c7de1d63ea7ab7aedfdf183c9da9e85&query=${longitude},${latitude}`;
	try {
		const data = await fetchUrl(url);
		const { current } = data;

		return { current, location };
	} catch (e) {
		throw new Error('Something went wrong with this address maybe try again with a correct one');
	}
};

//get the location for a city
export const geocode = async (address) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibGF0aWhhZ2EiLCJhIjoiY2t5OHRoY3loMWhkeDJvb3llamxvdmYzayJ9.c4YN0d83a19osF8BPtxCDw`;
	try {
		let { features } = await fetchUrl(url);
		const { place_name: location, center: [ longitude, latitude ] } = features[0];
		return weathercode({ latitude, longitude, location });
	} catch (e) {
		throw new Error('Something went wrong, check the address!');
	}
};
