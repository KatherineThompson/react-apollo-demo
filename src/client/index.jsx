import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./app";

function renderApp() {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById("app-root"),
    );
}

renderApp();

if (module.hot) {
    module.hot.accept("./app", renderApp);
}