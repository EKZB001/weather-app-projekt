import { useState } from 'react'
import './App.css'

function App() {
  // 1. STAN DLA POLA WYSZUKIWANIA
  const [city, setCity] = useState('');

  // 2. NOWY STAN DLA DANYCH POGODOWYCH
  // Na początku jest null (brak danych), bo jeszcze nic nie pobraliśmy
  const [weather, setWeather] = useState(null);

  // 3. TWÓJ KLUCZ API (Wklej go w cudzysłowie poniżej)
  const API_KEY = 'ebf4635c7e09d2c926eabe856beee404';

  const handleSearch = async () => {
    if (!city) return;

    // KROK 1: Sprawdźmy, jak wygląda adres URL przed wysłaniem
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=${API_KEY}`;
    console.log("Wysyłam zapytanie pod adres:", url);

    try {
      const response = await fetch(url);

      // KROK 2: Sprawdźmy status odpowiedzi serwera
      console.log("Status serwera:", response.status);

      if (!response.ok) {
        // Jeśli status to 401 -> Wina klucza
        if (response.status === 401) {
          throw new Error("Błąd 401: Klucz API jest nieprawidłowy lub nieaktywny.");
        }
        // Jeśli status to 404 -> Wina miasta/adresu
        if (response.status === 404) {
          throw new Error("Błąd 404: Nie ma takiego miasta.");
        }
        // Inny błąd
        throw new Error(`Inny błąd: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
      console.log("Pobrane dane:", data);

    } catch (error) {
      console.error("Szczegóły błędu:", error);
      alert(error.message); // To wyświetli prawdziwy powód na ekranie
      setWeather(null);
    }
  }

  return (
    <div className="container">
      <h1>Aplikacja Pogodowa</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Wpisz miasto..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Szukaj</button>
      </div>

      {/* 4. WYŚWIETLANIE WYNIKÓW (WARUNKOWE) */}
      {/* Poniższy zapis oznacza: Jeśli 'weather' istnieje (nie jest null), to wyświetl ten blok */}
      {weather && (
        <div className="weather-info">
          {/* weather.name -> nazwa miasta z API */}
          {/* weather.sys.country -> skrót kraju np. PL */}
          <h2>{weather.name}, {weather.sys.country}</h2>

          {/* weather.main.temp -> temperatura */}
          <p className="temp">{Math.round(weather.main.temp)}°C</p>

          {/* weather.weather[0].description -> opis np. "bezchmurnie" */}
          <p className="description">{weather.weather[0].description}</p>
        </div>
      )}

    </div>
  )
}

export default App