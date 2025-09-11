class PaginationView {
  _parentElement = document.querySelector('.button-pagination');
  _curNum;
  _skipPage;
  _limitPage;
  _maxPage;



  renderPagination(pagenum, page, total) {
    this._curNum = pagenum;
    this._skipPage = page.skip;
    this._limitPage = page.limit;
    this._maxPage = total;

    const markUp = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  _addHandlerPageNumber(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const prev = e.target.closest('.prev');
      const next = e.target.closest('.next');
      const firstPage = e.target.closest('.first-page');
      const lastPage = e.target.closest('.last-page');

      const pageNumber = this._parentElement.querySelector('.page-number');

      if (prev && this._curNum > 1) {
        this._curNum--;
        this._skipPage = this._skipPage - this._limitPage;
        handler(this._skipPage);
      }

      if (next && this._skipPage < Math.round(this._maxPage - this._skipPage / this._limitPage)) {
        this._curNum++;
        this._skipPage = this._skipPage + this._limitPage;
        handler(this._skipPage);
      }

      if (firstPage) {
        this._curNum = 1;
        this._skipPage = 0;
        handler(this._skipPage);
      }

      if (lastPage) {
        this._skipPage = this._maxPage - this._limitPage;
        this._curNum = Math.round(this._skipPage / this._limitPage);
        handler(this._skipPage);
      }

      pageNumber.textContent = this._curNum;

    });
  }


  _generateMarkup() {
    return `
          <div class='flex flex-col sm:flex-row gap-3 text-cream dark:text-slateblack'>
            <button class="first-page bg-primary dark:bg-lightbrown  " >
              <span class='text-sm '>First Page</span>
            </button>
            <button class="prev bg-primary dark:bg-lightbrown " >
              <span class='text-sm'>Prev</span>
            </button>
          </div>

          <p class="page-number self-center bg-primary dark:bg-lightbrown text-cream dark:text-slateblack  px-4 font-bold grid place-items-center text-lg mx-10 rounded-sm">
          ${this._curNum}
          </p>
      
          <div class='flex flex-col-reverse sm:flex-row  gap-3 text-cream dark:text-slateblack'>
            <button class="next bg-primary dark:bg-lightbrown  " >
              <span class='text-sm'>Next</span>
            </button>
            <button class="last-page bg-primary dark:bg-lightbrown  " >
              <span class='text-sm'>Last Page</span>
            </button>
          </div>
        `;
  }

}

export default new PaginationView();
