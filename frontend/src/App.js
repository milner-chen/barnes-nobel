import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    // <h1>Hello from App</h1>
    <>
      <Navigation />
      <Switch>
        {/* <Route path="/login" component={LoginForm} /> */}
        <Route path="/signup" component={SignupFormPage} />
      </Switch>
    </>
  );
}

export default App;
