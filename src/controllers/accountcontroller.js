import toggleView from "../views/toggleview.js";
import createaccountView from "../views/accountview.js";
import * as model from '../models/model.js';


// User Creates Account
const createAccControler = async function (createAccData) {
    try {
        //1.  Spinner Rendered
        createaccountView.renderSpinner();

        // 2. User Creates Account
        await model.createUserAccount(createAccData);


        // 3. Modal Renders on successful acc creation
        createaccountView._showModal();
    } catch (error) {

        // Error renders on unsuccessful acc creation
        createaccountView.renderError(error.message);
    }

};



const init = function () {
    createaccountView.addHandleCreateForm(createAccControler);
};
init();


