<script setup lang="ts">
const { t } = useI18n()

const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true
})

const sections = computed(() => [{
  title: t('notifications.settings.channels.title'),
  description: t('notifications.settings.channels.description'),
  fields: [{
    name: 'email',
    label: t('notifications.settings.channels.email.label'),
    description: t('notifications.settings.channels.email.description')
  }, {
    name: 'desktop',
    label: t('notifications.settings.channels.desktop.label'),
    description: t('notifications.settings.channels.desktop.description')
  }]
}, {
  title: t('notifications.settings.updates.title'),
  description: t('notifications.settings.updates.description'),
  fields: [{
    name: 'weekly_digest',
    label: t('notifications.settings.updates.weekly_digest.label'),
    description: t('notifications.settings.updates.weekly_digest.description')
  }, {
    name: 'product_updates',
    label: t('notifications.settings.updates.product_updates.label'),
    description: t('notifications.settings.updates.product_updates.description')
  }, {
    name: 'important_updates',
    label: t('notifications.settings.updates.important_updates.label'),
    description: t('notifications.settings.updates.important_updates.description')
  }]
}])

async function onChange() {
  // Do something with data
  console.log(state)
}
</script>

<template>
  <div v-for="(section, index) in sections" :key="index">
    <UPageCard
      :title="section.title"
      :description="section.description"
      variant="naked"
      class="mb-4"
    />

    <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
      <UFormField
        v-for="field in section.fields"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :description="field.description"
        class="flex items-center justify-between not-last:pb-4 gap-2"
      >
        <USwitch
          v-model="state[field.name]"
          @update:model-value="onChange"
        />
      </UFormField>
    </UPageCard>
  </div>
</template>
