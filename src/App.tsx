import React from 'react';
import TodoList from "./components/TodoList";
import {Container} from "@material-ui/core";
import ListItems from "./components/ListItems";
import {BrowserRouter, Switch, Route} from "react-router-dom";


const App = () => {

    // To all reviewers:
    // It was my first experience with TypeScript implementation. Redux is something that I may not know well, but I'm working in out.


  return (
      <React.Fragment>
          <Container maxWidth="sm">
              <BrowserRouter>
                  <Switch>
                      <Route path="/" exact component={TodoList}/>
                      <Route path={"/item"} component={ListItems}/>
                  </Switch>
              </BrowserRouter>

          </Container>
      </React.Fragment>
  );
}

export default App;
