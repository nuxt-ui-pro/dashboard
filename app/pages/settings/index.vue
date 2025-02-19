<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const fileRef = ref<HTMLInputElement>()

const profileSchema = z.object({
  name: z.string().min(2, 'Too short'),
  email: z.string().email('Invalid email'),
  username: z.string().min(2, 'Too short'),
  avatar: z.string().optional(),
  bio: z.string().optional()
})

type ProfileSchema = z.output<typeof profileSchema>

const profile = reactive<Partial<ProfileSchema>>({
  name: 'Benjamin Canac',
  email: 'ben@nuxtlabs.com',
  username: 'benjamincanac',
  avatar: undefined,
  bio: undefined
})
const toast = useToast()
async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
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

  profile.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick() {
  fileRef.value?.click()
}
</script>

<template>
  <div class="space-y-4">
    <UPageCard>
      <div class="flex justify-between items-center gap-4">
        <UFormField label="Theme" description="Customize the look and feel of your dashboard." />
        <UColorModeSelect />
      </div>
    </UPageCard>
    <UPageCard>
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
        :schema="profileSchema"
        :state="profile"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            v-model="profile.name"
            autocomplete="off"
          />
        </UFormField>
        <USeparator />
        <UFormField
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            v-model="profile.email"
            type="email"
            autocomplete="off"
          />
        </UFormField>
        <USeparator />
        <UFormField
          name="username"
          label="Username"
          description="Your unique username for logging in and your profile URL."
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <UInput
            v-model="profile.username"
            type="username"
            autocomplete="off"
          />
        </UFormField>
        <USeparator />
        <UFormField
          name="avatar"
          label="Avatar"
          description="JPG, GIF or PNG. 1MB Max."
          class="flex max-sm:flex-col justify-between sm:items-center gap-4"
        >
          <div class="flex flex-wrap items-center gap-3">
            <UAvatar
              :src="profile.avatar"
              :alt="profile.name"
              size="lg"
            />
            <UButton
              label="Choose"
              color="neutral"
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
          class="flex max-sm:flex-col justify-between items-start gap-4"
          :ui="{ container: 'w-full' }"
        >
          <UTextarea
            v-model="profile.bio"
            :rows="5"
            autoresize
            class="w-full"
          />
        </UFormField>
      </UForm>
    </UPageCard>
  </div>
</template>
