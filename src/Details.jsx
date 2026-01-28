// src/Details.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchForecast } from './apiMock';
import './App.css';

function Details() {
    const { city } = useParams();
    const navigate = useNavigate();

    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedDay, setExpandedDay] = useState(null); // Keeps track of which day is open

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const useMock = localStorage.getItem('useMock') === 'true';

        const getData = async () => {
            try {
                const data = await fetchForecast(city, API_KEY, useMock);
                setForecast(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        };

        getData();

    }, [city]);

    if (loading) return <div className="container"><h2>Ładowanie prognozy...</h2></div>;

    if (!forecast) {
        return (
            <div className="container">
                <h2>Błąd pobierania danych.</h2>
                <button onClick={() => navigate('/')}>Wróć</button>
            </div>
        );
    }

    // --- LOGIKA GRUPOWANIA PO DNIACH ---
    const groupForecastByDay = (list) => {
        const grouped = {};
        list.forEach(item => {
            // item.dt_txt wygląda tak: "2024-05-20 15:00:00"
            const date = item.dt_txt.split(' ')[0]; // Bierzemy samą datę "2024-05-20"
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(item);
        });
        return grouped;
    };

    const groupedData = groupForecastByDay(forecast.list);
    const days = Object.keys(groupedData); // Lista dat, np. ["2024-05-20", "2024-05-21"...]

    // Funkcja do przełączania akordeonu
    const toggleDay = (date) => {
        if (expandedDay === date) {
            setExpandedDay(null); // Jeśli kliknięto otwarty, zamknij go
        } else {
            setExpandedDay(date); // Otwórz nowy
        }
    };

    // Pomocnicza funkcja do formatowania daty na ładniejszą (np. "Poniedziałek, 20.05")
    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'numeric' };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    // Pomocnicza do wyciągania godziny (bez sekund)
    const formatTime = (dt_txt) => {
        // "2024-05-20 15:00:00" -> "15:00"
        return dt_txt.split(' ')[1].slice(0, 5);
    };

    return (
        <div className="container">
            <button className="back-btn" onClick={() => navigate('/')}>← Wróć</button>

            <h2>Prognoza 5-dniowa: <br />{city}</h2>

            <div className="forecast-list">
                {days.map((date) => {
                    const dayItems = groupedData[date];
                    // Obliczamy min/max temperaturę dla całego dnia, żeby pokazać w nagłówku
                    const temps = dayItems.map(item => item.main.temp);
                    const maxTemp = Math.round(Math.max(...temps));
                    const minTemp = Math.round(Math.min(...temps));
                    // Ikona z południa (lub pierwsza dostępna) jako reprezentacja dnia
                    const icon = dayItems[Math.floor(dayItems.length / 2)].weather[0].icon;

                    const isOpen = expandedDay === date;

                    return (
                        <div key={date} className={`day-group ${isOpen ? 'open' : ''}`}>
                            {/* NAGŁÓWEK DNIA (KLIKALNY) */}
                            <div className="day-header" onClick={() => toggleDay(date)}>
                                <span className="day-date">{formatDate(date)}</span>
                                <div className="day-summary">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${icon}.png`}
                                        alt="ikona"
                                        style={{ width: '30px', verticalAlign: 'middle' }}
                                    />
                                    <span className="day-temp">{maxTemp}° / {minTemp}°</span>
                                </div>
                                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
                            </div>

                            {/* SZCZEGÓŁY (ROZWIJANE) */}
                            {isOpen && (
                                <div className="day-details">
                                    {dayItems.map((item) => (
                                        <div key={item.dt} className="forecast-row">
                                            <span className="time">{formatTime(item.dt_txt)}</span>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                                alt="ikona"
                                                style={{ width: '30px' }}
                                            />
                                            <span className="temp-small">{Math.round(item.main.temp)}°C</span>
                                            <span className="desc-small">{item.weather[0].description}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Details;