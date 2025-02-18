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

const validate = (state: any): FormError[] => {
  const errors = []
  if (state.password_current === state.password_new)
    errors.push({ name: 'password_new', message: 'Passwords must be different' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
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
        label="Save changes"
        color="neutral"
      />
    </div>
    <USeparator />
    <UForm
      :state="state"
      :validate="validate"
      class="space-y-4"
      @submit="onSubmit"
    >
      <div class="flex justify-between items-center gap-4">
        <UFormField
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
        />
        <UInput
          v-model="state.name"
          autocomplete="off"
          size="md"
        />
      </div>
      <USeparator />
      <div class="flex justify-between items-center gap-4">
        <UFormField
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required
        />
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="off"
          size="md"
        />
      </div>
      <USeparator />
      <div class="flex justify-between items-center gap-4">
        <UFormField
          name="username"
          label="Username"
          description="Your unique username for logging in and your profile URL."
          required
        />
        <UInput
          v-model="state.username"
          type="username"
          autocomplete="off"
          size="md"
          input-class="ps-[77px]"
        />
      </div>
      <USeparator />
      <div class="flex justify-between items-center gap-4">
        <UFormField
          name="avatar"
          label="Avatar"
          help="JPG, GIF or PNG. 1MB Max."
        />
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
      </div>
      <USeparator />
      <div class="flex justify-between items-center gap-4">
        <UFormField
          name="bio"
          label="Bio"
          description="Brief description for your profile. URLs are hyperlinked."
        />
        <UTextarea
          v-model="state.bio"
          :rows="5"
          autoresize
          class="w-full"
          size="md"
        />
      </div>
      <USeparator />
      <div class="flex justify-between items-center gap-4">
        <UFormField
          name="password"
          label="Password"
          description="Confirm your current password before setting a new one."
        />
        <div class="flex flex-col gap-1">
          <UInput
            id="password"
            v-model="state.password_current"
            type="password"
            placeholder="Current password"
            size="md"
          />
          <UInput
            id="password_new"
            v-model="state.password_new"
            type="password"
            placeholder="New password"
            size="md"
            class="mt-2"
          />
        </div>
      </div>
      <USeparator />
      <div class="flex flex-col items-end gap-4">
        <UFormField
          name="Account"
          label="Account"
          description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
          class="w-full"
        />
        <UButton
          label="Delete account"
          color="error"
          size="md"
        />
      </div>
    </UForm>
  </div>
</template>
