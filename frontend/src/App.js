import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";

function App() {
  return (
    // <h1>Hello from App</h1>
    <Switch>
      <Route path="/login" component={LoginFormPage} />
      <Route path="/signup" component={SignupFormPage} />
    </Switch>
  );
}

export default App;
