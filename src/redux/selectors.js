export const getTransactionList = (store) => (
  store && store.transactions
    ? store.transactions.allIds
    : []
);

export const getTransactionsById = (store, id) => (
  store && store.transactions && store.transactions.byIds
    ? { ...store.transactions.byIds[id], id }
    : {}
);

export const getTransactions = (store) => (
  getTransactionList(store).map((id) => getTransactionsById(store, id))
);
