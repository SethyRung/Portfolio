<template>
  <div>
    <!-- Test wrapper for ContactForm component -->
  </div>
</template>

<script setup lang="ts">
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import ContactForm from '~/app/components/section/ContactForm.vue'

// Mock Nuxt composables
const mockToast = {
  add: vi.fn()
}

vi.mock('#app', () => ({
  useToast: () => mockToast,
  useRuntimeConfig: () => ({
    resendApiKey: 'test-api-key',
    email: 'test@example.com',
    public: {
      siteUrl: 'http://localhost:3000'
    }
  }),
  nextTick: vi.fn(() => Promise.resolve()),
  onMounted: vi.fn(),
  onBeforeUnmount: vi.fn(),
  watch: vi.fn(),
  ref: vi.fn((value) => ({ value })),
  reactive: vi.fn((obj) => obj),
  computed: vi.fn((fn) => fn()),
  defineShortcuts: vi.fn(),
  useTemplateRef: vi.fn(() => ({ value: null }))
}))

// Mock useGSAP
vi.mock('~~/composables/useGSAP', () => ({
  useGSAP: () => ({
    gsap: {
      timeline: vi.fn().mockReturnValue({
        to: vi.fn().mockReturnThis(),
        fromTo: vi.fn().mockReturnThis(),
        set: vi.fn().mockReturnThis(),
        kill: vi.fn()
      }),
      fromTo: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      killTweensOf: vi.fn()
    },
    ScrollTrigger: {
      getAll: vi.fn().mockReturnValue([]),
      create: vi.fn(),
      refresh: vi.fn()
    }
  })
}))

// Mock $fetch
global.$fetch = vi.fn()

