<template>
  <div class="alt-text-editor">
    <div class="alt-text-editor__image-preview">
      <img :src="value.url" alt="" />
    </div>

    <div class="alt-text-editor__form">
      <div class="kvass-media__label-wrapper">
        <label class="kvass-media__label">
          {{ labels.altTextLabel || 'Alt Text' }}
        </label>
        <span class="kvass-media__sublabel">
          {{ labels.altTextDescription || 'Describe the image for screen readers and SEO.' }}
        </span>
      </div>

      <textarea
        v-model="internalAlt"
        class="alt-text-editor__input"
        rows="4"
        :placeholder="labels.altTextPlaceholder || 'Enter alt text...'"
      ></textarea>
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
        this.internalAlt = newValue.alt || ''
      },
      immediate: true,
    },
  },
  methods: {
    save() {
      this.$emit('save', {
        ...this.value,
        alt: this.internalAlt,
      })
    },
  },
}
</script>

<style lang="scss">
@import './main';

.alt-text-editor {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  min-height: 300px;

  &__image-preview {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f4f4;
    border-radius: 4px;
    padding: 1rem;
    max-width: 50%;

    img {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
