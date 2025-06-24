## Installasjon

```bash
cd appdemo
npm install
```

## Bygg og kjøring

```bash
# Bygg applikasjonen
npm run build

# Start server
npm run serve
```

Gå til `http://localhost:8080` for å se komponenten i aksjon.

## Hvordan det fungerer

1. **App.vue** importerer direkte `../src/Component.vue`
2. Komponenten registreres som `MediaComponent`
3. Brukes i template med `<media-component>`
4. All funksjonalitet fra Component.vue er tilgjengelig

## Props og Events

Komponenten støtter alle props og events fra Component.vue:

- `v-model` for data binding
- `@change` for endringer
- `@focus-point-changed` for focus point endringer
- Alle andre props fra Component.vue

## Teknisk

- Vue 2.6.14
- Webpack 5
- Vue Loader 15
- Ingen ekstra wrapper eller custom upload-funksjon
- Bruker default opplastingsfunksjon fra Component.vue
