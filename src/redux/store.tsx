import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer, { RootState } from "./root.reducer";

export default function configureStore(
    initialState?: RootState
  ): Store<RootState> {

    const client = axios.create({
        baseURL: 'http://localhost:4200',
        responseType: 'json'
      });

    const store = createStore(rootReducer, initialState!, applyMiddleware(axiosMiddleware(client)));
    return store;
}