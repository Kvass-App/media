<template>
  <div v-if="!hasOnlyImage" class="kvass-media-type-selector">
    <span class="kvass-media-type-selector__info">{{
      hasImage ? ` / ${label.selectMessage.toLowerCase()}` : label.selectMessage
    }}</span>

    <DropdownComponent>
      <ButtonComponent :label="label.select" type="button" class="kvass-media-type-selector__action" />
      <template #dropdown>
        <component
          :is="item.components.CreateTrigger"
          v-for="item in value"
          :key="item.name"
          @click.native="open(item)"
        />
      </template>
    </DropdownComponent>
    <Portal>
      <ModalComponent :show="Boolean(show)" @close="show = null" class="kvass-media-type-selector__modal">
        <Card theme="flat" tag="form" @submit.prevent="submit">
          <template #default>
            <component
              v-if="show"
              :is="show.components.Create"
              :is-valid.sync="isValid"
              :upload="upload"
              ref="creator"
              v-on="$listeners"
            />
          </template>
          <template #footer>
            <ButtonComponent :label="label.cancel" type="button" @click="show = null" />
            <ButtonComponent
              theme="primary"
              :disabled="!isValid"
              :promise="promise"
              :label="label.save"
              type="submit"
              @onSuccess="show = null"
            />
          </template>
        </Card>
      </ModalComponent>
    </Portal>
  </div>
</template>

<script>
import { Options } from '../index'

import { ModalComponent } from 'vue-elder-modal'
import { ButtonComponent } from 'vue-elder-button'
import Card from '@kvass/card'
import { DropdownComponent } from 'vue-elder-dropdown'
import { Portal } from '@linusborg/vue-simple-portal'

export default {
  props: {
    value: Array,
    upload: Function,
    hasImage: Boolean,
  },
  data() {
    return {
      show: null,
      promise: null,
      isValid: true,
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
    submit() {
      if (!this.isValid) return
      this.promise = this.$refs.creator.prepareData().then((data) => {
        this.$emit('add', data)
      })
    },
    open(item) {
      if (item.name === 'Image') return this.$parent.$refs.input.click()
      this.show = item
    },
  },
  components: {
    ModalComponent,
    Card,
    ButtonComponent,
    DropdownComponent,
    Portal,
  },
}
</script>

<style lang="scss">
.kvass-media-type-selector {
  margin-top: 0.5rem;
  display: flex;
  font-size: 0.9em;
  flex-direction: column;
  align-items: center;

  &__info {
    margin-bottom: 1rem;
  }
}
.kvass-card {
  max-width: 700px;
  width: 100%;
}
</style>