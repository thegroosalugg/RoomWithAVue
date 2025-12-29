<template>
  <footer>
    <hr />
    <section class="top-section">
      <!-- Keep <h1> for layout styles - Configure BrandLogo inline -->
      <h1><BrandLogo color="page" /></h1>
      <!-- Update Nav Links -->
      <nav>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Terms & Conditions</a>
      </nav>
      <h1><BrandLogo color="page" /></h1>
    </section>
    <hr />
    <section class="bottom-section">
      <p>2025 Vue App. All rights Reserved</p>
      <a href="link" target="_blank">View Source Code</a>
      <p>Vue3</p>
    </section>
  </footer>
</template>

<script setup lang="ts">
  import BrandLogo from '@/components/brand/BrandLogo.vue'
</script>

<style scoped>
  footer {
    flex-shrink: 0; /* when using height instead of min-height on top wrapper (body/#app) */
    overflow-x: auto;
    background: var(--accent);
    color: var(--box);
    box-shadow: var(--shadow-top);

    a, p, h1, hr { transition: var(--transition); }
    a:hover      { font-weight: 700; }
    hr           { border: var(--border) var(--box); }
  }

  .top-section, .bottom-section {
    display: flex;
    flex-direction: column;
    align-items: center; /* ## overwrites bottom-section > children text-align in column */
    gap: 0.5rem;
    padding: 1.5rem 1rem;
    font-size: var(--text-sm);
  }

  .top-section {
    text-align: center; /* nav links centered in column */

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start; /* Keeps <h1> elements at container top in row */
      text-align: start; /* nav links aligned on left in row */
      gap: 3rem;
    }

    h1 {
      font-size: var(--text-2xl);
      font-weight: 900;
      max-width: 100%;

      &:last-of-type {
        font-weight: 500;

        @media (min-width: 768px) { margin-left: auto; }
      }
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @media (min-width: 768px) { gap: 1rem; }
    }
  }

  .bottom-section {
    justify-content: space-between;
    font-size: var(--text-xs);
    box-shadow: var(--shadow-top);

    > * { flex-basis: 33.3333% }

    :nth-child(2) { text-align: center; }
    :nth-child(3) { text-align: end;    } /* ## overwriten by align-items: center in column */

    @media (min-width: 768px) { flex-direction: row; }
  }
</style>
