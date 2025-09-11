import toggleView from "../views/toggleview.js";
import loginView from "../views/loginview.js";
import * as model from "../models/model.js";
import { srcImageUpdate } from "../utilities/helpers.js";

// User Logs In

const logUserInController = async function (userLoggedInData) {
    try {
        //1.  Spinner Rendered
        loginView.renderSpinner();

        //2. User Authenticated
        await model.logUserIn(userLoggedInData);

        // 3.User Authorized
        await model.authorizeUser();

        // Change url
        window.location.href = '/src/pages/products.html';
    } catch (err) {
        loginView.renderError(err.message);
    }
};

const init = function () {
    window.addEventListener('load', srcImageUpdate);
    loginView.addHandlerLogin(logUserInController);
};
init();

