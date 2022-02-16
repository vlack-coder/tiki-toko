import Constants from 'expo-constants';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Route from './src/navigation/main';
import rootReducer from './src/redux/reducers';


const store = createStore(rootReducer, applyMiddleware(thunk))




if (firebase.apps.length === 0) {
  firebase.initializeApp(Constants.manifest.android.config.firebase)
} else {
  firebase.app()
}
export const auth = firebase.auth()
export const firestore = firebase.firestore()
// export const ddb = firebase.database()

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})

export default function App() {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}
