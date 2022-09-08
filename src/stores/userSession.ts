import { defineStore } from 'pinia';
import { Session } from '@supabase/supabase-js';

export const userSessionStore = defineStore({
  id: 'userSession',
  state: () => ({
    session: null as Session | null,
  }),
});
