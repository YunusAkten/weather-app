import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SelectCity from "./components/selectCity";
import { CityContextProvider } from "./context/cityContext";
import Weather from "./components/weather";
function App() {
	const [cities, setCities] = useState([]);
	useEffect(() => {
		axios
			.get(
				"https://api.openaq.org/v2/cities?limit=100&page=1&offset=0&sort=asc&country=tr&order_by=city"
			)
			.then((response) => {
				setCities(response.data.results);
			});
	}, []);
	return (
		<CityContextProvider>
			<div className="App container">
				<h1>Weather app</h1>
				<SelectCity cities={cities} />
				<Weather></Weather>
			</div>
		</CityContextProvider>
	);
}

export default App;
