# Projektabgabe – Juice Shop Meister

Bitte erfülle alle Punkte auf dieser Liste, bevor du das Projekt einreichst. Solltest du weitere Extras eingebaut haben, erwähne das kurz, damit sich die Mentoren dies bei Bedarf anschauen können.

## Inhalt

- [1. Challenges](#1-challenges)
  - [Wahl der Challenges](#wahl-der-challenges)
  - [Das Abgabe-Video](#das-abgabe-video)
  - [Lösungen und Materialien](#lösungen-und-materialien)
- [2. Dokumentation](#2-dokumentation)
  - [Allgemeines](#allgemeines)
  - [Sicherheitshinweise](#sicherheitshinweise)
  - [Testing](#testing)

## 1. Challenges

### Wahl der Challenges

- [ ] Für die Abgabe des Projektes solltest du dir min. 2 und max. 4 Hacking Challenges innerhalb des Juice-Shops aussuchen, die du eigenständig lösen und dokumentieren willst.
- [ ] Deine Challenges sollten nicht alle aus demselben Bereich kommen. Zum Beispiel sind drei Videos mit XSS-Attacken nicht zulässig.

### Das Abgabe-Video

- [ ] Für jede ausgesuchte Challenge muss ein Video für die Abgabe vorbereitet, aufgenommen und als Teil der Dokumentation hinzugefügt werden.
- [ ] Deine Videos sind nicht länger als 5 Minuten pro Video.
- [ ] Dein Video sollte die Dokumentation der Challenge sowie die Durchführung der Cyberattacke beinhalten, während du die durchgeführten Schritte kommentierst und kurz erklärst.

### Lösungen und Materialien

- [ ] Die Haupt-README sollte ein Inhaltsverzeichnis a.k.a. eine Table of Contents (ToC) enthalten.

## 2. Dokumentation

Die Dokumentation des Codes sowie des Projektes soll im Repository in Form einer Markdown-Datei stattfinden.
Die Dokumentationssprache für alle Projekte (und zugehörige Unterlagen) ist Englisch.

Der Aufbau des Projektes ist wie folgt:

- [ ] Es wird das bereits vorhandene Docusaurus-Projekt genutzt.
- [ ] Es gibt einen Hauptordner mit dem Namen „Juice Shop Master“.
  - [ ] Es gibt dort eine `README.md` mit den folgenden Punkten:
    - [ ] Es gibt ausschließlich eine `<h1>` an erster Stelle der README.
    - [ ] Direkt darunter ist eine Projektbeschreibung (max. 2–5 Sätze).
    - [ ] Es gibt einen Table of Contents (ToC).
    - [ ] Es gibt eine Quickstart-Section.
- [ ] Pro Challenge gibt es einen Unterordner.
  - [ ] Darin enthalten ist die Dokumentation der Challenge
  - [ ] und ggf. Bilder.

Die Challenge-Dokumentation sollte in der Haupt-README verlinkt werden.

### Allgemeines

- [ ] Stelle in der README deines Projektes sicher, dass du darauf hinweist, dass der Inhalt der Dokumentation rein zu Bildungszwecken dient.
- [ ] Stelle deine Challenge-Lösung und die verwendeten Ressourcen kurz in einem Video von maximal 5 Minuten vor.
- [ ] Alle Challenge-Videos sollten in der README deines Abgabe-Repositories verlinkt sein. Zusätzlich solltest du auch die Kategorie deiner Challenge-Abgabe mit dazu nennen und kurz erklären, welche Gefahren die ausgenutzte Sicherheitslücke birgt und welche weitreichenden Konsequenzen es haben kann, für diese Art von Sicherheitslücke anfällig zu sein.

### Sicherheitshinweise

- [ ] Verwende beim Hacken keine echten Personen- oder sonstigen Daten zu (d)einer Person.
- [ ] Speichere keine SSH-Keys im Workspace deines Git-Repositories.
- [ ] Speichere keine Passwörter, Tokens oder Benutzernamen in deinem Code. Verwende hierfür stattdessen Environment-Variablen.
- [ ] Speichere keine IP-Adressen oder sonstigen sensiblen Informationen in einem Git-Repository.

### Testing

Bevor du dein Projekt einreichst, sollten die folgenden Dinge sichergestellt und getestet sein:

- [ ] Die Challenges werden kurz erklärt. Dabei wird auch erklärt, wie genau man die Sicherheitslücke ausnutzen will und welche Schritte dazu notwendig sind.
- [ ] Die Hacks lassen sich mit Hilfe des Videos rekonstruieren bzw. reproduzieren und funktionieren auch entsprechend wie gezeigt.
