import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer, { RootState } from "./root.reducer";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import send from '../helpers/request';

export default function configureStore(
    initialState?: RootState
  ): Store<RootState> {

    if (module.hot) {
      module.hot.accept("./root.reducer", () => {
          const nextRootReducer = require("./root.reducer").default;
          store.replaceReducer(nextRootReducer);
        });
      }
      const store = createStore(rootReducer, initialState!, composeWithDevTools(applyMiddleware(thunk)));
    // const store = createStore(rootReducer, initialState!, applyMiddleware(axiosMiddleware(client)));
    return store;
}