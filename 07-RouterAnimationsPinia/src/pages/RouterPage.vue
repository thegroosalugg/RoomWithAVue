<template>
  <VHeading title="Routing" />
  <section>
    <button v-for="num in 5" :key="num" class="button" @click="navTo(num)">Nav to {{ num }}</button>
    <!-- nav paths must be absolute: router/child, or via their name in route config -->
    <RouterLink class="button" :to="{ name: 'router-child' }">Nav to child</RouterLink>
  </section>
  <!-- property loses reactivity if saved as const in <script> -->
  <p v-if="route.params.testId">Params: :testId <strong>{{ route.params.testId }}</strong></p>
  <p v-if="activeModel">Fetched data: <strong>{{ activeModel }}</strong></p>
  <VHeading v-if="rootPath" class="box" title="/ root path" />
  <VScrollDummy v-if="rootPath" :elements="13"/>
  <!-- Nested RouterView renders children of current route -->
  <RouterView />
  <!-- Like slots, can render multiple route children, by using name of non default routes -->
  <RouterView name="parallel" />
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import {
    onBeforeRouteLeave,
    onBeforeRouteUpdate,
    RouterView,
    useRoute,
    useRouter,
  } from 'vue-router'
  import VScrollDummy from '@/components/test/VScrollDummy.vue';
  import VHeading from '@/components/ui/VHeading.vue';
  import logger from '@/lib/utils/logger';

  const fruit = ['watermelon','mandarin', 'blood orange', 'florida grapefruit', 'fig']
  const activeModel = ref<string | undefined>(undefined)

  // ** route/:id can also be derived as a prop if props:true configured on route
  const props = defineProps<{ testId?: string }>()

  // ** useRoute(): gives you the CURRENT route object.
  // ** It is reactive. Anything inside route.params, route.query, etc. updates when the URL changes.
  const route = useRoute()

  // ** useRouter(): gives you the router instance.
  // ** You use this to navigate (push, replace, back, etc.)
  const router = useRouter()

  // ** params changes must be watched and any reactive data to be updated on watch
  // ** only the ref, route, can be watched directly, but it has too many nested props that don't need watching
  // ** () => to watch a nested prop of a ref, it must be wrapped in an arrow fn
  // watch(() => route.params.testId, updateActiveModel) // ** watch route ref
  watch(() => props.testId, updateActiveModel) // ** watch props ref

  const rootPath = computed(() => route.fullPath === '/router')

  function navTo(testId: number) {
    console.clear()
    // router.push('/router/' + testId)
    // ** if the route is named, we can pass config objects like params :id
    router.push({ name: 'dynamic-route', params: { testId }, query: { sort: 'asc' }})
  }

  // ** dummy data fetch on :testId change
  function updateActiveModel() {
    // const { testId } = route.params
    // const index = Number(testId) - 1 // ** :id fetched from router
    const index = Number(props.testId) -1 // ** :id passed as props
    activeModel.value = fruit[index]
  }

  // Router Life Cycles
  onBeforeRouteUpdate((to, from, next) => {
    logger(100, { onBeforeRouteUpdate_to: to, from })
    next()
  })

  onBeforeRouteLeave(( to, from, next) => {
    console.clear()
    logger(150, { onBeforeRouteLeave_to: to, from })
    next()
  })

  updateActiveModel() // ** fetch init data
</script>

<style scoped>
  section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: var(--padding-sm);
  }
  p {
    margin: 0.25rem auto;
    &:last-of-type { margin-bottom: 0.5rem; }
    strong { color: var(--accent); }
  }
</style>
