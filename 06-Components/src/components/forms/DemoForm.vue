<template>
  <!-- preventDefault() -->
  <form @submit.prevent="submitForm">
    <div :class="['control', 'bold', { invalid: validators.textInvalid }]">
      <label for="input-text">Text Input</label>
      <!-- v-model has built in functions to convert input: lazy | number | trim -->
      <!-- @blur: validate input before form submitted -->
      <input
                   id="input-text"
                class="box"
                 name="input-text"
         v-model.trim="form.text"
                @blur="validateField('text')"
        :aria-invalid="validators.textInvalid"
      />
    </div>
    <div :class="['control', 'bold', { invalid: validators.numberInvalid }]">
      <label for="input-number">Number Input</label>
      <!-- v-model converts type=number to number when retrieved -->
      <input
                   id="input-number"
                class="box"
                 name="input-number"
                 type="number"
              v-model="form.number"
                @blur="validateField('number')"
        :aria-invalid="validators.numberInvalid"
      />
    </div>
    <div :class="['control', 'bold', { invalid: validators.optionsInvalid }]">
      <label for="select-options">Select Options</label>
      <select
                   id="select-options"
                class="box"
                 name="select-options"
              v-model="form.options"
        :aria-invalid="validators.optionsInvalid"
      >
        <option value="snake">Snake</option>
        <option value="otacon">Otacon</option>
        <option value="raiden">Raiden</option>
      </select>
    </div>
    <div class="control">
      <h2>Checkboxes</h2>
      <!-- Checkboxes and Radio buttons require value prop -->
      <div class="control-row">
        <input
               id="checkbox-one"
             name="checkbox-group"
            value="ration"
             type="checkbox"
          v-model="form.checkboxes"
        />
        <label for="checkbox-one">Ration</label>
      </div>
      <div class="control-row">
        <input
               id="checkbox-two"
             name="checkbox-group"
            value="carboard-box"
             type="checkbox"
          v-model="form.checkboxes"
        />
        <label for="checkbox-two">Carboard Box</label>
      </div>
      <div class="control-row">
        <input
               id="checkbox-three"
             name="checkbox-group"
            value="cigar"
             type="checkbox"
          v-model="form.checkboxes"
        />
        <label for="checkbox-three">Cigar</label>
      </div>
    </div>
    <div
               :class="['control', { invalid: validators.radioInvalid }]"
                 role="radiogroup"
      aria-labelledby="radio-label"
        :aria-invalid="validators.radioInvalid"
    >
      <h2>Radio Buttons</h2>
      <div class="control-row">
        <input id="radio-one" name="radio-group" value="tanker" type="radio" v-model="form.radio" />
        <label for="radio-one">Tanker</label>
      </div>
      <div class="control-row">
        <input id="radio-two" name="radio-group" value="plant" type="radio" v-model="form.radio" />
        <label for="radio-two">Plant</label>
      </div>
      <div class="control-row">
        <input id="radio-three" name="radio-group" value="dremuchij" type="radio" v-model="form.radio" />
        <label for="radio-three">Dremuchij</label>
      </div>
    </div>
    <div
      :class="['control-row', { invalid: validators.checkboxInvalid }]"
      :style="{ margin: '0 0.5rem' }"
    >
      <input
                   id="checkbox-solo"
                 name="checkbox-solo"
                 type="checkbox"
              v-model="form.checkbox"
        :aria-invalid="validators.checkboxInvalid"
      />
      <label for="checkbox-solo">Confirmation box</label>
    </div>
    <button class="button" :disabled="isSubmitting">Save</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const formGroup = {
          text: '',
        number: '',
       options: '',
    checkboxes: [],
         radio: '',
      checkbox: false,
  }

  const validatorGroup = {
        textInvalid: false,
      numberInvalid: false,
     optionsInvalid: false,
       radioInvalid: false,
    checkboxInvalid: false,
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

  function isInvalid() {
    const { textInvalid, numberInvalid, optionsInvalid, radioInvalid, checkboxInvalid } =
      validators.value
    return textInvalid || numberInvalid || optionsInvalid || radioInvalid || checkboxInvalid
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
    gap: 0.5rem;
    width: 90%;
    max-width: 480px;
    margin: var(--margin);
    padding: 0.5rem;
    border: var(--border);
    border-radius: var(--rounded-md);
    background-color: var(--background);

    @media (prefers-color-scheme: dark) { --background: stone-950; }
  }
  .control {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    transition: color var(--transition);

    &.bold label {
      font-weight: 700;
      margin-left: 0.25rem;
    }
  }
  .control-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .invalid { color: var(--danger); }
  .box     { padding: var(--padding-sm); } /* Global Class Override */
  h2       { font-weight: 700; }
  button   { align-self: end;  }
</style>
