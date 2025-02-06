<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const teams = ref([{
  label: 'Starter',
  to: 'https://ui-pro-starter.nuxt.dev/',
  icon: 'i-logos-nuxt-icon'
}, {
  label: 'Landing',
  to: 'https://landing-template.nuxt.dev/',
  icon: 'i-logos-nuxt-icon'
}, {
  label: 'Docs',
  to: 'https://docs-template.nuxt.dev/',
  icon: 'i-logos-nuxt-icon'
}, {
  label: 'SaaS',
  to: 'https://saas-template.nuxt.dev/',
  icon: 'i-logos-nuxt-icon'
}, {
  label: 'Dashboard',
  to: 'https://dashboard-template.nuxt.dev/',
  icon: 'i-logos-nuxt-icon',
  color: 'primary',
  checked: true,
  type: 'checkbox'
}])
const selectedTeam = ref(teams.value[teams.value.length - 1])

const items = computed(() => {
  return [teams.value, [{
    label: 'Create team',
    icon: 'i-lucide-circle-plus'
  }]]
})
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center' }"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-(--ui-bg-elevated)"
      :ui="{
        trailingIcon: 'text-[var(--ui-text-muted)]'
      }"
    />
  </UDropdownMenu>
</template>
