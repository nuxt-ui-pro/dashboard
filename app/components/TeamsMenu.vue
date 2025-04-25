<script setup lang="ts">
defineProps<{
  collapsed?: boolean
}>()

const { t } = useI18n()

const teams = ref([{
  label: 'Nuxt',
  avatar: {
    src: 'https://github.com/nuxt.png',
    alt: 'Nuxt'
  }
}, {
  label: 'NuxtHub',
  avatar: {
    src: 'https://github.com/nuxt-hub.png',
    alt: 'NuxtHub'
  }
}, {
  label: 'NuxtLabs',
  avatar: {
    src: 'https://github.com/nuxtlabs.png',
    alt: 'NuxtLabs'
  }
}])
const selectedTeam = ref(teams.value[0])

const items = computed(() => {
  return [teams.value.map(team => ({
    ...team,
    onSelect() {
      selectedTeam.value = team
    }
  })), [{
    label: t('layout.teams.menu.create_team'),
    icon: 'i-lucide-circle-plus'
  }, {
    label: t('layout.teams.menu.manage_teams'),
    icon: 'i-lucide-cog'
  }]]
})
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
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
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-(--ui-text-dimmed)'
      }"
    />
  </UDropdownMenu>
</template>
