import { createClient, Provider } from '@supabase/supabase-js';
import router from '../router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TODO: Set up friendly app name for Google https://github.com/supabase/supabase/discussions/2925

// login function
const login = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signIn(
      {
        email: email,
        password: password,
      },
      {
        redirectTo: 'https://www.jeredleisey.com/authentication-principles',
      }
    );
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

// login with provider
const loginWithProvider = async (provider: Provider) => {
  try {
    const { error } = await supabase.auth.signIn(
      {
        provider: provider,
      },
      {
        redirectTo: 'https://www.differentialdesign.io/',
      }
    );
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

// logout function
const logOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push('/');
  } catch (error) {
    alert((error as Error).message);
  }
};

// create account
const createAcct = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        redirectTo: 'https://www.differentialdesign.io',
      }
    );
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

// send forgot password email
const forgotPwd = async (email: string) => {
  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo: 'https://www.differentialdesign.io/reset-password',
    });
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

// update user password
const updatePwd = async (password: string) => {
  try {
    const { error } = await supabase.auth.update({
      password: password,
    });
    if (error) throw error;
  } catch (error) {
    alert((error as Error).message);
  }
};

export {
  supabase,
  login,
  loginWithProvider,
  logOut,
  createAcct,
  forgotPwd,
  updatePwd,
};
