import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeather } from './apiMock';
import './App.css';

function Home() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [favorites, setFavorites] = useState([]); // Lista ulubionych miast
    const navigate = useNavigate();

    // Stan przełącznika Mock API
    const [useMock, setUseMock] = useState(() => {
        return localStorage.getItem('useMock') === 'true';
    });

    const API_KEY = import.meta.env.VITE_API_KEY;

    // Zapis preferencji mocka
    useEffect(() => {
        localStorage.setItem('useMock', useMock);
    }, [useMock]);

    // 1. WCZYTANIE ULUBIONYCH PRZY STARCIE (Tylko raz)
    useEffect(() => {
        const savedCities = localStorage.getItem('favorites');
        if (savedCities) {
            setFavorites(JSON.parse(savedCities)); // Zamieniamy tekst z powrotem na tablicę
        }
    }, []);

    // Funkcja pomocnicza do szukania (żeby nie powtarzać kodu)
    const searchCity = async (cityName) => {
        if (!cityName) return;

        // Aktualizujemy input, żeby użytkownik widział co kliknął
        setCity(cityName);

        try {
            // Używamy naszego wrappera apiMock
            const data = await fetchWeather(cityName, API_KEY, useMock);
            setWeather(data);
        } catch (error) {
            alert(error.message);
            setWeather(null);
        }
    }

    // Obsługa przycisku "Szukaj"
    const handleSearch = () => {
        searchCity(city);
    }


    // 2. DODAWANIE DO ULUBIONYCH + ZAPIS DO LOCALSTORAGE
    const addToFavorites = () => {
        if (weather && !favorites.includes(weather.name)) {
            const newFavorites = [...favorites, weather.name];
            setFavorites(newFavorites);
            // Zapisujemy w przeglądarce (localStorage przyjmuje tylko tekst, stąd JSON.stringify)
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    }

    // 3. USUWANIE Z ULUBIONYCH
    const removeFromFavorites = (cityToRemove) => {
        const newFavorites = favorites.filter(c => c !== cityToRemove);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    return (
        <div className="container">
            <h1>Aplikacja Pogodowa 🌤️</h1>

            {/* Toggle dla trybu MOCK (dla celów demonstracyjnych) */}
            <div className="mock-toggle">
                <label style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <input
                        type="checkbox"
                        checked={useMock}
                        onChange={(e) => setUseMock(e.target.checked)}
                    />
                    {' '}Tryb Demo (Mock API)
                </label>
            </div>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Wpisz miasto..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Szukaj</button>
            </div>

            {/* 4. LISTA ULUBIONYCH (WYŚWIETLANIE) */}
            {favorites.length > 0 && (
                <div className="favorites-section">
                    <h3>Ulubione:</h3>
                    <div className="favorites-list">
                        {favorites.map((favCity) => (
                            <div key={favCity} className="fav-chip">
                                {/* Kliknięcie nazwy wyszukuje pogodę */}
                                <span onClick={() => searchCity(favCity)}>{favCity}</span>
                                {/* Kliknięcie X usuwa z listy */}
                                <button className="remove-btn" onClick={() => removeFromFavorites(favCity)}>x</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p className="temp">{Math.round(weather.main.temp)}°C</p>
                    <p className="description">{weather.weather[0].description}</p>

                    <div className="actions">
                        <button
                            className="details-btn"
                            onClick={() => navigate(`/details/${weather.name}`)}
                        >
                            Prognoza 5-dniowa
                        </button>

                        {/* Przycisk dodawania (pokaż tylko jeśli miasta nie ma jeszcze na liście) */}
                        {!favorites.includes(weather.name) && (
                            <button className="fav-btn" onClick={addToFavorites}>
                                ❤️ Dodaj do ulubionych
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;