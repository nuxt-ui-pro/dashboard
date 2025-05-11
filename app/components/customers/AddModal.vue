<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()

const schema = z.object({
  name: z.string().min(2, t('validation.name_too_short')),
  email: z.string().email(t('validation.invalid_email'))
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: `New customer ${event.data.name} added`, color: 'success' })
  open.value = false
}
</script>

<template>
  <UModal 
    v-model:open="open" 
    :title="t('customers.new_customer')"
    :description="t('customers.add_new_customer')"
  >
    <UButton :label="t('customers.new_customer')" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField :label="t('customers.name')" :placeholder="t('customers.name_placeholder')" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField :label="t('customers.email')" :placeholder="t('customers.email_placeholder')" name="email">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            :label="t('common.cancel')"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            :label="t('common.create')"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
