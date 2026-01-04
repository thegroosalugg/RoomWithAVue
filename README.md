# RoomWithAVue
Vue.JS development projects

## Reminder:
- public/robots.txt
  - User-agent: *
  - Disallow:
- index.html:
  - lang="en"
  - < meta name="description" content="Vue App" >
- vite.config.ts
  - when port fowarding add:
    - server: { host: true },
- .gitignore
  - .env
  - .env.local
- .pterrierrc.json
  - "vueIndentScriptAndStyle": true
- main.ts
  - when using route transitions add:
    - await router.isReady()

### 01 Intro
- basic Vue.Js set up with CDN (Content Delivery Network) import
- 01-05 use Options API Setup
### 02 The Basics
- event handlers, 2-way binding, dynamic classes
### 03 Conditional Content
- v-for, v-if, v-else, v-show
### 04 Project: Game
- monster slayer game putting Vue practices into practice
### 05 Life Cycles
- demo of all Vue life cycle methods
### 06 Components
- 06+ uses Composition API script setup
- props & emits:
  - const dataProps = ref<type>(value)
  - withDefaults(defineProps<{types}>(), { default: value })
  - defineEmits<{ (e: 'event', payload: any): void }>(); @click="$emit('event', payload)"; @event="handleEvent"
- provide & inject
  - provide('key', value) -- provide('key', { value, function }) -- provide(InjectionKey, value)
  - inject&lt;T&gt;('key', defaultValue) -- inject(InjectionKey)
- slots
  - multi-slots (v-slot="name" | #name)
  - slot props (#default="props")
- components
  - &lt;component :is="MyComponent"&gt;
  - &lt;KeepAlive&gt; &lt;MyComponent&gt; &lt;KeepAlive&gt;
  - &lt;teleport&gt; &lt;MyComponent&gt; &lt;teleport&gt;
- forms (v-model)
- HTTP Requests
  - with dummy Python Flask server
  - created re-usable fetch function and composable
### 07 Router & Transitions
#### Router
- { '/route', component: MyComponent, alias: '/routesFromThisPathToo' }
- { '/route/:dynamic', component: MyComponent, props: true }
- { '/:catchAll(.*)', component: NotFound }
- useRoute(): current route object; useRouter(): current router instance
- .router-link-active | .router-link-exact-active
- beforeEnter, beforeUpdate, beforeLeave, onBeforeRouteUpdate, onBeforeRouteLeave
#### Transition
  -  &lt;Transition&gt;;  &lt;TransitionGroup&gt;
  - .v-(enter|leave)-from; v.enter-to; v-enter-active; v-move
#### Pinia
  - src/store/counter.ts provides sufficient demo
