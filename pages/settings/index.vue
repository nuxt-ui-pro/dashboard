<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const fileRef = ref<{ input: HTMLInputElement }>()

const state = reactive({
  name: 'Benjamin Canac',
  email: 'ben@nuxtlabs.com',
  username: 'benjamincanac',
  avatar: '',
  bio: '',
  password_current: '',
  password_new: ''
})

const toast = useToast()

function validate (state: any): FormError[] {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter your name.' })
  if (!state.name) errors.push({ path: 'email', message: 'Please enter your email.' })
  if ((state.password_current && !state.password_new) || (!state.password_current && state.password_new)) errors.push({ path: 'password', message: 'Please enter a valid password.' })
  return errors
}

function onFileChange (e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  state.avatar = URL.createObjectURL(input.files[0])
}

function onFileClick () {
  fileRef.value?.input.click()
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)

  toast.add({ title: 'Profile updated', icon: 'i-heroicons-check-circle' })
}
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UForm :state="state" :validate="validate" :validate-on="['submit']" @submit="onSubmit">
      <UDashboardSection title="Profile" description="This information will be displayed publicly so be careful what you share.">
        <template #actions>
          <UButton type="submit" label="Save changes" />
        </template>

        <UFormGroup
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="grid grid-cols-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.name" autocomplete="off" icon="i-heroicons-user" size="lg" />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="Email"
          description="Used to sign in, for email receipts and product updates."
          required
          class="grid grid-cols-2"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.email" type="email" autocomplete="off" icon="i-heroicons-envelope" size="lg" />
        </UFormGroup>

        <UFormGroup
          name="username"
          label="Username"
          description="Your unique username for logging in and your profile URL."
          required
          class="grid grid-cols-2"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.username" type="username" autocomplete="off" size="lg" input-class="pl-20">
            <template #leading>
              <span class="text-gray-500 dark:text-gray-400 text-sm">nuxt.com/</span>
            </template>
          </UInput>
        </UFormGroup>

        <UFormGroup name="avatar" label="Avatar" class="grid grid-cols-2" help="JPG, GIF or PNG. 1MB Max." :ui="{ container: 'flex items-center gap-3', help: 'mt-0' }">
          <UAvatar :src="state.avatar" :alt="state.name" size="lg" />

          <UButton label="Choose" color="white" size="md" @click="onFileClick" />

          <UInput ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange" />
        </UFormGroup>

        <UFormGroup
          name="bio"
          label="Bio"
          description="Brief description for your profile. URLs are hyperlinked."
          class="grid grid-cols-2"
          :ui="{ container: '' }"
        >
          <UTextarea v-model="state.bio" :rows="5" autoresize size="lg" />
        </UFormGroup>

        <UFormGroup
          name="password"
          label="Password"
          description="Confirm your current password before setting a new one."
          class="grid grid-cols-2"
          :ui="{ container: '' }"
        >
          <UInput v-model="state.password_current" type="password" placeholder="Current password" size="lg" />
          <UInput
            id="password_new"
            v-model="state.password_new"
            type="password"
            placeholder="New password"
            size="lg"
            class="mt-2"
          />
        </UFormGroup>
      </UDashboardSection>
    </UForm>

    <UDivider class="mb-4" />

    <UDashboardSection title="Delete account" description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.">
      <div>
        <UButton color="red" label="Yes, delete account" size="md" />
      </div>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
