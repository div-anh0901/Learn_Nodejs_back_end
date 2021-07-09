import "./App.css";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from './views/DashBoard';
import ProtectedRouter from './components/routing/ProtectedRoute'
import PostContextProvider from "./contexts/PostContext";
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/login"
          render={(props) => <Auth {...props} authRoute="login" />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Auth {...props} authRoute="register" />}
        />
        <ProtectedRouter exact path='/dashboard' component={Dashboard} />
      </Router>
      </PostContextProvider>
    </AuthContextProvider>

  );
}

export default App;
