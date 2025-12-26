<template>
  <div class="date-range">
    <div :class="['control', { invalid: error }]">
      <label for="start-date">From</label>
      <!-- @input + :value = v-model - however child components cannot change parent's state. Parent sets v-model on child -->
      <input id="start-date" type="date" :value="control.start" @input="update($event, 'start')" />
    </div>
    <div :class="['control', { invalid: error }]">
      <label for="end-date">To</label>
      <input id="end-date" type="date" :value="control.end" @input="update($event, 'end')" />
    </div>
  </div>
</template>

<!-- ** Custom V-Model Component -->
<script setup lang="ts">
  interface DateRange {
    start: string
      end: string
  }

  const props = defineProps<{ control: DateRange; error: boolean }>() // modelValue: reserved input name

  // update:modelValue: reserved output name (1 v-model) | update:customName (multi v-models)
  const emit = defineEmits<{
    'update:control': [value: DateRange]
      'update:error': [value: boolean]
  }>()

  function update(e: Event, key: 'start' | 'end') {
    const { value } = e.target as HTMLInputElement
    const [start, end] = key === 'start' ? [value, props.control.end] : [props.control.start, value]
    if (new Date(start) >= new Date(end)) {
      emit('update:error', true)
      emit('update:control', { ...props.control, [key]: '' })
      return
    }
    emit('update:error', false)
    emit('update:control', { ...props.control, [key]: value })
  }
</script>

<style scoped>
  .date-range {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .control {
    display: flex;
    flex-direction: column;
    transition: color var(--transition);

    label {
      font-weight: 700;
      margin-left: 0.25rem;
    }
    input {
      border: var(--border);
      padding: var(--padding-sm);
    }
  }
  .invalid { color: var(--danger); }
</style>
