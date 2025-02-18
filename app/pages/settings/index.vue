<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { FormError } from '#ui/types'

const fileRef = ref<HTMLInputElement>()

const schema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.string().email('Invalid email'),
  password_current: z.string().min(8, 'Must be at least 8 characters'),
  password_new: z.string().min(8, 'Must be at least 8 characters'),
  username: z.string().min(2, 'Too short'),
  avatar: z.string().optional(),
  bio: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: 'Benjamin Canac',
  email: 'ben@nuxtlabs.com',
  username: 'benjamincanac',
  avatar: undefined,
  bio: undefined,
  password_current: undefined,
  password_new: undefined
})

const validate = (state: Schema): FormError[] => {
  const errors = []
  if (state.password_current === state.password_new)
    errors.push({ name: 'password_new', message: 'Passwords must be different' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'Your settings have been updated.',
    icon: 'i-lucide-check',
    color: 'success'
  })
  console.log(event.data)
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick() {
  fileRef.value?.click()
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center gap-4">
      <UFormField label="Theme" description="Customize the look and feel of your dashboard." />
      <UColorModeSelect />
    </div>
    <USeparator />
    <div class="flex justify-between items-center gap-4">
      <UFormField label="Profile" description="This information will be displayed publicly so be careful what you share." />
      <UButton
        form="settings"
        label="Save changes"
        color="neutral"
        type="submit"
      />
    </div>
    <USeparator />
    <UForm
      id="settings"
      :schema="schema"
      :state="state"
      :validate="validate"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField
        name="name"
        label="Name"
        description="Will appear on receipts, invoices, and other communication."
        required
        class="flex justify-between items-start gap-4"
      >
        <UInput
          v-model="state.name"
          autocomplete="off"
          size="md"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="Email"
        description="Used to sign in, for email receipts and product updates."
        required
        class="flex justify-between items-start gap-4"
      >
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="off"
          size="md"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="Username"
        description="Your unique username for logging in and your profile URL."
        required
        class="flex justify-between items-start gap-4"
      >
        <UInput
          v-model="state.username"
          type="username"
          autocomplete="off"
          size="md"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="Avatar"
        description="JPG, GIF or PNG. 1MB Max."
        class="flex justify-between items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar
            :src="state.avatar"
            :alt="state.name"
            size="lg"
          />
          <UButton
            label="Choose"
            color="neutral"
            size="md"
            @click="onFileClick"
          />
          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          >
        </div>
      </UFormField>
      <USeparator />
      <UFormField
        name="bio"
        label="Bio"
        description="Brief description for your profile. URLs are hyperlinked."
        class="flex justify-between items-start gap-4"
        :ui="{ container: 'w-full' }"
      >
        <UTextarea
          v-model="state.bio"
          :rows="5"
          autoresize
          class="w-full"
          size="md"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="password"
        label="Password"
        description="Confirm your current password before setting a new one."
        class="flex justify-between items-start gap-4"
      >
        <div class="flex flex-col gap-2">
          <UFormField name="password_current">
            <UInput
              id="password"
              v-model="state.password_current"
              type="password"
              placeholder="Current password"
              size="md"
            />
          </UFormField>
          <UFormField name="password_new">
            <UInput
              id="password_new"
              v-model="state.password_new"
              type="password"
              placeholder="New password"
              size="md"
            />
          </UFormField>
        </div>
      </UFormField>
      <USeparator />
      <UFormField
        name="Account"
        label="Account"
        description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
        class="flex flex-col items-end gap-4"
      >
        <UButton
          label="Delete account"
          color="error"
          size="md"
        />
      </UFormField>
    </UForm>
  </div>
</template>
