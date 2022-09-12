<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';

const state = reactive({
  firstName: '',
  lastName: '',
});

const rules = {
  firstName: { required },
  lastName: { required },
};

const v$ = useVuelidate(rules, state);
</script>

<template>
  <input
    class="border-blue-700 border-2"
    v-model="state.firstName"
    @blur="v$.firstName.$touch"
  />
  <div v-if="v$.firstName.$error">First name field has an error.</div>
  <input
    class="border-blue-700 border-2"
    v-model="state.lastName"
    @blur="v$.lastName.$touch"
  />
  <div v-if="v$.lastName.$error">Last name field has an error.</div>
</template>
