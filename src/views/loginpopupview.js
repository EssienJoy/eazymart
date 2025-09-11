class LoginPopupView {
    _popup = document.querySelector('.login-popup');
    _overlay = this._popup.querySelector('.overlay');
    // _btnLogin = document.getElementById('go-to-login');

    show() {
        this._popup.classList.remove('hidemodal');
        document.documentElement.classList.add('no-doc-scroll');
    }

    hide() {
        this._popup.classList.add('hidemodal');
        document.documentElement.classList.remove('no-doc-scroll');
    }


    // if(this._overlay) {
    //     this._overlay.addEventListener('click', () => this.hide());
    // }
}

export default new LoginPopupView();
