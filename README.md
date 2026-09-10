# Proxer.me Autoplay Extension

🎬 Eine Browser-Extension für Chrome, Edge und Firefox, die automatisch die nächste Episode auf Proxer.me abspielt und in den Vollbildmodus wechselt.

## Features

✅ **Automatisches Abspielen** - Erkennt wenn eine Episode endet
✅ **Nächste Episode laden** - Lädt automatisch die nächste Episode
✅ **Vollbildmodus** - Startet jede Episode im Vollbildmodus
✅ **Ein-/Ausschalten** - Einfach zu aktivieren und deaktivieren über das Popup
✅ **Cross-Browser** - Funktioniert auf Chrome, Edge und Firefox

## Installation

### Chrome/Chromium-basierte Browser (Chrome, Edge, Brave, etc.):

1. Clone oder Download dieses Repository
2. Öffne `chrome://extensions/` (oder `edge://extensions/` bei Edge)
3. Aktiviere "Entwicklermodus" (oben rechts)
4. Klicke auf "Entpackte Erweiterung laden"
5. Wähle den Ordner dieser Extension aus

### Firefox:

1. Clone oder Download dieses Repository
2. Öffne `about:debugging`
3. Klicke auf "Diesen Firefox"
4. Klicke auf "Temporäre Add-ons laden..."
5. Wähle die `manifest.json` Datei aus diesem Ordner aus

**Hinweis:** Bei Firefox wird die Extension nur temporär geladen. Um sie dauerhaft zu installieren, muss sie über Mozilla signiert werden (oder du nutzt Firefox Developer Edition mit `about:config` Einstellung).

## Verwendung

1. Navigiere zu einer Proxer.me Episode
2. Klicke auf das Extension-Icon in der Toolbar
3. Schalte Autoplay mit dem Toggle an
4. Lehne dich zurück und genieße deine Series! 🍿

## Wie es funktioniert

- Die Extension überwacht das Video-Element auf der Seite
- Wenn das Video endet, sucht sie nach dem "Nächste Episode"-Button
- Sie klickt diesen Button automatisch an
- Die neue Episode wird im Vollbildmodus gestartet

## Troubleshooting

**Autoplay funktioniert nicht:**
- Überprüfe, dass die Extension aktiviert ist
- Aktualisiere die Seite
- Stelle sicher, dass du auf einer Episode-Seite bist
- In Firefox: Überprüfe ob die Extension noch aktiv ist (temporäre Extensions werden manchmal entfernt)

**Vollbildmodus startet nicht:**
- Dies könnte eine Browser-Sicherheitsbeschränkung sein
- Versuche die Seite zu aktualisieren

**Firefox: Extension wird nicht geladen:**
- Stelle sicher, dass du `manifest.json` auswählst, nicht den Ordner
- Nutze Firefox Developer Edition für bessere Unterstützung

## Browser-Kompatibilität

| Browser | Status | Notizen |
|---------|--------|---------|
| Chrome | ✅ Vollständig | Produktiv nutzbar |
| Edge | ✅ Vollständig | Produktiv nutzbar |
| Firefox | ✅ Funktional | Nur temporär ohne Signierung |
| Brave | ✅ Vollständig | Chromium-basiert |

## Lizenz

MIT License - Frei verwendbar

## Disclaimer

Diese Extension ist ein inoffizielles Tool und steht in keiner Verbindung mit Proxer.me. Nutze sie auf eigene Verantwortung.
