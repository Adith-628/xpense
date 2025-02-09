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
      const userId = data.user.id;

      // Fetch user profile details
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      // Store user details in Zustand
      useStore.getState().setUser({
        id: userId,
        email: data.user.email || "",
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
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

export async function signUp(email, password, name, phone, address) {
  try {
    // Sign up the user with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data?.user) {
      const userId = data.user.id;

      // Insert user details into the profiles table
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: userId,
          name,
          phone,
          address,
        },
      ]);

      if (profileError) {
        console.error("Error inserting profile:", profileError);
        throw profileError;
      }

      // Store user details in Zustand
      useStore.getState().setUser({
        id: userId,
        email,
        name,
        phone,
        address,
      });
    }
  } catch (error) {
    console.error("Error signing up: ", error);
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
  }

  // Listen for auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      useStore.getState().setUser({
        id: session.user.id,
        email: session.user.email || "",
      });
    } else {
      useStore.getState().setUser(null);
    }
  });

  if (session?.user) {
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      throw profileError;
    }
    useStore.getState().setUser({
      id: session.user.id,
      email: session.user.email || "",
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      total_balance: profile.total_balance || "",
    });
  }
}
