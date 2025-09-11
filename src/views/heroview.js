class WelcomeView {

    _welcome = document.querySelector('.welcome');

    changeText(username) {
        this._welcome.textContent = `Welcome back ${username},running out of outfits?`;
    }

}

export default new WelcomeView();
