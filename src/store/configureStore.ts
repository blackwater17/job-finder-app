import { createStore, combineReducers } from 'redux';
import appearancesReducer from '../reducers/appearancesReducer';
import accountReducer from '../reducers/accountReducer';
import filtersReducer from '@/reducers/filtersReducer';
import jobsReducer from '@/reducers/jobsReducer';

const rootReducer = combineReducers({
  appearances: appearancesReducer,
  account: accountReducer,
  filters: filtersReducer,
  jobs: jobsReducer 
});

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};

export default configureStore;