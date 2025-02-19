<script setup lang="ts">
import * as z from 'zod'
import type { FormError } from '#ui/types'

const passwordSchema = z.object({
  current: z.string().min(8, 'Must be at least 8 characters'),
  new: z.string().min(8, 'Must be at least 8 characters')
})

type PasswordSchema = z.output<typeof passwordSchema>

const password = reactive<Partial<PasswordSchema>>({
  current: undefined,
  new: undefined
})

const validate = (state: PasswordSchema): FormError[] => {
  const errors = []
  if (state.current === state.new)
    errors.push({ name: 'new', message: 'Passwords must be different' })
  return errors
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UPageCard>
      <UForm
        :schema="passwordSchema"
        :state="password"
        :validate="validate"
        class="flex flex-col gap-4 max-w-sm"
      >
        <div class="flex flex-col">
          <span class="font-semibold">
            Password
          </span>
          <span class="text-sm text-(--ui-text-muted)">
            Confirm your current password before setting a new one.
          </span>
        </div>
        <UFormField name="current">
          <UInput
            v-model="password.current"
            type="password"
            placeholder="Current password"
            class="w-full"
          />
        </UFormField>
        <UFormField name="new">
          <UInput
            v-model="password.new"
            type="password"
            placeholder="New password"
            class="w-full"
          />
        </UFormField>
        <UButton
          label="Update"
          color="primary"
          class="w-fit"
          type="submit"
        />
      </UForm>
    </UPageCard>
    <UPageCard class="bg-gradient-to-tl from-(--ui-error)/10 from-5% to-(--ui-bg)">
      <UFormField
        name="Account"
        label="Account"
        description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
        class="flex flex-col gap-4"
      >
        <UButton
          label="Delete account"
          color="error"
        />
      </UFormField>
    </UPageCard>
  </div>
</template>

<style scoped>

</style>
