# Staging-Umgebung Passwortschutz - MAXIMALE SICHERHEIT

Diese Dokumentation beschreibt die HTTP Basic Authentication für die Staging-Umgebung unter `https://staging.mallorca-map.com`.

## Überblick

Die Staging-Umgebung ist mit **mehrschichtiger Sicherheit** geschützt:

### Schicht 1: HTTP Basic Authentication (PRIMÄR)
- ✅ **Blockiert 100% aller Anfragen** ohne gültige Anmeldedaten
- ✅ Gilt für alle Benutzer, Bots und Crawler
- ✅ Antwortet mit **401 Unauthorized**

### Schicht 2: HTTP-Header (SEKUNDÄR - Extra-Sicherheit)
- ✅ `X-Robots-Tag: noindex, nofollow, noarchive` - Suchmaschinen ignorieren
- ✅ `Cache-Control: no-cache, no-store` - Keine Caches speichern
- ✅ `Pragma: no-cache` - Alte Browser blockieren

### Schicht 3: robots.txt (TERTIÄR - Höfliches Signal)
- ✅ Blockiert alle Bots und Crawler
- ✅ Explizite Disallow-Richtlinien für alle bekannten Web-Crawler

## Gesamtsicherheit

| Bedrohung | Status |
|-----------|--------|
| **Normale User** | 🔒 Blockiert - Passwort erforderlich |
| **Google/Bing/Yandex** | 🔒 Blockiert - 401 + noindex Header |
| **SEO-Bots (Ahrefs, Semrush)** | 🔒 Blockiert - 401 + robots.txt |
| **Automatische Scanner** | 🔒 Blockiert - 401 |
| **Web Crawler** | 🔒 Blockiert - 401 |
| **Browser Caches** | 🔒 Blockiert - Cache-Control Header |
| **Google Cache** | 🔒 Blockiert - noarchive Header |
| **Bing Cache** | 🔒 Blockiert - noarchive Header |
| **Google Images** | 🔒 Blockiert - noimageindex Header |

## Einrichtung

### 1. Voraussetzungen

Das Tool `htpasswd` muss installiert sein:

**Debian/Ubuntu:**
```bash
sudo apt-get install apache2-utils
```

**macOS:**
```bash
brew install httpd
```

### 2. Passwortdatei erstellen

Führe das Setup-Skript aus:

```bash
chmod +x deploy/setup-staging-auth.sh
sudo ./deploy/setup-staging-auth.sh
```

Das Skript fragt dich nach einem Passwort und erstellt die Datei `/etc/nginx/.htpasswd_staging`.

**Oder manuell:**
```bash
sudo htpasswd -c /etc/nginx/.htpasswd_staging staging
```

### 3. Nginx neuladen

```bash
sudo systemctl reload nginx
```

oder

```bash
sudo service nginx reload
```

### 4. Suchmaschinen informieren

Entferne die Staging-Domain aus Google Search Console und Bing Webmaster Tools:

1. **Google Search Console:** https://search.google.com/search-console/
   - Wähle `staging.mallorca-map.com`
   - Einstellungen → Domain entfernen

2. **Bing Webmaster Tools:** https://www.bing.com/webmasters/
   - Wähle `staging.mallorca-map.com`
   - Einstellungen → Website entfernen

## Verwendung

### Mit Browser
Öffne `https://staging.mallorca-map.com/de` - der Browser fordert dich um Benutzerdaten auf:
- **Benutzer:** `staging`
- **Passwort:** Dein gewähltes Passwort

### Mit curl
```bash
curl -u staging:DEIN_PASSWORT https://staging.mallorca-map.com/de
```

### Mit wget
```bash
wget --user=staging --password=DEIN_PASSWORT https://staging.mallorca-map.com/de
```

## Passwort ändern

Zum Ändern des Passworts:

```bash
sudo htpasswd /etc/nginx/.htpasswd_staging staging
```

und dann Nginx neuladen:

```bash
sudo systemctl reload nginx
```

## Sicherheits-Hinweise

