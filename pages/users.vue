<script lang="ts" setup>
import type { User } from '~/types'

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
}, {
  key: 'address',
  label: 'Address'
}]

const q = ref('')
const selected = ref<User[]>([])
const selectedColumns = ref(defaultColumns)
const sort = ref({ column: 'id', direction: 'asc' as const })
const input = ref<{ input: HTMLInputElement }>()
const isNewUserModalOpen = ref(false)

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

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel>
      <UDashboardNavbar>
        <template #title>
          Users <UBadge :label="users.length" color="gray" size="xs" />
        </template>

        <template #right>
          <USelectMenu v-model="selectedColumns" icon="i-heroicons-view-columns" color="gray" :options="defaultColumns" multiple />

          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            color="gray"
            autocomplete="off"
            placeholder="Filter users..."
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton label="New user" trailing-icon="i-heroicons-plus" color="black" @click="isNewUserModalOpen = true" />
        </template>
      </UDashboardNavbar>

      <UDashboardModal v-model="isNewUserModalOpen" title="New user">
        <UInput label="Name" placeholder="John Doe" />
        <UInput label="Email" placeholder="" />
        <UInput label="Address" placeholder="" />
      </UDashboardModal>

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
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :src="`https://i.pravatar.cc/128?img=${row.id}`" size="xs" />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <template #address-data="{ row }">
          {{ row.address.street }}, {{ row.address.zipcode }} {{ row.address.city }}
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
