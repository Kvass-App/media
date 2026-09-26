[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# @kvass/media

The **Vue 2** media field used across the Kvass admin. Editors use it to attach images and other media to projects, units, posts, pages, products and more. It gives you:

- a drop zone and file picker that uploads through a pluggable `upload` function, with a progress indicator
- a large preview of the selected item, and a sortable thumbnail strip for `multiple` fields
- per-item actions: remove, download, focus point, caption and alt text, tags
- a **«Velg» / Select menu** for adding media that is not a file (Vimeo, YouTube, StoryFly, Walkable …)

Only images are built in. Every other media type is a plugin, and the Kvass ones live in [`@kvass/media-types`](https://github.com/Kvass-App/media-types).

Where editors meet it:

- the cover and gallery fields of projects, the cover field of posts, and the logo and favicon fields of projects and pages
- every custom-fields field of type `Media`, `MediaMultiple`, `Image` and `Images` (via [`@kvass/custom-fields`](https://github.com/Kvass-App/custom-fields))
- product, shop, task, user and company images

## Install

```sh
npm install @kvass/media
```

The package is published **as source**: `main` is `index.js`, which imports `.vue` files and SCSS. The host must compile Vue 2 single-file components and Sass. The host must also provide:

- **Vue 2**. The package relies on `$listeners`, `.native`, filters, vuedraggable 2 and vue-simple-portal.
- **The `v-tooltip` directive** from `v-tooltip` 2.x, registered globally. It is used for the «Velg» menu tooltip.
- **Styling hooks:** CSS variables `--vue-elder-primary`, `--vue-elder-error`, `--vue-elder-border-radius`, `--vue-elder-border-color` and `--vue-elder-input-color`. They have SCSS fallbacks.

## Setup

Configure the package once, before the first field renders. The package has no translations of its own, so its texts come from `labels`, and the drop zone text from `dropMessage`.

```js
import { setup } from '@kvass/media'

setup({
  // (file, onProgress, uploadOptions) => Promise<item | item[]>
  upload: (file, onProgress, options) => upload(file, onProgress, options),
  // An HTML string, or a component
  dropMessage: MediaOnDrop,
  labels: {
    image: i18n.tc('image', 1),
    select: i18n.t('select'),
    cancel: i18n.t('cancel'),
    save: i18n.t('save'),
    descriptionPlaceholder: i18n.t('mediaDescriptionPlaceholder'),
    selectMessage: i18n.t('mediaTypeDefaultMessage'),
    tagsPlaceholder: `${i18n.t('add')} ${i18n.tc('tag', 1).toLowerCase()}`,
    dragInstructions: i18n.t('focusPointDragInstructions'),
    focusPointTitle: i18n.t('focusPointTitle'),
    focusPointDescription: i18n.t('focusPointDescription'),
    resetFocusPoint: i18n.t('resetFocusPoint'),
    // A function: it is called with the media type when the field is full
    typeLimitReached: type => i18n.tc('mediaTypeLimitReached', type.max, { type: type.name, max: type.max }),
    altTextLabel: i18n.t('altTextLabel'),
    altTextDescription: i18n.t('altTextDescription'),
    captionDescription: i18n.t('captionDescription'),
  },
})
```

`labels` is **merged** into the current labels, so a call only has to pass the labels it changes. A label that no call sets falls back to its English default. `altTextLabel`, `altTextDescription` and `captionDescription` have no default and render empty. Every other option **replaces** the current value.

### Options

| Key | Default | What it does |
| --- | --- | --- |
| `upload` | A stub that warns and returns a data URL | Uploads one file and resolves to the stored item (or an array of items). It gets the field's `upload-options` as the third argument. |
| `dropMessage` | `'Drag an image here or <b>browse</b> to upload.'` | The text in the drop zone. It can be HTML or a component. The `drop-message` slot overrides it. |
| `labels` | English strings for most keys | Every label the field shows. See the example above for the keys. The optional `altTextPlaceholder` falls back to `...`. |
| `serialize` | Identity function | Not used. |

## Usage

```vue
<template>
  <MediaComponent
    v-model="gallery"
    :label="$t('gallery')"
    :types="types"
    multiple
    enable-focus-point
    :upload-options="{ compression: 'gallery' }"
  />
</template>

<script>
import { MediaComponent } from '@kvass/media'
import { getMediaTypes } from '@kvass/media-types'

export default {
  components: { MediaComponent },
  data() {
    return {
      gallery: [],
      // The media types this account allows, plus the built-in 'Image'
      types: getMediaTypes(this.$store.state.enums.MediaTypes),
    }
  },
}
</script>
```

### Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `Array \| Object` | – | `v-model`. An object for a single field, an array when `multiple`. |
| `types` | `Array` | `['Image']` | The media types the field accepts. The string `'Image'` is the built-in type, and objects are external types (see [Media types](#media-types)). **It must include `'Image'`:** without it the drop zone, and with it the «Velg» menu, is disabled. |
| `multiple` | `Boolean` | `false` | Several items, with a thumbnail strip. |
| `sortable` | `Boolean` | `true` | Items can be reordered by dragging. |
| `label`, `sublabel` | `String` | – | The field label and the text under it. |
| `upload` | `Function` | `Options.upload` | Overrides the global upload for this field. |
| `upload-options` | `Object` | `{}` | Passed to `upload` as its third argument, e.g. `{ compression: 'gallery' }`. |
| `size` | `String` | `'cover'` | `background-size` of the preview. |
| `placement` | `'outside' \| 'inside'` | `'outside'` | `inside` places the thumbnails over the bottom of the drop zone. |
| `tags` | `Boolean` | `false` | Shows a tag editor for the selected item. |
| `enable-focus-point` | `Boolean` | `false` | Focus point editor for images. |
| `enable-alt` | `Boolean` | `true` | Alt text and caption editor for images. |
| `enable-description` | `Boolean` | `true` | The caption field in that editor. |

Attributes, not props: `disabled`, `required` and `accept`. `accept` defaults to `'image/*'`. All attributes also land on the root `div.kvass-media`.

**Events:** `input`. It is emitted when an item is added, removed, reordered or edited. A single field emits `null` when its item is removed.

**Slots:** `after-label`, `sublabel`, `drop-message`, `custom-message`, and `bottom` (between the drop zone and the thumbnails).

### Media items

An uploaded image, as the admin stores it:

```js
{
  name: 'facade.jpg',
  size: 482113,
  url: 'https://assets.kvass.no/…',
  type: 'image/jpeg',
  dimensions: [2400, 1600],
  description: 'Caption', // Set in the alt/caption editor
  alt: 'Alt text',
  focus: { x: 0.42, y: 0.6 }, // 0–1 fractions, or null when centred
  tags: [],
}
```

Other media types store whatever their `Create` component returns, for example:

```js
{ type: 'walkable', url: 'https://player.walkable.visuado.com/<slug>', name: '…', size: 0, thumbnail: 'https://assets.kvass.no/…' }
```

On the server, built-in media fields (such as a project's `media.cover` and `media.gallery`) are saved with the file subdocument schema, `server/models/subdocuments/file`. That schema only keeps its own fields, so a type that needs a new field there must add it to the schema too. Items in custom fields are stored in the `Mixed` `customFields` object and keep all their fields.

## Media types

A media type is a plain object:

```js
{
  name: 'Walkable', // The type's id, also used in the type-limit message; 'Image' is special-cased by name
  condition: item => /^walkable/i.test(item.type), // Recognises stored items; the first match wins
  max: 1, // Optional: how many of this type one field may hold
  components: { CreateTrigger, Create, Thumbnail, Preview },
}
```

| Component | Receives | Must |
| --- | --- | --- |
| `CreateTrigger` | – | Render one root element. It is the entry in the «Velg» menu and is clicked with `@click.native`. |
| `Create` | `value` (the item when editing, `null` when adding), `upload` | Emit `update:isValid` (the Save button is disabled while it is `false`) and implement `async prepareData()`, which returns the item. It is rendered inside a `<form>` in a modal. |
| `Thumbnail` | `value` (the item) | `$emit('click')` to select the item. |
| `Preview` | `value`, `size` | Show the selected item. |

- **Type limit (`max`):** when a field already holds `max` items of a type, that entry in the «Velg» menu is greyed out. Hovering it shows `labels.typeLimitReached(type)`. The limit is only enforced in the menu. The server, drag and drop, and editing do not check it.
- **Every stored item must match a type.** An item that no type recognises breaks the field. This happens, for example, when a type is removed from an account while items of that type still exist.

See [`@kvass/media-types`](https://github.com/Kvass-App/media-types) for the Kvass types, and for how to add one.

## Development

There is no build step and there are no tests. Develop against the admin:

1. Mount the package into the admin container in `client-admin/docker-compose.yml`:
   ```yaml
   - ~/Kvass/packages/media:/usr/app/node_modules/@kvass/media
   ```
2. **Do not run `npm install` inside this package.** Imports must resolve from the admin's `node_modules`. A local `node_modules` would give the field its own copy of Vue and of its dependencies (`vue-elder-button`, `vue-elder-modal` and others). Those copies miss the admin's configuration.
3. Edits are picked up by the admin's dev server.
4. Remove the mount before you merge the admin.

Formatting follows `.prettierrc` (no semicolons, single quotes, width 120).

**Keep the code parseable by webpack 4.** The admin builds with Vue CLI 3 and webpack 4. The package's `.js` files are not transpiled, and the Babel that runs on its `.vue` files does not rewrite optional chaining (`?.`) or nullish coalescing (`??`). webpack 4 cannot parse them, so do not use them.

## Releasing

Releases are automatic. A push to `master` runs [semantic-release](https://github.com/semantic-release/semantic-release) (`.github/workflows/semantic-release.yml`). It picks the version from the commit messages, publishes to npm, and creates a GitHub release and tag.

- Write [Conventional Commits](https://www.conventionalcommits.org):
  - `fix:` gives a patch release.
  - `feat:` gives a minor release.
  - `BREAKING CHANGE:` gives a major release.
- **The `version` in `package.json` is not updated.** The git tags and npm hold the real version.

Consumers pin exact versions. After a release, bump them in this order:

1. `@kvass/custom-fields`: bump `@kvass/media` and release custom-fields.
2. `client-admin`: bump `@kvass/media` and `@kvass/custom-fields`.

Keep the two pins of `@kvass/media` equal. Otherwise npm installs a second copy, and that copy has its own `Options`.

## Maintenance notes

- **There are two setup calls.** `client-admin/src/components/setup.js` and `@kvass/custom-fields` `src/Field.vue` both call `setup()`, and they share one `Options` object in the admin.
  - Labels are merged, so a label set by either call is kept.
  - `upload` and `dropMessage` are replaced, so the call that ran last wins. custom-fields runs its setup for every field it renders, which replaces the admin's upload defaults (`compression: 'gallery'` and the upload `transform`).
- **Items are identified by `url`.** Two items with the same URL are selected, edited and removed together.
- **The `upload` prop is not passed to a type's `Create` when adding.** Types that upload should use `Options.upload`.
- **The class names are a public API.** The admin, custom-fields and media-types override `.kvass-media*` classes, so renaming one is a breaking change.
- **Unused dependency:** `vue-elder-input` is not used.
