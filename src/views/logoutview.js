class LogoutView {
    _modal = document.querySelector('.modal');
    _overlay = document.querySelector('.overlay');

    addHandlerShowModal() {
        const btn = document.getElementById('showmodalbtn');
        if (!btn) return;

        btn.addEventListener('click', () => this._showModal());
    }

    _showModal() {
        [this._modal, this._overlay].forEach(el => el.classList.remove('hidemodal'));
        document.documentElement.classList.add('no-doc-scroll');
    }

    addHandlerHideModal() {
        const btnNo = document.getElementById('logout-no');
        const btnYes = document.getElementById('logout-yes');
        const overlay = this._overlay;

        if (btnNo) {
            btnNo.addEventListener('click', () => this._hideModal());
        }

        if (btnYes) {
            btnYes.addEventListener('click', () => {
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
                location.reload();
                this._hideModal();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => this._hideModal());
        }
    }

    _hideModal() {
        [this._modal, this._overlay].forEach(el => el.classList.add('hidemodal'));
        document.documentElement.classList.remove('no-doc-scroll');
    }


}

export default new LogoutView();
