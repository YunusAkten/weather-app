import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CityContext } from "../context/cityContext";
function Weather() {
	const { selectedCity } = useContext(CityContext);
	const [coord, setCoord] = useState({});
	const [weeklyWeather, setWeeklyWeather] = useState([]);
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric `
			)
			.then((response) => {
				setCoord(response.data.city.coord);
			})
			.catch((response) => {
				console.log(response.message);
			});
	}, [selectedCity]);
	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&lang=tr&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API_KEY}       `
			)
			.then((response) => {
				setWeeklyWeather(response.data.daily);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [coord]);
	return (
		<div className="row justify-content-center">
			{weeklyWeather &&
				weeklyWeather.map((day, index) => {
					const imgUrl =
						"http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
					return (
						<div className="col-1" key={index}>
							<img className="weatherIcon" src={imgUrl} alt="" />
							<p>
								{Math.round(day.temp.max)} / {Math.round(day.temp.min)}
							</p>
							<p>{day.weather[0].description}</p>
						</div>
					);
				})}
		</div>
	);
}

export default Weather;
