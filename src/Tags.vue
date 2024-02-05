<template>
  <div class="kvass-media-tags">
    <span v-for="(val, i) in value" class="kvass-media-tags__tag">
      <input
        type="text"
        :value="val"
        @input="($ev) => update($ev.target.value, i)"
        @focus="() => onFocus()"
        @blur="($ev) => onBlur($ev.target.value, i)"
        @keypress.enter="add"
        placeholder="..."
        :size="getSize(val)"
      />
      <FontAwesomeIcon :icon="['fa', 'times']" @click="() => remove(i)" />
    </span>
    <button v-if="!isActive" type="button" @click="add">
      <FontAwesomeIcon :icon="['fa', 'tag']" />
      <span>{{ options.labels.tagsPlaceholder }}</span>
    </button>
  </div>
</template>

<script>
import { Options } from '../index'

export default {
  props: {
    value: Array,
  },
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    options() {
      return Options
    },
  },
  methods: {
    add() {
      this.$emit('input', [...this.value, ''])
      this.$nextTick(() => Array.from(this.$el.querySelectorAll('input')).at(-1).focus())
    },
    update(val, i) {
      this.value.splice(i, 1, val)
      this.$emit('input', this.value)
    },
    remove(i) {
      this.value.splice(i, 1)
      this.$emit('input', this.value)
    },
    getSize(value) {
      return Math.max(1, value.length)
    },
    onFocus() {
      this.isActive = true
    },
    onBlur(val, i) {
      this.isActive = false
      if (!val) this.remove(i)
    },
  },
}
</script>

<style lang="scss">
@import './main';

.kvass-media-tags {
  $location: 0.5rem;
  position: absolute;
  top: $location;
  left: $location;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  font-size: 0.8em;

  opacity: 0;
  transform: translateY(-10px);
  transition-property: opacity, transform;
  transition-duration: 100ms;
  transition-timing-function: ease;

  .kvass-media-droparea:hover &,
  &:has(input:focus-within) {
    opacity: 1;
    transform: translateX(0px);
  }

  &__tag {
    position: relative;

    svg {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      translate: 0 -50%;
      cursor: pointer;
      opacity: 0;
      transition: opacity 100ms ease;
    }

    &:hover {
      svg {
        opacity: 0.6;
      }

      input {
        padding-right: 1.5rem;
      }
    }

    input {
      transition: padding-right 100ms ease;
      padding: 0.25rem 0.75rem;
    }
  }

  & input,
  & > button {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    background-color: darken(white, 2%);
    border: 1px solid GetVariable('border-color');
    border-radius: 99px;
    box-shadow: 0 15px 15px -5px rgba(black, 0.2);
    cursor: pointer;

    svg {
      font-size: 0.8em;
      opacity: 0.6;
    }

    &:hover {
      background-color: darken(white, 3%);
    }
  }

  & > button {
    padding: 0.25rem 0.75rem;
  }
}
</style>
