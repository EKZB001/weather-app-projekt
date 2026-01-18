import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujemy "nawigatora"

// UWAGA: Stylów nie musisz importować, jeśli są podpięte globalnie w main.jsx,
// ale dla pewności zostawmy import CSS, jeśli używasz App.css
import './App.css';

function Home() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const navigate = useNavigate(); // To jest nasz "pilot" do zmiany stron

    // 1. POBIERANIE KLUCZA Z PLIKU .ENV (Bezpiecznie!)
    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleSearch = async () => {
        if (!city) return;

        // --- MIEJSCE NA TWOJE MOCKOWANIE (jeśli chcesz punkty dodatkowe) ---
        // const USE_MOCK = false; 
        // ... tu byłaby logika mockowania ...

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Nie znaleziono miasta lub błąd klucza");
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            alert(error.message);
            setWeather(null);
        }
    }

    // Funkcja przenosząca do szczegółów
    const goToDetails = () => {
        if (weather) {
            // Mówimy: "Zmień adres na /details/NazwaMiasta"
            navigate(`/details/${weather.name}`);
        }
    }

    return (
        <div className="container">
            <h1>Aplikacja Pogodowa 🌤️</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Wpisz miasto..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Szukaj</button>
            </div>

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p className="temp">{Math.round(weather.main.temp)}°C</p>
                    <p className="description">{weather.weather[0].description}</p>

                    {/* Przycisk pojawia się tylko, gdy mamy dane */}
                    <button
                        className="details-btn"
                        style={{ marginTop: '15px', backgroundColor: '#28a745' }}
                        onClick={goToDetails}
                    >
                        Prognoza 5-dniowa
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;