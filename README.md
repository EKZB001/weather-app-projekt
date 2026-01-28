# WeatherApp - Aplikacja Pogodowa

Aplikacja typu SPA (Single Page Application) umożliwiająca sprawdzanie aktualnej pogody oraz prognozy długoterminowej dla miast na całym świecie.

## 📋 Opis Projektu

Aplikacja pozwala użytkownikom na szybkie wyszukiwanie informacji pogodowych. Dzięki zastosowaniu **Local Storage**, lista ulubionych miast jest zapamiętywana w przeglądarce, co ułatwia wielokrotny dostęp. Interfejs został zaprojektowany w nowoczesnym stylu **Glassmorphism**, zapewniając estetyczny wygląd i responsywność na różnych urządzeniach.

### Grupa docelowa:
1.  **Podróżni**: Szybkie sprawdzanie pogody w miejscach docelowych.
2.  **Osoby aktywne**: Weryfikacja warunków przed wyjściem (bieganie, rower).

## 🚀 Uruchomienie Projektu

### Wymagania wstępne
*   Node.js (wersja 16 lub nowsza)
*   npm

### Instalacja i uruchomienie lokalne
1.  Sklonuj lub pobierz repozytorium.
2.  Otwórz terminal w folderze projektu.
3.  Zainstaluj zależności:
    ```bash
    npm install
    ```
4.  Uruchom aplikację w trybie deweloperskim:
    ```bash
    npm run dev
    ```
5.  Otwórz link wyświetlony w terminalu (zazwyczaj `http://localhost:5173`).

## 🛠 Technologie (Stos Technologiczny)

*   **React (Vite)** – biblioteka UI i narzędzie budowania.
*   **React Router** – obsługa routingu (SPA).
*   **CSS3** – stylowanie (Flexbox, Glassmorphism, RWD).
*   **OpenWeatherMap API** / **Mock API** – źródło danych.

## ✅ Realizacja Kryteriów Oceny (Wariant 1)

Projekt realizuje punkty z arkusza oceny w następujący sposób:

### 1. Warstwa Funkcjonalna (Wymagania)
**Wymagania Funkcjonalne:**
1.  **Wyszukiwanie pogody** – użytkownik może wyszukać dowolne miasto.
2.  **Szczegóły pogody** – wyświetlanie temperatury, opisu i ikony.
3.  **Prognoza 5-dniowa** – widok szczegółowy z prognozą (co 3h).
4.  **Ulubione miasta** – dodawanie/usuwanie z listy ulubionych.

**Wymagania Pozafunkcjonalne:**
1.  **Responsywność (RWD)** – aplikacja działa na telefonach, tabletach i desktopach.
2.  **Wydajność** – wykorzystanie pamięci podręcznej przeglądarki (LocalStorage).

### 2. Komunikacja z API (REST)
*   Aplikacja łączy się z zewnętrznym API (np. OpenWeatherMap).
*   **[DODATKOWE PUNKTY] Mockowanie API**: Zaimplementowano tryb demo (`apiMock.js`), który symuluje odpowiedzi serwera, umożliwiając testowanie aplikacji bez dostępu do Internetu (lub w przypadku limitu zapytań API).

### 3. Trwałość Danych (Persistence)
*   Wykorzystano **LocalStorage** do zapisywania listy ulubionych miast. Dane nie znikają po odświeżeniu strony.
    *   *Implementacja: Plik `Home.jsx`, hook `useEffect`.*

### 4. Routing
*   Zastosowano **React Router** do nawigacji bez przeładowania strony.
*   Elementy nawigacyjne:
    *   `/` – Strona główna (Wyszukiwarka i Ulubione).
    *   `/details/:city` – Szczegóły i prognoza dla konkretnego miasta.

### 5. Warstwa Widoku
*   **Responsywność**: Obsługa co najmniej dwóch progów (Mobile/Desktop) w plikach CSS.
*   **Separacja logiki**: Logika komponentów (hooks, functions) jest oddzielona od struktury JSX w miarę możliwości.
*   **Estetyka**: Zastosowano styl Glassmorphism.

### 6. Publikacja
*   Projekt jest przygotowany do publikacji na serwerze (np. Netlify Drop) poprzez folder `dist`.

## 📂 Struktura Plików
*   `src/App.jsx` – główny komponent i konfiguracja routingu.
*   `src/Home.jsx` – strona główna (logika wyszukiwania i ulubionych).
*   `src/Details.jsx` – strona szczegółów (logika pobierania prognozy).
*   `src/apiMock.js` – plik mockujący dane API (tryb demo).
*   `src/main.jsx` – punkt wejściowy aplikacji.

*Autor: Eryk Zerbin*
