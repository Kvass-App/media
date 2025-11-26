<template>
  <div class="image-metadata-editor">
    <div class="image-metadata-editor__preview">
      <div class="image-metadata-editor__image-wrapper">
        <img :src="value.url" alt="" />
      </div>
    </div>

    <div class="image-metadata-editor__form">
      <div class="kvass-media__form-group">
        <div class="kvass-media__label-wrapper">
          <label class="kvass-media__label">
            {{ labels.descriptionPlaceholder || 'Caption' }}
          </label>
          <span class="kvass-media__sublabel">
            {{ labels.captionDescription || 'Synlig tekst som vises under bildet.' }}
          </span>
        </div>
        <textarea
          v-model="internalCaption"
          class="image-metadata-editor__input"
          :placeholder="labels.descriptionPlaceholder"
          rows="4"
        ></textarea>
      </div>

      <div class="kvass-media__form-group">
        <div class="kvass-media__label-wrapper">
          <label class="kvass-media__label">
            {{ labels.altTextLabel || 'Alt tekst' }}
          </label>
          <span class="kvass-media__sublabel">
            {{ labels.altTextDescription || 'Beskrivelse for skjermlesere og SEO (ikke synlig på siden).' }}
          </span>
        </div>
        <textarea
          v-model="internalAlt"
          class="image-metadata-editor__textarea"
          rows="4"
          :placeholder="labels.altTextPlaceholder || 'Beskriv bilde...'"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { Options } from '../index'

export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      internalCaption: '',
      internalAlt: '',
    }
  },
  computed: {
    labels() {
      return Options.labels
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.internalCaption = newValue.description || ''
        this.internalAlt = newValue.alt || ''
      },
      immediate: true,
    },
  },
  methods: {
    save() {
      this.$emit('save', {
        ...this.value,
        description: this.internalCaption,
        alt: this.internalAlt,
      })
    },
  },
}
</script>

<style lang="scss">
@import './main';

.image-metadata-editor {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  min-height: 400px;

  &__preview {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 1rem;
  }

  &__image-wrapper {
    min-width: 100%;
    min-height: 100%;

    img {
      display: block;
      max-width: 100%;
      max-height: 350px;
      object-fit: contain;
    }
  }

  &__form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__input,
  &__textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid GetVariable('border-color');
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.95rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: GetVariable('primary');
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 100px;
  }
}
</style>
