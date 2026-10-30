![cover](./public/cover.png)

# Kto dla kogo?

Losowanie prezentów dla rodziny i znajomych: każdy uczestnik robi prezent **dokładnie jednej** osobie.
Zamiast 13 drobiazgów w 14-osobowej rodzinie — jeden przemyślany prezent.

https://kto-dla-kogo.vercel.app

## Funkcje

- okazja z nazwą, budżetem i datą wręczenia,
- 3–30 uczestników (dowolna liczba, także nieparzysta), unikalne imiona,
- wykluczenia par (np. małżonkowie nie trafią na siebie),
- prywatny link dla każdej osoby — wysyłany SMS-em, WhatsAppem lub kopiowany; wynik zakodowany w `/wynik#…`, bez backendu.

## Algorytm

[`lib/draw.ts`](lib/draw.ts): najpierw losowanie Fisher–Yates z odrzucaniem (rozkład jednostajny),
a gdy wykluczenia są bardzo restrykcyjne — randomizowane dopasowanie dwudzielne (algorytm Kuhna).
Jeśli poprawne przypisanie nie istnieje, zwraca `{ ok: false, reason: 'impossible' }`.

## Struktura

```
app/                 trasy: / (start), /losowanie (kreator), /wynik (odkrycie wyniku), /dotacja
features/draw/       kreator: kroki, stan (Context + useReducer + localStorage)
features/reveal/     strona odkrycia wyniku
lib/                 czysta logika: draw, share, phone, storage, format
model/               schematy zod
components/          współdzielone: header, footer, coffee, regulations, ui (shadcn)
```

## Uruchomienie

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```
