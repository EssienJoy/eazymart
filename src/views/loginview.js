class LoginView {
    _parentElement = document.getElementById('login-form');
    _allInput = document.querySelectorAll('.input');
    _feedback = document.querySelector('.feedback');

    _clear() {
        this._feedback.innerHTML = '';
    }

    renderError(message) {
        this._clear();
        const markup = this._generateErrorMarkup(message);
        this._feedback.insertAdjacentHTML("afterbegin", markup);
    }

    renderSpinner() {
        this._clear();
        const markup = `
      <section class='grid place-items-center col-span-3'>
        <div class='loader'></div>
      </section>`;
        this._feedback.insertAdjacentHTML("afterbegin", markup);
    }


    _generateErrorMarkup(message) {
        return `
      <p class="bg-amber-700 text-white p-3 rounded col-span-3">
        ${message}
      </p>
    `;
    }



    addHandlerLogin(handler) {
        this._parentElement.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(this._parentElement);
            handler(formData);

            this._clearInput();
        });
    }

    _clearInput() {
        this._allInput.forEach(input => input.value = '');
    }
}

export default new LoginView();
