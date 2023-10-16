import React from "react";

import { createContext, useState } from "react";
const CityContext = createContext();

function CityContextProvider({ children }) {
	const [selectedCity, setSelectedCity] = useState("İstanbul");
	const values = {
		selectedCity,
		setSelectedCity,
	};
	return <CityContext.Provider value={values}>{children}</CityContext.Provider>;
}
export { CityContextProvider, CityContext };
