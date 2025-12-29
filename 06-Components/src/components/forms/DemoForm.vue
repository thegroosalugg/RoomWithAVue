<template>
  <!-- preventDefault() -->
  <form @submit.prevent="submitForm">
    <VFormControl htmlFor="input-text" label="Text Input" :error="validators.textInvalid">
      <!-- v-model has built in functions to convert input: lazy | number | trim -->
      <!-- @blur: validate input before form submitted -->
      <input
                   id="input-text"
                class="box"
         v-model.trim="form.text"
                @blur="validateField('text')"
        :aria-invalid="validators.textInvalid"
      />
    </VFormControl>
    <VFormControl htmlFor="input-number" label="Number Input" :error="validators.numberInvalid">
      <!-- v-model converts type=number to number when retrieved -->
      <input
                   id="input-number"
                class="box"
                 type="number"
              v-model="form.number"
                @blur="validateField('number')"
        :aria-invalid="validators.numberInvalid"
      />
    </VFormControl>
    <VFormControl htmlFor="select-options" label="Select Options" :error="validators.optionsInvalid">
      <select
                   id="select-options"
                class="box"
              v-model="form.options"
        :aria-invalid="validators.optionsInvalid"
      >
        <option value="snake">Snake</option>
        <option value="otacon">Otacon</option>
        <option value="raiden">Raiden</option>
      </select>
    </VFormControl>
    <!-- Custom Component using v-model: Single - v-model="modelValue"; Multi - v-model:name="modelValue" -->
    <VDateRangePicker v-model:control="form.date" v-model:error="validators.dateInvalid" />
    <VFormControl label="Checkboxes">
      <!-- Checkboxes and Radio buttons require value prop -->
       <VFormControl row htmlFor="checkbox-1" label="Ration">
         <input
                id="checkbox-1"
             value="ration"
              type="checkbox"
           v-model="form.checkboxes"
         />
       </VFormControl>
       <VFormControl row htmlFor="checkbox-2" label="Cardboard Box">
         <input
                id="checkbox-2"
             value="cardboard-box"
              type="checkbox"
           v-model="form.checkboxes"
         />
       </VFormControl>
       <VFormControl row htmlFor="checkbox-3" label="Cigar">
         <input
                id="checkbox-3"
             value="cigar"
              type="checkbox"
           v-model="form.checkboxes"
         />
       </VFormControl>
      </VFormControl>
    <VFormControl
                label="Radio Buttons"
               :error="validators.radioInvalid"
                 role="radiogroup"
      aria-labelledby="radio-label"
        :aria-invalid="validators.radioInvalid"
    >
      <VFormControl row htmlFor="radio-1" label="Tanker">
        <input id="radio-1" value="tanker" type="radio" v-model="form.radio" />
      </VFormControl>
      <VFormControl row htmlFor="radio-2" label="Plant">
        <input id="radio-2" value="plant" type="radio" v-model="form.radio" />
      </VFormControl>
      <VFormControl row htmlFor="radio-3" label="Dremuchij South">
        <input id="radio-3" value="dremuchij" type="radio" v-model="form.radio" />
      </VFormControl>
    </VFormControl>
    <VFormControl row htmlFor="checkbox-solo" label="Confirmation box" :error="validators.checkboxInvalid">
      <input
             id="checkbox-solo"
           type="checkbox"
        v-model="form.checkbox"
        :aria-invalid="validators.checkboxInvalid"
      />
    </VFormControl>
    <button class="button" :disabled="isSubmitting">Save</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import VFormControl from './VFormControl.vue';
  import VDateRangePicker from './VDateRangePicker.vue';

  const formGroup = {
          text: '',
        number: '',
       options: '',
    checkboxes: [],
         radio: '',
      checkbox: false,
          date: { start: '', end: '' }
  }

  const validatorGroup = {
        textInvalid: false,
      numberInvalid: false,
     optionsInvalid: false,
       radioInvalid: false,
    checkboxInvalid: false,
        dateInvalid: false,
  }

  const form = ref({ ...formGroup }) // v-model <input> values
  const validators = ref({ ...validatorGroup })
  const isSubmitting = ref(false)

  const log = (label: string, object: object) =>
    console.log(label, JSON.parse(JSON.stringify(object)))

  function validateField(field: keyof typeof formGroup) {
    const validateKey = (field + 'Invalid') as keyof typeof validatorGroup
    if (!(validateKey in validators.value))
      throw new Error(`DemoForm.vue: validateField() does not know ${validateKey}`)
    validators.value[validateKey] = !form.value[field]
  }

  function validateDate() {
    const { start, end } = form.value.date
    validators.value.dateInvalid = !start || !end
  }

  function isInvalid() {
    const { textInvalid, numberInvalid, optionsInvalid, radioInvalid, checkboxInvalid, dateInvalid } =
      validators.value
    return textInvalid || numberInvalid || optionsInvalid || radioInvalid || checkboxInvalid || dateInvalid
  }

  function resetForm() {
    form.value = { ...formGroup }
    validators.value = { ...validatorGroup }
  }

  function submitForm() {
    if (isSubmitting.value) return
    isSubmitting.value = true
    log('FORM', form.value)
    validateField('text')
    validateField('number')
    validateField('options')
    validateField('radio')
    validateField('checkbox')
    validateDate()
    log('VALIDATORS', validators.value)
    if (isInvalid()) {
      isSubmitting.value = false
      return
    }
    console.log('SUCCESS!')
    resetForm()
    isSubmitting.value = false
  }
</script>

<style scoped>
  form {
    --background: var(--stone-50);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 90%;
    max-width: 480px;
    margin: var(--margin);
    padding: 1rem;
    border: var(--border);
    border-radius: var(--rounded-md);
    background-color: var(--background);

    @media (prefers-color-scheme: dark) { --background: var(--stone-950); }
  }
  .box   { padding: var(--padding-sm); } /* Global Class Override | <input> */
  button { align-self: end; }
</style>
