import React from 'react';
import { Route } from 'react-router-dom';
import App from './src/components/app';
import Quiz from './src/components/quiz';

export default (
  <Route exact path='/' component={App} />
  <Route exact path='/quiz' component={Quiz}/>
)
