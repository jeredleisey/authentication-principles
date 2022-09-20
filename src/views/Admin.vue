<script setup lang="ts">
import { userSessionStore } from '../stores/userSession';

// initialize userSession store
const userSession = userSessionStore();
</script>

<template>
  <div>
    {{ userSession.session }}
  </div>
</template>
