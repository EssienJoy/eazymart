class ProductsView {
  _parentElement = document.querySelector(".products-grid");
  _cartState = {};

  renderError(message) {
    this._clear();
    const markup = this._generateErrorMarkup(message);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    this._clear();
    const markup = `
    <section class='grid place-items-center col-span-3'>
    <div class='loader'>
    </div>
    </section>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }



  renderProducts(productsData) {

    if (!productsData.length) return;
    this._clear();

    const markup = productsData
      .map((product) => this._generateMarkup(product))
      .join("");

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }



  _generateErrorMarkup(message) {
    return `
      <p class="bg-amber-700 text-white p-3 rounded col-span-3">
        ${message || "Something went wrong while fetching products."}
      </p>
    `;
  }

  _addHandlerAddToCart(handler) {
    this._parentElement.addEventListener('click', (e) => {

      const productEl = e.target.closest('.product-container');
      if (!productEl) return;

      const totalCartQty = productEl.querySelector('.added-to-cart-text');

      const productId = +productEl.dataset.productId;
      const title = productEl.dataset.productTitle;
      const price = +productEl.dataset.productPrice;
      const thumbnail = productEl.dataset.productThumbnail;

      if (!this._cartState[productId]) this._cartState[productId] = 0;
      this._cartState[productId]++;

      const product = {
        id: productId,
        title,
        price,
        thumbnail,
        quantity: this._cartState[productId],
      };

      totalCartQty.textContent = 'added to';

      handler(product);
    });
  }

  _generateMarkup(product) {
    return `
        <div class="bg-white shadow-md py-3 product-container px-2 sm:px-4 dark:text-slateblack" data-product-id="${product.id}"   data-product-id="${product.id}"
         data-product-title="${product.title}"
         data-product-price="${product.price}"
         data-product-thumbnail="${product.images[0]}"
        >
          <img
            src="${product.images[0]}"
            alt="${product.title}"
            class="w-full h-[5rem] sm:h-[10rem]  object-contain block mb-3"
          />

          <div class="flex flex-col gap-1">
            <h3 class="font-semibold text-sm sm:text-lg line-clamp-1 text-primary dark:text-slateblack" >${product.title}</h3>
            <p class="text-primary text-md dark:text-slateblack font-bold"  >$${product.price}</p>
            <a class="underline text-primary dark:text-slateblack font-bold text-sm" href="#">Product Details</a>

            <p class="font-bold flex items-center gap-1">
              <span class="added-to-cart-text"> not in</span> 
              <span>
                <svg class="w-4 h-4  fill-primary dark:fill-slateblack" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 2zM1 2v2h2l3.6 7.59-1.35 2.45C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03L21 6H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </span>
            </p>

            <div class="flex justify-center items-center mt-3 cart-container">
              <button class="add-to-cart bg-primary  dark:bg-slateblack cursor-pointer p-2 rounded-sm flex items-center  gap-1">
                <p class="text-cream text-sm sm:text-md">Add to cart</p>
                <svg width="8" height="8" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.06L1.06 0L6.84 5.777C6.933 5.87 7.007 5.98 7.058 6.101C7.108 6.222 7.134 6.352 7.134 6.483C7.134 6.615 7.108 6.745 7.058 6.866C7.007 6.987 6.933 7.097 6.84 7.19L1.06 12.97L0 11.91L5.425 6.485L0 1.06Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new ProductsView();

