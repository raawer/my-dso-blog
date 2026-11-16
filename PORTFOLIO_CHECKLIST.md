# Projektabgabe – Docusaurus Portfolio

Bitte erfülle alle Punkte auf dieser Liste, bevor du das Projekt einreichst. Solltest du weitere Extras eingebaut haben, erwähne das kurz, damit sich die Mentoren dies bei Bedarf anschauen können.

## 1. Repository

### Vorhandene Dateien

- [ ] Das Repository enthält mehrere Commits, die zum Erstellen des Portfolios erstellt wurden
  - [ ] Aus deiner History lässt sich erkennen, dass du mit Hilfe von Feature-Branches einzelne Unteraufgaben des Portfolios entwickelt hast
  - [ ] Die Feature-Branches wurden über Pull-Requests in den Haupt-Entwicklungsbranch des Repositories gemerged
- [ ] Eine Datei namens README.md ist vorhanden und entsprechend der Kriterien unten erweitert worden
- [ ] Es befinden sich keine weiteren Dateien im Repository, ohne dass diese explizit in der README.md benannt und beschrieben werden.

### Portfolio-Komponenten

- [ ] Dein Portfolio beinhaltet die geforderten Sektionen:
  - [ ] Header
  - [ ] Hero
  - [ ] My-Skills
  - [ ] My Project-Highlights
  - [ ] Contact
  - [ ] Footer
- [ ] Jede der oben genannten Sektionen besteht aus jeweils mindestens einer React-Component
- [ ] Die Sektionen werden in der Datei src/pages/index.tsx zu einem Layout zusammengesetzt
- [ ] Alle Komponenten sind jeweils in einem eigenen Ordner innerhalb von src/components gespeichert
  - [ ] Die Datei, in der die eigentliche Komponente erstellt wird, heißt index.tsx
  - [ ] CSS-Dateien sind css-modules und entsprechend der Komponente benannt, bspw. button.module.css für das Stylesheet eines Buttons.

### README.md

- [ ] Die README sollte ein Inhaltsverzeichnis a.k.a. eine Table-of-Contents (ToC) enthalten
  - [ ] Die einzelnen Sektionen sind in der ToC verlinkt
- [ ] Eine Sektion mit einer Beschreibung des Repositories muss vorhanden sein. In dieser Beschreibung sollte genannt werden, was die wesentlichen Inhalte sind und was der Zweck des Repositories ist
- [ ] Eine Sektion "Quickstart" sollte als Teil der README enthalten sein. Hier sollen kurz die Voraussetzungen genannt und eine Schnellstart-Anleitung beschrieben sein.
  - [ ] Es sollte hierbei eine Sektion how-to-start geben
- [ ] Es soll eine ausführliche Variante der vorgenannten Sektion als "Usage" enthalten sein. Hier soll genauer auf die Konfiguration und Konfigurierbarkeit eingegangen werden, d.h. es soll auch erklärt werden, wie relevante Passagen modifiziert werden können, um andere Resultate zu erzielen.
  - [ ] Es muss dokumentiert sein, wie man das Projekt startet
  - [ ] Es muss dokumentiert sein, wie man einen Build des Projektes durchführt
  - [ ] Es muss dokumentiert sein, wie das Projekt bereitgestellt werden kann, bspw. mit NGINX oder GitHub/GitLab Pages

## 2. Dokumentation

Die Dokumentation des Codes sowie des Projektes soll im Repository in Form einer README-Datei stattfinden.
Die Dokumentationssprache für alle Projekte (und zugehörige Unterlagen) ist Englisch.

## 3. Hinweise

### Allgemeine Hinweise

- [ ] Zusätzlich zu deinem GitHub-Repository solltest du ein kurzes Loom-Video (maximal 5 min.) aufnehmen und bereitstellen, in dem du kurz deine Abgabe zeigst und vorstellst, was du getan hast – dabei musst du nicht alle Details erwähnen, jedoch sollst du auf alle relevanten Schritte kurz eingehen und diese zeigen.
- [ ] Bei Fragen melde dich gerne über das Ticketsystem
  - [ ] Bitte mache ein Frage-Ticket im entsprechenden Channel auf, um Fragen zu stellen
  - [ ] Wenn du dein Projekt einreichst, dann sollten keine Unklarheiten oder Ähnliches mehr offen sein. Bei Fragen oder Unklarheiten deinerseits behalten wir uns vor, eine Abgabe direkt abzulehnen

### Sicherheitshinweise

- [ ] Speichere keine SSH-Keys im Workspace deines Git-Repositories
- [ ] Speichere keine Passwörter, Tokens oder Benutzernamen in deinem Code. Verwende hierfür stattdessen Environment-Variablen
- [ ] Speichere keine IP-Adressen oder sonstigen sensiblen Informationen in einem Git-Repository

### Code-Konventionen

- [ ] React Components:
  - [ ] sollten innerhalb von src/components gespeichert werden
  - [ ] Der Ordnername sollte dabei im kebab-case benannt sein -> CustomButton -> custom-button
  - [ ] Die Datei, die die Component enthält, heißt index.tsx
  - [ ] Die Component selbst ist im PascalCase benannt, d.h. jeder Anfangsbuchstabe eines Wortes wird groß geschrieben
- [ ] In deinem Code sollte kein Wert vom Typ any vorkommen. Das heißt, Eigenschaften deiner Components sollten entsprechend auch mit einem TypeScript-Interface modelliert und typisiert werden.
- [ ] Kritische Konfiguration wie Tokens, Passwörter oder Ähnliches sollte nicht im Code-Repository gespeichert sein, sondern bspw. durch die Verwendung eines .env-files in einen Container hineingegeben werden

### Testing

Bevor du dein Projekt einreichst, solltest du die folgenden Dinge sicherstellen und getestet haben:

- [ ] Die Anwendung kann lokal und in der CI-Pipeline gebaut werden
- [ ] Die Anwendung wird bei einem Commit auf den Default-Branch nach GitHub Pages deployed und ist zum Zeitpunkt der Abnahme auf dem aktuellsten Stand
