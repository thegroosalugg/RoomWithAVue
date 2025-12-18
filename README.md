# RoomWithAVue
Vue.JS development projects

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
#### Additional Config when installing Vue with Prettier
##### package.json
- scripts
  - "format": "prettier --write --experimental-cli src/"
- packages
  - "@vue/eslint-config-prettier": "^10.2.0",
    - adds skipFormatting to esling.config.ts - ensures they don't conflict over formatting
  - "prettier": "3.6.2",
    - same version for whole team
##### esling.config.ts
- import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
- export default defineConfigWithVueTs(
  skipFormatting,
)
##### .prettierrc.json
- {
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "vueIndentScriptAndStyle": true
}
#### Additional dependencies can be skipped when using VSCode Prettier
##### .editorconfig
- this file will prevent VSCode prettier from working
- [*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue,css,scss,sass,less,styl}]
  - remove vue (and any others with conflicting settings) from the array
