<template>
  <div v-if="!hasOnlyImage" class="kvass-media-type-selector">
    <span class="kvass-media-type-selector__info">{{ hasImage ? `${label.selectMessage}` : label.selectMessage }}</span>
    <DropdownComponent>
      <ButtonComponent :label="label.select" icon="plus" type="button" class="kvass-media-type-selector__action" />
      <template #dropdown>
        <component
          :is="item.components.CreateTrigger"
          v-for="item in value"
          :key="item.name"
          v-tooltip="isFull(item) ? label.typeLimitReached(item) : null"
          :class="{ 'kvass-media-type-selector__trigger--disabled': isFull(item) }"
          @click.native="!isFull(item) && open(item)"
        />
      </template>
    </DropdownComponent>

    <TypeEditor :show.sync="show" :upload="upload" @submit="submit"></TypeEditor>
  </div>
</template>

<script>
import { Options } from '../index'
import { ButtonComponent } from 'vue-elder-button'
import { DropdownComponent } from 'vue-elder-dropdown'
import TypeEditor from './TypeEditor.vue'

export default {
  props: {
    value: Array,
    items: Array,
    upload: Function,
    hasImage: Boolean,
  },
  data() {
    return {
      show: null,
    }
  },
  computed: {
    hasOnlyImage() {
      if (this.value.length === 1 && this.value[0].name === 'Image') return true
      return false
    },

    label() {
      return Options.labels
    },
  },
  methods: {
    submit(data) {
      this.$emit('add', data)
    },
    isFull(type) {
      return Boolean(type.max) && this.items.filter(type.condition).length >= type.max
    },
    open(item) {
      if (item.name === 'Image') return this.$parent.$refs.input.click()
      this.show = item
    },
  },
  components: {
    ButtonComponent,
    DropdownComponent,
    TypeEditor,
  },
}
</script>

<style lang="scss">
.kvass-media-type-selector {
  display: flex;
  font-size: 0.9em;
  flex-direction: column;
  align-items: center;

  .elder-dropdown__content {
    button {
      padding: 0.5rem;
      justify-content: space-between;
    }

    .kvass-media-type-selector__trigger--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__info {
    margin-bottom: 0.5rem;
  }
}
</style>
