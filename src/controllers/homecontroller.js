import toggleView from "../views/toggleview.js";
import { slider } from '../utilities/helpers.js';
import searchView from "../views/searchview.js";
import navView from "../views/navview.js";
import * as model from '../models/model.js';
import logoutview from "../views/logoutview.js";


// Current User
const currentUserController = async function () {
    try {
        navView.closeMobileNav();


        //1. Get Current User
        const currentUser = await model.authorizeUser();

        if (currentUser) {
            // 2.Change Login to Loogout
            navView._renderAuthMarkup();

            // 3. Hide Login Ui
            navView.addHidden();

            // 4. Shows a welcome ui update
            navView.welcomeMarkup(currentUser.username);

            // 3. show modal
            logoutview.addHandlerShowModal();

            logoutview.addHandlerHideModal();
        }


    } catch (error) {
        console.error(error);
    };
};


const init = function () {
    currentUserController();

};

init();