1. **Starkes Passwort:** Verwende ein komplexes Passwort
   - ✅ Großbuchstaben (A-Z)
   - ✅ Kleinbuchstaben (a-z)
   - ✅ Zahlen (0-9)
   - ✅ Sonderzeichen (!@#$%^&*)
   - ✅ Mindestens 16 Zeichen

2. **HTTPS:** Die Konfiguration erzwingt HTTPS (Redirect von HTTP zu HTTPS)

3. **Dateirechte:** Die Datei sollte nur vom Nginx-Benutzer lesbar sein:
   ```bash
   sudo chmod 644 /etc/nginx/.htpasswd_staging
   sudo chown www-data:www-data /etc/nginx/.htpasswd_staging
   ```

4. **Regelmäßige Passwort-Updates:** Ändere das Passwort regelmäßig (alle 3-6 Monate)

## Konfiguration

### Nginx-Header (deploy/nginx-staging.conf)
```nginx
# Maximale Suchmaschinen-Blockade
add_header X-Robots-Tag "noindex, nofollow, noarchive, noimageindex, nosnippet, notranslate" always;
add_header Cache-Control "no-cache, no-store, must-revalidate, max-age=0, private" always;
add_header Pragma "no-cache" always;
add_header Expires "0" always;

# HTTP Basic Authentication für Staging (PRIMÄRER SCHUTZ)
auth_basic "Staging-Umgebung - Passwort erforderlich";
auth_basic_user_file /etc/nginx/.htpasswd_staging;
```

### robots.txt (apps/web/public/robots.txt)
```
User-agent: *
Disallow: /
```

## Bots und Crawler - Detailliert

Mit dieser Konfiguration können folgende Bots **nicht** zugreifen:

- ❌ Google (Googlebot)
- ❌ Bing (Bingbot)
- ❌ Yandex (YandexBot)
- ❌ Baidu (Baiduspider)
- ❌ DuckDuckGo (DuckDuckBot)
- ❌ Ahrefs (AhrefsBot)
- ❌ Semrush (SemrushBot)
- ❌ Majestic (MJ12Bot)
- ❌ ScrapeBot
- ❌ Alle anderen Crawler

### Warum drei Schichten?

1. **HTTP Basic Auth**: Ist der Hauptschutz - blockiert alles
2. **HTTP-Header**: Für den Fall, dass Auth bypassed wird (sehr unwahrscheinlich)
3. **robots.txt**: Für die ganz hartnäckigen Bots und als offizielle Blockade-Signale

## Fehlerbehebung

### 401 Unauthorized
- Stelle sicher, dass die Datei `/etc/nginx/.htpasswd_staging` existiert
- Überprüfe die Benutzerdaten (staging / Passwort)
- Teste: `curl -u staging:DEIN_PASSWORT https://staging.mallorca-map.com/de -v`

### 403 Forbidden
- Die Datei existiert eventuell nicht oder Nginx kann sie nicht lesen
- Überprüfe die Dateiberechtigungen: `ls -la /etc/nginx/.htpasswd_staging`

### Nginx startet nicht nach Konfigurationsänderung
```bash
sudo nginx -t  # Testet die Konfiguration
sudo systemctl status nginx  # Zeigt Fehler
sudo journalctl -xe  # Detaillierte Fehlerausgabe
```

### Browser speichert Passwort
Das ist normal! Das Passwort wird vom Browser gespeichert. Du kannst es im Passwort-Manager deines Browsers jederzeit löschen.

## Deaktivieren der Authentifizierung

⚠️ **WARNUNG**: Dies macht die Staging-Seite öffentlich!

Um die Authentifizierung zu deaktivieren, kommentiere diese Zeilen in `nginx-staging.conf` aus:

```nginx
# auth_basic "Staging-Umgebung - Passwort erforderlich";
# auth_basic_user_file /etc/nginx/.htpasswd_staging;
```

und lade Nginx neu:

```bash
sudo systemctl reload nginx
```

## Testing

Zum Überprüfen, dass alles funktioniert:

```bash
# Test 1: Ohne Authentifizierung (sollte 401 zurückgeben)
curl -I https://staging.mallorca-map.com/de

# Test 2: Mit Authentifizierung (sollte 200 zurückgeben)
curl -u staging:DEIN_PASSWORT -I https://staging.mallorca-map.com/de

# Test 3: Headers überprüfen
curl -I https://staging.mallorca-map.com/de -u staging:DEIN_PASSWORT | grep -i "x-robots\|cache-control"

# Erwartete Header:
# X-Robots-Tag: noindex, nofollow, noarchive, noimageindex, nosnippet, notranslate
# Cache-Control: no-cache, no-store, must-revalidate, max-age=0, private
```

## Checkliste

Abarbeiten nach dem Setup:

- [ ] `htpasswd` installiert
- [ ] Setup-Skript ausgeführt
- [ ] Passwort eingegeben und gespeichert
- [ ] Nginx mit `sudo systemctl reload nginx` neu geladen
- [ ] Test ohne Auth durchgeführt (sollte 401 geben)
- [ ] Test mit Auth durchgeführt (sollte 200 geben)
- [ ] Suchmaschinen aus Google Search Console entfernt
- [ ] Suchmaschinen aus Bing Webmaster Tools entfernt
- [ ] URL aus Google Cache / Bing Cache entfernt
- [ ] robots.txt überprüft
- [ ] Passwort an sicherer Stelle gespeichert
