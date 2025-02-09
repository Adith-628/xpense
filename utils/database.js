import { supabase } from "./supabase";

export async function addTransaction(userId, transaction) {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .insert({ user_id: userId, ...transaction })
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
}

export async function getTransactions(userId) {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting transactions: ", error);
    throw error;
  }
}

export async function addTransactionToSupabase(userId, transaction) {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: userId, // This should be a UUID string like "123e4567-e89b-12d3-a456-426614174000"
          description: transaction.description,
          amount: transaction.amount,
          category: transaction.category,
          date: transaction.date || new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}

export async function getBalance(userId) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("total_balance")
      .eq("id", userId);
    if (error) throw error;
    return data[0].total_balance;
  } catch (error) {
    console.error("Error getting balance: ", error);
    throw error;
  }
}

export async function getSpend(userId) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("total_spend")
      .eq("id", userId);
    if (error) throw error;
    return data[0].total_spend;
  } catch (error) {
    console.error("Error getting spend: ", error);
    throw error;
  }
}

export async function getRecentTransactions(userId, limit) {
  try {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting recent transactions: ", error);
    throw error;
  }
}