describe('ContactForm', () => {
  let wrapper: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockToast.add.mockClear()
    global.$fetch.mockResolvedValue({
      success: true,
      message: 'Message sent successfully!'
    })

    wrapper = mount(ContactForm, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          UCard: true,
          UForm: true,
          UFormField: true,
          UInput: true,
          UTextarea: true,
          UCheckbox: true,
          UButton: true,
          UProgress: true,
          URadioGroup: true,
          UTooltip: true,
          UIcon: true
        }
      }
    })
  })

  describe('Component initialization', () => {
    it('should render correctly', () => {
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('[data-testid="contact-form"]').exists()).toBe(true)
    })

    it('should initialize with correct default values', () => {
      const vm = wrapper.vm
      expect(vm.currentStep).toBe(1)
      expect(vm.isSubmitting).toBe(false)
      expect(vm.submitSuccess).toBe(false)
      expect(vm.formData.name).toBe('')
      expect(vm.formData.email).toBe('')
      expect(vm.formData.company).toBe('')
      expect(vm.formData.intent).toBe('general')
      expect(vm.formData.message).toBe('')
      expect(vm.formData.newsletter).toBe(false)
      expect(vm.formData.website).toBe('')
    })

    it('should have 3 steps configured', () => {
      const vm = wrapper.vm
      expect(vm.steps).toHaveLength(3)
      expect(vm.steps[0].title).toBe('Quick Contact')
      expect(vm.steps[1].title).toBe('Details')
      expect(vm.steps[2].title).toBe('Message')
    })
  })

  describe('Form validation', () => {
    it('should validate step 1 correctly', () => {
      const vm = wrapper.vm

      // Initially should not be able to proceed
      expect(vm.canGoNext).toBe(false)

      // Set valid name and email
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'

      expect(vm.canGoNext).toBe(true)
    })

    it('should validate step 2 correctly', () => {
      const vm = wrapper.vm
      vm.currentStep = 2
      vm.formData.intent = 'job-inquiry'

      expect(vm.canGoNext).toBe(true)
    })

    it('should validate step 3 correctly', () => {
      const vm = wrapper.vm
      vm.currentStep = 3
      vm.formData.message = 'This is a valid message with more than 10 characters.'
      vm.formData.newsletter = false

      expect(vm.canGoNext).toBe(true)
    })

    it('should reject invalid email in step 1', () => {
      const vm = wrapper.vm
      vm.formData.name = 'John Doe'
      vm.formData.email = 'invalid-email'

      expect(vm.canGoNext).toBe(false)
    })

    it('should reject short name in step 1', () => {
      const vm = wrapper.vm
      vm.formData.name = 'Jo'
      vm.formData.email = 'john@example.com'

      expect(vm.canGoNext).toBe(false)
    })

    it('should reject short message in step 3', () => {
      const vm = wrapper.vm
      vm.currentStep = 3
      vm.formData.message = 'Short'
      vm.formData.newsletter = false

      expect(vm.canGoNext).toBe(false)
    })
  })

  describe('Step navigation', () => {
    it('should navigate to next step when valid', async () => {
      const vm = wrapper.vm

      // Set valid step 1 data
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'

      await vm.nextStep()

      expect(vm.currentStep).toBe(2)
      expect(vm.steps[0].isComplete).toBe(true)
    })

    it('should not navigate to next step when invalid', async () => {
      const vm = wrapper.vm

      // Don't set valid data
      await vm.nextStep()

      expect(vm.currentStep).toBe(1)
      expect(vm.steps[0].isComplete).toBe(false)
    })

    it('should navigate to previous step', async () => {
      const vm = wrapper.vm

      // Move to step 2 first
      vm.currentStep = 2

      await vm.prevStep()

      expect(vm.currentStep).toBe(1)
    })

    it('should not go below step 1', async () => {
      const vm = wrapper.vm

      await vm.prevStep()

      expect(vm.currentStep).toBe(1)
    })
  })

  describe('Form submission', () => {
    it('should submit form successfully', async () => {
      const vm = wrapper.vm

      // Set valid data for all steps
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'
      vm.formData.company = 'Acme Inc'
      vm.formData.intent = 'general'
      vm.formData.message = 'This is a valid message with more than 10 characters.'
      vm.formData.newsletter = true
      vm.formData.website = '' // Empty honeypot

      await vm.handleSubmit({ data: vm.formData })

      expect(global.$fetch).toHaveBeenCalledWith('/api/send', {
        method: 'POST',
        body: vm.formData
      })

      expect(vm.submitSuccess).toBe(true)
      expect(mockToast.add).toHaveBeenCalledWith({
        title: 'Message sent successfully!',
        description: "I'll get back to you as soon as possible.",
        color: 'success'
      })
    })

    it('should handle submission errors', async () => {
      global.$fetch.mockRejectedValue(new Error('Network error'))

      const vm = wrapper.vm

      // Set valid data
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'
      vm.formData.intent = 'general'
      vm.formData.message = 'This is a valid message with more than 10 characters.'
      vm.formData.newsletter = false
      vm.formData.website = ''

      await vm.handleSubmit({ data: vm.formData })

      expect(vm.submitSuccess).toBe(false)
      expect(mockToast.add).toHaveBeenCalledWith({
        title: 'Failed to send message',
        description: 'Please check your internet connection and try again.',
        color: 'error'
      })
    })

    it('should handle honeypot field detection', async () => {
      const vm = wrapper.vm

      // Set valid data but with filled honeypot
      vm.formData.name = 'Bot User'
      vm.formData.email = 'bot@example.com'
      vm.formData.intent = 'general'
      vm.formData.message = 'Bot message with sufficient length.'
      vm.formData.newsletter = false
      vm.formData.website = 'bot-website' // Filled honeypot

      await vm.handleSubmit({ data: vm.formData })

      expect(global.$fetch).not.toHaveBeenCalled()
      expect(mockToast.add).toHaveBeenCalledWith({
        title: 'Submission Error',
        description: 'Your submission could not be processed. Please try again.',
        color: 'error'
      })
    })

    it('should handle API response with success: false', async () => {
      global.$fetch.mockResolvedValue({
        success: false,
        message: 'Validation failed'
      })

      const vm = wrapper.vm

      // Set valid data
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'
      vm.formData.intent = 'general'
      vm.formData.message = 'This is a valid message with more than 10 characters.'
      vm.formData.newsletter = false
      vm.formData.website = ''

      await vm.handleSubmit({ data: vm.formData })

      expect(vm.submitSuccess).toBe(false)
      expect(mockToast.add).toHaveBeenCalledWith({
        title: 'Failed to send message',
        description: 'Please check your internet connection and try again.',
        color: 'error'
      })
    })
  })

  describe('Form reset functionality', () => {
    it('should reset form to initial state', () => {
      const vm = wrapper.vm

      // Modify form data
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'
      vm.formData.company = 'Acme Inc'
      vm.formData.intent = 'collaboration'
      vm.formData.message = 'Some message'
      vm.formData.newsletter = true
      vm.formData.website = 'some-value'
      vm.currentStep = 3
      vm.submitSuccess = true
      vm.steps[0].isComplete = true
      vm.steps[1].isComplete = true

      vm.resetForm()

      expect(vm.formData.name).toBe('')
      expect(vm.formData.email).toBe('')
      expect(vm.formData.company).toBe('')
      expect(vm.formData.intent).toBe('general')
      expect(vm.formData.message).toBe('')
      expect(vm.formData.newsletter).toBe(false)
      expect(vm.formData.website).toBe('')
      expect(vm.currentStep).toBe(1)
      expect(vm.submitSuccess).toBe(false)
      expect(vm.steps[0].isComplete).toBe(false)
      expect(vm.steps[1].isComplete).toBe(false)
    })
  })

  describe('Keyboard shortcuts', () => {
    it('should handle Ctrl+Enter shortcut', async () => {
      const vm = wrapper.vm

      // Set up for final step
      vm.currentStep = 3
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'
      vm.formData.intent = 'general'
      vm.formData.message = 'This is a valid message with more than 10 characters.'
      vm.formData.newsletter = false
      vm.formData.website = ''

      // Simulate Ctrl+Enter
      await vm.handleShortcut?.()

      expect(global.$fetch).toHaveBeenCalled()
    })

    it('should handle Escape key for previous step', async () => {
      const vm = wrapper.vm
      vm.currentStep = 2

      // Simulate Escape
      await vm.handleEscapeKey?.()

      expect(vm.currentStep).toBe(1)
    })
  })

  describe('Animation lifecycle', () => {
    it('should initialize animations on mount', () => {
      // Test that animation setup is called
      expect(wrapper.vm.initializeFormAnimations).toBeDefined()
    })

    it('should cleanup animations on unmount', () => {
      // Test cleanup function exists
      expect(wrapper.vm.cleanupAnimations).toBeDefined()
    })
  })

  describe('Success state', () => {
    it('should show success state after successful submission', async () => {
      const vm = wrapper.vm

      // Set valid data and submit
      vm.formData.name = 'John Doe'
      vm.formData.email = 'john@example.com'
      vm.formData.intent = 'general'
      vm.formData.message = 'This is a valid message with more than 10 characters.'
      vm.formData.newsletter = false
      vm.formData.website = ''

      await vm.handleSubmit({ data: vm.formData })

      expect(vm.submitSuccess).toBe(true)

      // Check that success animation would be triggered
      expect(wrapper.vm.animateSuccess).toBeDefined()
    })
  })

  describe('Intent options', () => {
    it('should have correct intent options', () => {
      const vm = wrapper.vm

      expect(vm.intentOptions).toHaveLength(3)
      expect(vm.intentOptions[0].value).toBe('job-inquiry')
      expect(vm.intentOptions[1].value).toBe('collaboration')
      expect(vm.intentOptions[2].value).toBe('general')
    })
  })

  describe('Computed properties', () => {
    it('should return correct current step config', () => {
      const vm = wrapper.vm

      vm.currentStep = 2
      const config = vm.currentStepConfig

      expect(config.id).toBe(2)
      expect(config.title).toBe('Details')
      expect(config.description).toBe('Tell me more about your inquiry')
    })

    it('should handle edge cases in current step config', () => {
      const vm = wrapper.vm

      // Test invalid step number
      vm.currentStep = 99
      const config = vm.currentStepConfig

      expect(config).toBeDefined()
      expect(config.title).toBeDefined()
    })
  })
})
</script>