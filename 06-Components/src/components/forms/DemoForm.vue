<template>
  <!-- preventDefault() -->
  <form @submit.prevent="submitForm">
    <div class="control bold">
      <label for="input-text">Text Input</label>
      <!-- v-model has built in functions to convert input: lazy | number | trim -->
      <input id="input-text" class="box" name="input-text" v-model.trim="form.text" />
    </div>
    <div class="control bold">
      <label for="input-number">Number Input</label>
      <!-- v-model converts type=number to number when retrieved -->
      <input id="input-number" class="box" name="input-number" type="number" v-model="form.number" />
    </div>
    <div class="control bold">
      <label for="select-options">Select Options</label>
      <select id="select-options" class="box" name="select-options" v-model="form.options">
        <option value="snake">Snake</option>
        <option value="otacon">Otacon</option>
        <option value="raiden">Raiden</option>
      </select>
    </div>
    <div class="control">
      <h2>Checkboxes</h2>
      <!-- Checkboxes and Radio buttons require value prop -->
      <div class="control-row">
        <input id="checkbox-one" name="checkbox-group" value="ration" type="checkbox" v-model="form.checkboxes" />
        <label for="checkbox-one">Ration</label>
      </div>
      <div class="control-row">
        <input id="checkbox-two" name="checkbox-group" value="carboard-box" type="checkbox" v-model="form.checkboxes" />
        <label for="checkbox-two">Carboard Box</label>
      </div>
      <div class="control-row">
        <input id="checkbox-three" name="checkbox-group" value="cigar" type="checkbox" v-model="form.checkboxes" />
        <label for="checkbox-three">Cigar</label>
      </div>
    </div>
    <div class="control">
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
    <div class="control-row" :style="{ margin: '0 0.5rem'}">
      <input id="checkbox-four" name="checkbox-solo" type="checkbox" v-model="form.checkbox" />
      <label for="checkbox-four">Confirmation box</label>
    </div>
    <button class="button">Save</button>
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

  const form = ref({ ...formGroup }) // v-model <input> values

  function submitForm() {
    console.log(form.value)
    form.value = { ...formGroup }
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
  .box   { padding: var(--padding-sm); } /* Global Class Override */
  h2     { font-weight: 700; }
  button { align-self: end;  }
</style>
