class CreateAccountView {
    _parentElement = document.getElementById('create-form');
    _feedback = document.querySelector('.feedback');
    _allInput = document.querySelectorAll('.input');
    _modal = document.querySelector('.modal');
    _overlay = document.querySelector('.overlay');
    _removeHidden;


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

    addHandleCreateForm(handler) {
        this._parentElement.addEventListener('submit', e => {
            e.preventDefault();

            const formData = new FormData(this._createForm);
            handler(formData);
            this._clearInput();
        });
    }


    _clearInput() {
        this._allInput.forEach(input => input.value = '');
    }

    _showModal() {
        this._removeHidden = [this._modal, this._overlay];
        this._removeHidden.forEach(el => el.classList.remove('hidemodal'));

    }
}

export default new CreateAccountView();
