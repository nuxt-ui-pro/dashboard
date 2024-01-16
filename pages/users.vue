<script lang="ts" setup>
const input = ref<{ input: HTMLInputElement }>()

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})

const defaultColumns = [{
  key: 'id',
  label: '#'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'email',
  label: 'Email',
  sortable: true
}]

type User = {
  id: number
  name: string
  email: string
}

const q = ref('')
const selected = ref<User[]>([])
const selectedColumns = ref(defaultColumns)
const sort = ref({ column: 'id', direction: 'asc' as const })

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)))

const { data: users, pending } = await useLazyAsyncData<User[]>('users', () => $fetch('https://jsonplaceholder.typicode.com/users', {
  query: {
    q: q.value,
    _sort: sort.value.column,
    _order: sort.value.direction
  }
}), {
  default: () => [],
  watch: [q, sort]
})

function onSelect (row: User) {
  const index = selected.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel>
      <UDashboardNavbar>
        <template #title>
          Users <UBadge :label="users.length" variant="subtle" size="xs" />
        </template>

        <template #right>
          <USelectMenu v-model="selectedColumns" icon="i-heroicons-view-columns" :options="defaultColumns" multiple />

          <UInput ref="input" v-model="q" icon="i-heroicons-magnifying-glass" autocomplete="off" placeholder="Search..." @keydown.esc="$event.target.blur()">
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>
        </template>
      </UDashboardNavbar>

      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="users"
        :columns="columns"
        :loading="pending"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @select="onSelect"
      />
    </UDashboardPanel>
  </UDashboardPage>
</template>
