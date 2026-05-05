<template>
  <article class="portal-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <NuxtLink :to="to" class="portal-link">{{ actionLabel }}</NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  actionLabel: string
  to: string
}>()
</script>
