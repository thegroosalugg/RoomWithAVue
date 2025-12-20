<!-- Options API: taught in course; uses data/methods/computed/watch() { is a configuration object }: Vue consumes it. -->
<!-- Composition API: Replaces Options API; original syntax: -->
<script lang="ts">
  import { ref } from 'vue'

  export default {
    setup() {
      const count = ref(0)

      function increment() {
        count.value++
      }

      return { count, increment }
    }
  }
</script>
<!-- ** ^^^ Must return everything the template needs -->
<!-- Modern Composition API (new default)
<script setup>
  Modern Default: removes export default { setup() { return ... } } boilerplate
</script>
-->
