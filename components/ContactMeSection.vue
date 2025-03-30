<template>
  <div class="px-4 md:px-12 lg:px-20">
    <h2 class="mb-3 font-bold text-4xl text-center">Contact me</h2>
    <p class="mb-8 italic text-center">
      Let's talk about your ideas, projects or anything else
    </p>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-28 justify-self-center"
    >
      <UForm
        :schema="schema"
        :state="state"
        class="md:max-w-96 space-y-6"
        @submit="onSubmit"
      >
        <div class="flex justify-between gap-6">
          <UFormField label="First name" name="firstName" class="grow">
            <UInput
              v-model="state.firstName"
              size="lg"
              placeholder="First name"
              class="w-full"
            />
          </UFormField>
          <UFormField label="Last name" name="lastName" class="grow">
            <UInput
              v-model="state.lastName"
              size="lg"
              placeholder="Last name"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField label="Email" name="email">
          <UInput
            v-model="state.email"
            size="lg"
            placeholder="your-email@example.com"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Phone" name="phone">
          <UInput
            v-model="state.phone"
            size="lg"
            placeholder="123-456-789"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Subject" name="subject">
          <UInput
            v-model="state.subject"
            size="lg"
            placeholder="Subject of your message"
            class="w-full"
          />
        </UFormField>
        <UFormField label="Message" name="message">
          <UTextarea
            v-model="state.message"
            placeholder="Leave your message here"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" size="lg" block> Send message </UButton>
      </UForm>
      <div>
        <div>
          <h3 class="text-lg font-bold">Chat with me</h3>
          <p class="text-sm text-gray-500">Speak to me via live chat.</p>
          <div class="mt-2 flex flex-col gap-2">
            <UButton
              icon="i-simple-icons-telegram"
              label="Telegram"
              variant="ghost"
              color="neutral"
              to="https://t.me/sethyrung"
              class="w-fit"
            />
            <UButton
              icon="i-simple-icons-messenger"
              label="Messenger"
              variant="ghost"
              color="neutral"
              to="https://web.facebook.com/Joker.username"
              class="w-fit"
            />
          </div>
        </div>
        <div class="mt-8">
          <h3 class="text-lg font-bold">Call me</h3>
          <p class="text-sm text-gray-500">Call me Mon-Fri from 8am to 5pm</p>
          <div class="mt-2 flex flex-col gap-2">
            <UButton
              icon="i-lucide-phone"
              label="(+855) 97 4588804"
              variant="ghost"
              color="neutral"
              to="tel:+855974588804"
              class="w-fit"
            />
            <UButton
              icon="i-lucide-phone"
              label="(+855) 96 4391751"
              variant="ghost"
              color="neutral"
              to="tel:+855964391751"
              class="w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email("Invalid email"),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  phone: undefined,
  subject: undefined,
  message: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>
