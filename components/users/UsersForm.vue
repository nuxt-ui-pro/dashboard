
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const emit = defineEmits(['cancel'])

const state = reactive({
  name: undefined,
  email: undefined
})

// https://ui.nuxt.com/components/form
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Please enter a name' })
  if (!state.email) errors.push({ path: 'email', message: 'Please enter an email' })
  return errors
}

async function onSubmit (event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}
</script>

<template>
  <UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" placeholder="John Doe" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" placeholder="john.doe@example.com" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton label="Cancel" color="gray" variant="ghost" @click="emit('cancel')" />
      <UButton type="submit" label="Save" color="black" />
    </div>
  </UForm>
</template>
