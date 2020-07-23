import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./services/serviceWorker";
// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import appReducers from "./store/reducers/rootReducer";

const store = createStore(appReducers, applyMiddleware(thunk));

ReactDOM.render(
    <React.StrictMode>
        {/* Redux Store */}
        <Provider store={store}>
            <App />
        </Provider>
        ,
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
