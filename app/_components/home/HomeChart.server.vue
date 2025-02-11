<template>
  <UDashboardCard
    ref="cardRef"
    :ui="{ body: { padding: '!pb-3 !px-0' } }"
  >
    <template #header>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
          Revenue
        </p>
        <p class="text-3xl text-gray-900 dark:text-white font-semibold">
          ---
        </p>
      </div>
    </template>

    <div class="h-96" />
  </UDashboardCard>
</template>
