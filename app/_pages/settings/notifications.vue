<script setup lang="ts">
const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true
})

const sections = [{
  title: 'Notification channels',
  description: 'Where can we notify you?',
  fields: [{
    name: 'email',
    label: 'Email',
    description: 'Receive a daily email digest.'
  }, {
    name: 'desktop',
    label: 'Desktop',
    description: 'Receive desktop notifications.'
  }]
}, {
  title: 'Account updates',
  description: 'Receive updates about Nuxt UI.',
  fields: [{
    name: 'weekly_digest',
    label: 'Weekly digest',
    description: 'Receive a weekly digest of news.'
  }, {
    name: 'product_updates',
    label: 'Product updates',
    description: 'Receive a monthly email with all new features and updates.'
  }, {
    name: 'important_updates',
    label: 'Important updates',
    description: 'Receive emails about important updates like security fixes, maintenance, etc.'
  }]
}]

async function onChange() {
  // Do something with data
  console.log(state)
}
</script>

<template>
  <UDashboardPanelContent class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800">
    <UDashboardSection
      v-for="(section, index) in sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      orientation="horizontal"
      class="px-4 py-6"
    >
      <UCard :ui="{ body: { base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col' } }">
        <UFormGroup
          v-for="field in section.fields"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :description="field.description"
          class="flex items-center justify-between pt-4 first:pt-0 gap-2"
          :ui="{ container: 'flex' }"
        >
          <UToggle
            v-model="state[field.name]"
            size="md"
            @update:model-value="onChange"
          />
        </UFormGroup>
      </UCard>
    </UDashboardSection>
  </udashboardpanelcontent>
</template>
