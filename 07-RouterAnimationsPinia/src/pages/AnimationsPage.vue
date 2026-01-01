<template>
  <VHeading title="Animations" />
  <section>
    <button class="button" @click="isOpen       = !isOpen"      >Hide | Show</button>
    <button class="button" @click="hasSwitched  = !hasSwitched" >If | Else</button>
    <button class="button" @click="shouldAppear = !shouldAppear">JS</button>
  </section>
  <div class="box center" style="width: 125px; color: var(--sky-500)">
    <h1>Disclosure</h1>
    <!-- <transition> == <AnimatePresense>: can only wrap a single element; requires v-if | v-show   -->
    <!-- name allows custom class names: .v-enter-active => .name-enter-active -->
    <Transition
      name="p"
      @beforeEnter="logger(280, { beforeEnter: '<p>' })"
      @beforeLeave="logger(300, { beforeLeave: '<p>' })"
    >
      <p v-if="isOpen" style="margin: var(--margin); color: var(--emerald-500)">Hidden Content</p>
    </Transition>
  </div>
  <!-- transition allows multiple if-else children as long as only 1 child is finally rendered -->
  <!-- mode   (like <AnimatePresense>) default = sync; in-out = wait; out-in = popLayout -->
  <!-- appear (like <AnimatePresense> initial); @before = transition events, run custom logic -->
  <Transition name="if-else" mode="out-in" appear @beforeAppear="logger(320, { beforeAppear: 'if | else <div>' })">
    <div v-if="!hasSwitched" class="box center" style="color: var(--violet-500)">IF</div>
    <div v-else              class="box center" style="color: var(--pink-500)">ELSE</div>
  </Transition>
  <!-- JavaScript Hooks: can be used to create custome animations with JS -->
  <!-- automatically pass <Element> to function; onEnter | onLeave also pass done(): tells transition when to proceed -->
  <!-- enter | leaveCancelled can be used to clear intervals if your animation flickers -->
  <!-- css=false improves performance as component won't search for classes -->
  <Transition
    :css="false"
    @beforeEnter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    @enterCancelled="onCancel('enter')"
    @leaveCancelled="onCancel('leave')"
  >
    <div v-show="shouldAppear" class="box center" style="color: var(--yellow-500)">
      JavaScript
    </div>
  </Transition>
  <form @submit.prevent="addItem">
    <input class="box" v-model.trim="input" placeholder="add item..." />
    <button class="button">Add</button>
  </form>
  <!-- <TransitionGroup> allows animating of dynamic lists. tag: any HTML or custom Component -->
  <TransitionGroup tag="ul" name="group">
    <li v-for="{ id, name } in list" :key="id" class="box" style="color: var(--red-500)" @click="removeItem(id)">
      {{ name }}
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import VHeading from '@/components/ui/VHeading.vue'
  import logger from '@/lib/utils/logger';
  import type { CSSStyles } from '@/lib/types/styles';

  const hasSwitched  = ref(false) // .disclosure <p>
  const isOpen       = ref(false) // if | else duo
  const shouldAppear = ref(false) // JS custom

  // ** JS Based animations
  type TransitionHook         = (el: Element) => void
  type TransitionHookWithDone = (el: Element, done: () => void) => void

  interface StyleProps {
       style: CSSStyles
    maxValue: number
       unit?: 'px' | 'rem' | 'em'
  }

  interface AnimateOptions {
          el: Element
        done: () => void
      styles: StyleProps[]
       steps: number;
    reverse?: boolean;
  }

  type Interval = Record<string, number>
  const interval = ref<{ enter: Interval, leave: Interval }>({ enter: {}, leave: {} })

  const easeOutQuad = (t: number) => t * (2 - t)
  const easeInQuad  = (t: number) => t * t

  const animate = ({ el, done, styles, steps, reverse }: AnimateOptions) => {
    const element = el as HTMLElement
    const [refKey, ease] = reverse
      ? (['leave', easeInQuad] as const)
      : (['enter', easeOutQuad] as const)
    let finishedCount = 0

    styles.forEach(({ style, maxValue, unit }) => {
      let count = 0

      const handleInterval = () => {
        // ** Linear
        // const multiplier = maxValue / steps
        // const value = multiplier * count
        // const calc = reverse ? maxValue - value : value
        // ** With ease function
        const progress = count / steps
        const eased = ease(progress)
        const calc = maxValue * (reverse ? 1 - eased : eased)
        element.style[style] = calc + (unit ?? '')
        count++

        if (count > steps) {
          clearInterval(interval.value[refKey][style])
          delete interval.value[refKey][style] // Clean up reference
          finishedCount++
          if (finishedCount >= styles.length) done()
        }
      }

      interval.value[refKey][style] = setInterval(handleInterval, 16)
    })
  }

  const onBeforeEnter: TransitionHook = (el) => {
    const element = el as HTMLElement
    element.style.opacity   = (0).toString()
    element.style.maxHeight = (0).toString()
  }

  const   opacity = { style: 'opacity',   maxValue:  1,            } as const
  const maxHeight = { style: 'maxHeight', maxValue: 50, unit: 'px' } as const
  const    styles = [opacity, maxHeight]

  const onEnter: TransitionHookWithDone = (el, done) => {
    animate({ el, done, steps: 20, styles })
  }
  const onLeave: TransitionHookWithDone = (el, done) => {
    animate({ el, done, steps: 25, styles, reverse: true })
  }

  const onCancel = (refKey: 'enter' | 'leave') => {
    Object.values(interval.value[refKey]).forEach(id => clearInterval(id))
    interval.value[refKey] = {}
    const hue = refKey === 'enter' ? 240 : 260
    logger(hue, { [`${refKey}Cancelled`]: 'JS <div>' })
  }

  // ** <TransitionGroup> list
  const createListItem = (name: string) => ({ id: new Date().toISOString() + Math.random(), name })
  const vegetables = ['tomato', 'radish', 'turnip', 'aubergine', 'garlic']
  const list = ref(vegetables.map((veg) => createListItem(veg)))
  const input = ref('')

  function addItem() {
    const name = input.value || vegetables[Math.floor(Math.random() * vegetables.length)]!
    list.value.unshift(createListItem(name))
    input.value = ''
  }

  function removeItem(itemId: string) {
    list.value = list.value.filter(({ id }) => id !== itemId)
  }
