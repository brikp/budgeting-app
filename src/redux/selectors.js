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

export const getCategoryList = (store) => (
  store && store.categories
    ? store.categories.allIds
    : []
);

export const getCategoryById = (store, id) => (
  store && store.categories && store.categories.byIds
    ? { ...store.categories.byIds[id], id }
    : {}
);

export const getCategories = (store) => (
  getCategoryList(store).map((id) => getCategoryById(store, id))
);

export const getCategoryNames = (store) => (
  getCategoryList(store).map((id) => store.categories.byId[id].name)
);
