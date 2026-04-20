# Mobilček Servis - statična spletna stran

To je enostavna statična spletna stran, primerna za GitHub Pages ali katerikoli drug hosting za HTML/CSS/JS.

## Vključeno
- Domov
- Telefonija
- Računalniki
- Bela tehnika
- O nas
- Nagradna igra
- Mini igra za bonus kodo
- Funkcionalna košarica
- Koda popusta `MOBILČEK2026` za 25 %
- Recenzije z demo admin odgovorom

## Pomembno
Ta projekt uporablja samo front-end in `localStorage`.
To pomeni:
- košarica deluje lokalno v brskalniku,
- recenzije se shranjujejo lokalno,
- admin dostop z e-pošto je samo demo in ni varen za pravo javno uporabo,
- prijava v nagradno igro je demo in ne vsebuje pravega plačila.

Za pravo produkcijo dodaj backend za:
- avtentikacijo,
- plačila,
- bazo podatkov,
- pošiljanje mailov,
- varno administracijo.

## GitHub Pages objava
1. Ustvari nov repository na GitHubu.
2. Naloži vse datoteke iz tega ZIP paketa v root repozitorija.
3. V GitHub repozitoriju odpri **Settings > Pages**.
4. Pod **Build and deployment** izberi **Deploy from a branch**.
5. Izberi branch **main** in mapo **/(root)**.
6. Shrani.
7. Po nekaj minutah bo stran objavljena.

## Monkey / drug static host
Če hosting podpira HTML/CSS/JS, naloži celotno vsebino mape brez spreminjanja strukture.
Glavna datoteka je `index.html`.
