class NavView {
    _parentElement = document.querySelector('.auth');
    _signIn = document.querySelector('.sign-in');
    _profile = document.querySelector('.profile');
    _welcome = document.querySelector('.welcome');

    _renderAuthMarkup() {
        const markup = this.generateLoginMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    generateLoginMarkup() {
        return `
		<button id="showmodalbtn" class="log-out p-2 text-sm bg-primary dark:bg-slateblack text-cream rounded ">
		    Log out
	    </button>
        `;
    }

    welcomeMarkup(name) {
        this._welcome.textContent = `Welcome Back ${name}`;
    }

    addHidden() {
        this._signIn.classList.add('hidden');
    }

    closeMobileNav() {
        const closeNav = document.querySelector('.close-mobile-nav');
        const openNav = document.querySelector('.hamburgermenu');
        const mobileNav = document.querySelector('.mobile-nav');

        if (closeNav) {

            closeNav.addEventListener('click', () => {
                mobileNav.classList.add('translate-x-full');
            });
        }

        if (openNav) {
            openNav.addEventListener('click', () => {
                mobileNav.classList.remove('translate-x-full');
            });
        }
    }
}

export default new NavView();
