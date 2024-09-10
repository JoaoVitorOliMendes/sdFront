import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store';
import RouteWrapper from './navigation/RouteWrapper';

export default function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteWrapper />
      </BrowserRouter>
    </Provider>
  );
}