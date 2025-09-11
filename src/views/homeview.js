class HomeView {
    _parentElement = document.getElementsByTagName('body');


    renderError() {
        this._parentElement.insertAdjascentHtml();
    }

}

export default new HomeView();
