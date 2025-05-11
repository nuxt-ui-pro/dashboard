<script setup lang="ts">
import * as z from 'zod'
import type { FormError } from '@nuxt/ui'

const { t } = useI18n()

const passwordSchema = z.object({
  current: z.string().min(8, t('security.password.error.min_length')),
  new: z.string().min(8, t('security.password.error.min_length'))
})

type PasswordSchema = z.output<typeof passwordSchema>

const password = reactive<Partial<PasswordSchema>>({
  current: undefined,
  new: undefined
})

const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    errors.push({ name: 'new', message: t('security.password.error.same_password') })
  }
  return errors
}
</script>

<template>
  <UPageCard
    :title="t('security.password.title')"
    :description="t('security.password.description')"
    variant="subtle"
  >
    <UForm
      :schema="passwordSchema"
      :state="password"
      :validate="validate"
      class="flex flex-col gap-4 max-w-xs"
    >
      <UFormField name="current">
        <UInput
          v-model="password.current"
          type="password"
          :placeholder="t('security.password.current.placeholder')"
          class="w-full"
        />
      </UFormField>

      <UFormField name="new">
        <UInput
          v-model="password.new"
          type="password"
          :placeholder="t('security.password.new.placeholder')"
          class="w-full"
        />
      </UFormField>

      <UButton :label="t('security.password.update')" class="w-fit" type="submit" />
    </UForm>
  </UPageCard>

  <UPageCard
    :title="t('security.account.title')"
    :description="t('security.account.description')"
    class="bg-gradient-to-tl from-error/10 from-5% to-default"
  >
    <template #footer>
      <UButton :label="t('security.account.delete.label')" color="error" />
    </template>
  </UPageCard>
</template>
