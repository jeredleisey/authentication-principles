<script setup lang="ts">
const emit = defineEmits(['login-with-provider']);
const props = defineProps<{ provider: string }>();

function buttonClick() {
  emit('login-with-provider', props.provider);
}
</script>

<template>
  <button
    class="bg-white border py-2 w-full rounded-md flex justify-center items-center text-sm hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
    @click="buttonClick"
  >
    <img :src="`/authentication-principles/${props.provider}.svg`" />
  </button>
</template>
