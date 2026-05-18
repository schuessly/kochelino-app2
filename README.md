# 🍝 Kochelino

> **Aus deiner Küche. Mit Liebe gekocht.**

Kochelino ist ein KI-gestützter Küchenhelfer: Gib ein, was du im Kühlschrank hast, und erhalte sofort personalisierte Rezeptvorschläge – inklusive Pro-Tipps, Vorratsverwaltung und digitalem Einkaufszettel.

---

## Features

- **Rezeptgenerierung** – KI (Google Gemini) erstellt 4 individuelle Rezepte auf Basis deiner Zutaten
- **Pro-Tipp** – Jedes Rezept enthält einen Chef-Tipp, wie es noch besser schmeckt
- **Mein Vorrat** – Digitale Vorratskammer mit automatischer Mengenabziehung beim Kochen
- **Lieblinge** – Rezepte als Favoriten speichern (LocalStorage)
- **Einkaufszettel** – Fehlende Zutaten direkt auf den Zettel, druckbar
- **Großer Modus** – Schriftgrößen-Toggle für bessere Lesbarkeit
- **PWA-ready** – Funktioniert offline für Vorrat & Lieblinge

---

## Voraussetzungen

- Node.js 20+ (empfohlen: via [nvm](https://github.com/nvm-sh/nvm))
- Google Gemini API Key ([aistudio.google.com](https://aistudio.google.com))

---

## Setup

### 1. Node.js installieren (falls noch nicht vorhanden)

```bash
# nvm installieren
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Shell neu laden, dann Node.js installieren
nvm install --lts
nvm use --lts
```

### 2. Projekt einrichten

```bash
# In das Projektverzeichnis wechseln
cd kochelino-app

# Abhängigkeiten installieren
npm install
```

### 3. API-Key konfigurieren

```bash
cp .env.example .env.local
```

Dann `.env.local` öffnen und deinen Gemini API Key eintragen:

```
GEMINI_API_KEY=dein_api_key_hier
```

Den Key bekommst du kostenlos unter [aistudio.google.com](https://aistudio.google.com) → „Get API Key".

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Die App läuft dann unter [http://localhost:3000](http://localhost:3000).

---

## Deployment auf Vercel

```bash
# Vercel CLI installieren
npm install -g vercel

# Deployen
vercel

# Beim ersten Mal: GEMINI_API_KEY als Umgebungsvariable setzen
vercel env add GEMINI_API_KEY
```

---

## Projektstruktur

```
kochelino-app/
├── app/                    # Next.js App Router (Seiten + API)
│   ├── onboarding/         # 3-Schritt-Eingabe-Wizard
│   ├── rezepte/            # Rezeptliste + Detailansicht
│   ├── vorrat/             # Vorratskammer
│   ├── lieblinge/          # Gespeicherte Lieblingsrezepte
│   ├── einkaufszettel/     # Digitaler Einkaufszettel
│   └── api/rezepte/        # Gemini API Route
├── components/             # React-Komponenten
│   ├── layout/             # AppShell, TopBar, BottomNav
│   ├── rezepte/            # RecipeCard, ProTipp, etc.
│   ├── vorrat/             # Vorratsverwaltung
│   └── shared/             # CookedButton, FavoriteButton
├── stores/                 # Zustand State Management
├── lib/                    # Gemini, pantryDeduction, Datenbank
└── types/                  # TypeScript-Typen
```

---

## Technischer Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand mit localStorage-Persistenz |
| KI | Google Gemini API (`gemini-2.0-flash`) |
| Deployment | Vercel |

---

## Neue Features (v2)

### Mein Vorrat
Die Vorratskammer zeigt alle gespeicherten Lebensmittel mit Mengenangaben. Nach dem Kochen eines Rezepts (Klick auf „Habe ich gekocht!") werden die verwendeten Zutaten automatisch abgezogen. Bei niedrigem Bestand erscheint eine Warnung.

### Pro-Tipp
Am Ende jedes Rezepts gibt Kochelino einen persönlichen Tipp, wie das Gericht noch besser schmecken könnte – auch wenn dafür eine zusätzliche Zutat eingekauft werden muss.
