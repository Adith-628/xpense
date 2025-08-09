import { transactionAPI } from "./api";

export async function addTransaction(userId, transaction) {
  try {
    const response = await transactionAPI.createTransaction(transaction);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
}

export async function getTransactions(userId) {
  try {
    const response = await transactionAPI.getTransactions();
    return response.data || [];
  } catch (error) {
    console.error("Error getting transactions: ", error);
    throw error;
  }
}

export async function addTransactionToDatabase(userId, transaction) {
  try {
    const response = await transactionAPI.createTransaction({
      title: transaction.description || transaction.title,
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      transaction_type: transaction.transaction_type || "expense",
      date: transaction.date || new Date().toISOString().split("T")[0],
    });
    return response.data;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}

export async function getBalance(userId) {
  try {
    const response = await transactionAPI.getStatsSummary();
    return response.data?.net_balance || 0;
  } catch (error) {
    console.error("Error getting balance: ", error);
    throw error;
  }
}

export async function getSpend(userId) {
  try {
    const response = await transactionAPI.getStatsSummary();
    return response.data?.total_expenses || 0;
  } catch (error) {
    console.error("Error getting spend: ", error);
    throw error;
  }
}

export async function getRecentTransactions(userId, limit = 8) {
  try {
    const response = await transactionAPI.getTransactions({
      limit: limit,
      offset: 0,
    });
    return response.data || [];
  } catch (error) {
    console.error("Error getting recent transactions: ", error);
    throw error;
  }
}

export async function getExpenseStatistics(userId) {
  try {
    const response = await transactionAPI.getStatsCategories({
      transaction_type: "expense",
    });
    return response.data || [];
  } catch (error) {
    console.error("Error getting expense statistics: ", error);
    throw error;
  }
}

export const getDebitTotals = async (userId) => {
  try {
    // Get summary stats for expenses
    const response = await transactionAPI.getStatsSummary();

    if (response.data) {
      return [
        {
          period: "total",
          total_amount: response.data.total_expenses,
          transaction_count: response.data.transaction_count,
        },
      ];
    }

    return [];
  } catch (err) {
    console.error("Error fetching debit totals:", err);
    return [];
  }
};

export async function deleteTransaction(transactionId) {
  try {
    const response = await transactionAPI.deleteTransaction(transactionId);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

export async function updateTransaction(transactionId, updates) {
  try {
    const response = await transactionAPI.updateTransaction(
      transactionId,
      updates
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
}
