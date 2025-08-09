# Videoflix Frontend

Eine Video-Streaming-Plattform gebaut mit Angular.

## 🚀 Schnellstart

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm (kommt mit Node.js)
- Ein Terminal/Kommandozeile

### Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/Philipp-Loetzsch/videoflix_frontend.git
   cd videoflix_frontend
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm start
   ```
   Die Anwendung ist jetzt unter `http://localhost:4200` verfügbar.

## 🔧 Fehlersuche

### "Module not found" Fehler
- Führe `npm install` erneut aus
- Lösche den `node_modules` Ordner und führe `npm install` aus

### CORS Fehler
- Stelle sicher, dass das Backend läuft
- Überprüfe die Backend-URL in der `environment.ts`

### Video Playback Fehler
- Stelle sicher, dass die HLS-Streams über HTTPS verfügbar sind
- Prüfe die Netzwerk-Registerkarte im Browser auf Mixed-Content-Warnungen

## 📝 Wichtige Befehle

```bash
# Entwicklungsserver starten
npm start

# Production Build erstellen
npm run build

# Tests ausführen
npm test

# Linting durchführen
npm run lint
```

## 🏗 Projektstruktur

```
src/
├── app/
│   ├── components/     # UI Komponenten
│   ├── services/      # Angular Services
│   └── content.ts     # Datenmodelle
├── assets/           # Statische Dateien
└── environments/     # Umgebungskonfigurationen
```

## 🔒 Umgebungsvariablen

Wichtige Variablen in `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://deine-backend-url.de',
  apiEndpoints: {
    // API Endpunkte
  }
};
```

## 📚 Zusätzliche Informationen

- Die Anwendung verwendet Video.js für die Video-Wiedergabe
- HLS-Streaming wird für adaptive Bitrate unterstützt
- Das Backend muss separat gestartet werden

## 💡 Tipps

- Verwende Chrome oder Firefox für die beste Entwicklungserfahrung
- Die Developer Tools (F12) sind hilfreich für Debugging
- Bei Problemen erst prüfen, ob das Backend erreichbar ist
