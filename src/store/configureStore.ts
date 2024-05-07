import { createStore, combineReducers } from 'redux';
import appearancesReducer from '../reducers/appearancesReducer';
import accountReducer from '../reducers/accountReducer';

const rootReducer = combineReducers({
  appearances: appearancesReducer,
  account: accountReducer,
});

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

export default configureStore;