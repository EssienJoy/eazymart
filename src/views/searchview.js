class SearchView {
    _parentElement = document.getElementById('search-form');

    getQuery() {
        return this._parentElement.querySelector('#query').value.trim().toLowerCase();
    }


    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();