</script>

<style scoped>
  section {
    display: flex;
    gap: 0.5rem;
    margin: 0 auto;
    padding: 0.25rem;
    max-width: 100%;
    overflow-x: scroll;
  }
  .box { overflow-wrap: break-word; max-width: 90%; }
  .center { margin: 0.5rem auto; text-align: center; }

  /* <Transition> classes */
  .p-enter-from, .p-leave-to { /* enter: initial; leave: final */
    opacity: 0;
    transform: translateY(-20px);
    height: 0; /* (only with) interpolate-size: allow-keywords; Chrome | Edge */
  }
  /* transition | animation; 'forwards' not required as this state is temporary */
  .p-enter-active { transition: 0.3s ease-out; }
  .p-leave-active { transition: 0.3s ease-in;  }
  .p-enter-to, .p-leave-from { /* enter: final; leave: initial */
    opacity: 1;
    transform: translateY(0);
    height: auto;
  }

  .if-else-enter-active { animation: fade-in  0.5s ease-out; }
  .if-else-leave-active { animation: fade-out 0.5s ease-in;  }

  /* <TransitionGroup> styles */
  form {
    display: flex;
    gap: 0.25rem;
    max-width: 90%;
    margin: 1rem auto 0;
    padding: 0.25rem;
    border-top: var(--border);
    overflow-x: scroll;
    input.box { padding: var(--padding-xs); }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    width: 500px;
    max-width: 90%;
    margin: 0.5rem auto 1rem;
    li { cursor: pointer; }
  }

  .group-enter-from, .group-leave-to { opacity: 0; transform: translateX(-30px); }
  .group-leave-to     { transform: translateX(30px); } /* translate overwrite */
  .group-enter-to, .group-leave-from { opacity: 1; transform: translateX(0);     }
  .group-enter-active { transition: all 1s ease-out; }
  .group-leave-active { transition: all 1s ease-in; position: absolute; } /* absolute: prevents layout shifts on element leave */
  .group-move         { transition: transform 0.8s ease; } /* moves other children when element added/removed */
</style>
