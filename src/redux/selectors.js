export const getTransactionList = (store) => (
  store && store.transactions
    ? store.transactions.allIds
    : []
);

export const getTransactionsById = (store, id) => (
  store && store.transactions && store.transactions.byIds
    ? { ...store.todos.byIds[id], id }
    : {}
);

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = (store) => (
  getTransactionList(store).map((id) => getTransactionsById(store, id))
);
