import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './main/index';
import Repository from './repository/index';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/respository/:repositorio" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
