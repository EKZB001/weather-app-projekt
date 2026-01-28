
// Mock danych dla celów testowych/edukacyjnych
// Ten plik symuluje odpowiedzi z API OpenWeatherMap

const MOCK_DELAY = 500; // Symulacja opóźnienia sieci

const mockWeather = {
    "Warszawa": {
        coord: { lon: 21.0118, lat: 52.2298 },
        weather: [{ id: 800, main: "Clear", description: "bezchmurnie", icon: "01d" }],
        base: "stations",
        main: { temp: 22.5, feels_like: 21.8, temp_min: 21, temp_max: 24, pressure: 1015, humidity: 45 },
        visibility: 10000,
        wind: { speed: 3.6, deg: 350 },
        clouds: { all: 0 },
        dt: 1716300000,
        sys: { type: 2, id: 2032797, country: "PL", sunrise: 1716260000, sunset: 1716315000 },
        timezone: 7200,
        id: 756135,
        name: "Warszawa",
        cod: 200
    },
    "Kraków": {
        coord: { lon: 19.945, lat: 50.0647 },
        weather: [{ id: 802, main: "Clouds", description: "rozproszone chmury", icon: "03d" }],
        base: "stations",
        main: { temp: 20.1, feels_like: 19.5, temp_min: 18, temp_max: 22, pressure: 1012, humidity: 50 },
        visibility: 10000,
        wind: { speed: 2.1, deg: 180 },
        clouds: { all: 40 },
        dt: 1716300000,
        sys: { type: 2, id: 2032797, country: "PL", sunrise: 1716261000, sunset: 1716314000 },
        timezone: 7200,
        id: 3094802,
        name: "Kraków",
        cod: 200
    }
};

const mockForecast = {
    "Warszawa": {
        cod: "200",
        message: 0,
        cnt: 40,
        list: Array(40).fill(null).map((_, i) => ({
            dt: 1716300000 + i * 10800,
            main: { temp: 20 + Math.sin(i) * 5, feels_like: 19 + Math.sin(i) * 5, temp_min: 15, temp_max: 25, pressure: 1010, humidity: 50 },
            weather: [{ id: 800, main: "Clear", description: i % 2 === 0 ? "bezchmurnie" : "lekkie chmury", icon: i % 2 === 0 ? "01d" : "02d" }],
            clouds: { all: i % 2 === 0 ? 0 : 20 },
            wind: { speed: 3.5, deg: 270 },
            visibility: 10000,
            pop: 0,
            sys: { pod: "d" },
            dt_txt: new Date(Date.now() + i * 10800 * 1000).toISOString().replace('T', ' ').substring(0, 19)
        })),
        city: { id: 756135, name: "Warszawa", coord: { lat: 52.2298, lon: 21.0118 }, country: "PL", population: 1700000, timezone: 7200, sunrise: 1716260000, sunset: 1716315000 }
    }
};

// Funkcja symulująca zapytanie do API
export const fetchWeather = async (city, apiKey, useMock = false) => {
    if (useMock) {
        console.log(`[MOCK] Pobieranie pogody dla: ${city}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = mockWeather[city] || mockWeather["Warszawa"]; // Fallback do Warszawy
                resolve(data);
            }, MOCK_DELAY);
        });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Nie znaleziono miasta");
    return await response.json();
};

export const fetchForecast = async (city, apiKey, useMock = false) => {
    if (useMock) {
        console.log(`[MOCK] Pobieranie prognozy dla: ${city}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                // Dla uproszczenia zwracamy zawsze to samo miasto w mocku lub zmodyfikowane
                const data = mockForecast[city] || mockForecast["Warszawa"];
                // Nadpisujemy nazwę miasta w mocku, żeby pasowało do zapytania
                // (nie jest to idealne, ale wystarczy do demo)
                const dataCopy = JSON.parse(JSON.stringify(data));
                dataCopy.city.name = city;
                resolve(dataCopy);
            }, MOCK_DELAY);
        });
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Błąd pobierania prognozy");
    return await response.json();
};
