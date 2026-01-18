// src/Details.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function Details() {
    const { city } = useParams(); // Pobieramy nazwę miasta z adresu URL
    const navigate = useNavigate();

    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true); // Stan ładowania (kręciołek)

    const API_KEY = import.meta.env.VITE_API_KEY;

    // TO JEST NOWOŚĆ: useEffect
    useEffect(() => {
        // Definiujemy funkcję pobierającą wewnątrz efektu
        const fetchForecast = async () => {
            // Zauważ zmianę w URL: "forecast" zamiast "weather"
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Błąd pobierania prognozy");
                const data = await response.json();
                setForecast(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false); // Niezależnie czy sukces czy błąd, kończymy ładowanie
            }
        };

        fetchForecast(); // Wywołujemy funkcję od razu

    }, [city]); // [city] oznacza: "Jeśli zmieni się miasto w URL, uruchom to jeszcze raz"

    // Jeśli dane się jeszcze ładują, wyświetl komunikat
    if (loading) {
        return <div className="container"><h2>Ładowanie prognozy...</h2></div>;
    }

    // Jeśli nie udało się pobrać danych
    if (!forecast) {
        return (
            <div className="container">
                <h2>Błąd pobierania danych.</h2>
                <button onClick={() => navigate('/')}>Wróć</button>
            </div>
        );
    }

    return (
        <div className="container">
            <button className="back-btn" onClick={() => navigate('/')}>← Wróć</button>

            <h2>Prognoza 5-dniowa: {city}</h2>

            <div className="forecast-list">
                {/* API zwraca listę 40 elementów (co 3h). Mapujemy je (wyświetlamy) */}
                {forecast.list.map((item) => (
                    <div key={item.dt} className="forecast-item">
                        <p className="date">{item.dt_txt}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt="ikona"
                            style={{ width: '50px' }}
                        />
                        <p className="temp">{Math.round(item.main.temp)}°C</p>
                        <p className="desc">{item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Details;