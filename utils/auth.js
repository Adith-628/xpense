import { useStore } from "@/src/store";
import { supabase } from "./supabase";

export async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (data.user) {
      useStore
        .getState()
        .setUser({ id: data.user.id, email: data.user.email || "" });
      await useStore.getState().fetchTransactions();
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    useStore.getState().setUser(null);
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
}

export async function initAuth() {
  // Check for existing session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user) {
    useStore.getState().setUser({
      id: session.user.id,
      email: session.user.email || "",
    });
    await useStore.getState().fetchTransactions();
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      useStore.getState().setUser({
        id: session.user.id,
        email: session.user.email || "",
      });
      await useStore.getState().fetchTransactions();
    } else {
      useStore.getState().setUser(null);
    }
  });
}
