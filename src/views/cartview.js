class CartView {
  _parentElement = document.querySelector('.addtocart-items-container');
  _cartSection = document.querySelector('.cart-section');


  constructor() {
    this._addHandlerCloseCart();
  }


  _clear() {
    this._parentElement.innerHTML = "";
  }



  renderCartProducts(cartProducts) {
    console.log(cartProducts);
    if (!cartProducts.length) {
      this._parentElement.innerHTML = this._emptyCartMarkup();
      return;
    }

    const markup = cartProducts.map(prod => this._generateMarkup(prod)).join('');
    this._parentElement.innerHTML = markup;
  }

  addHandlerCartActions(handler) {
    this._cartSection.addEventListener('click', e => {
      if (e.target.closest('.clear-cart')) {
        handler('clear');
      }

      const cartItem = e.target.closest('.cart-item');
      if (!cartItem) return;

      const id = cartItem.dataset.id;

      if (e.target.closest('.minus-cart-item')) handler('decrease', id);
      if (e.target.closest('.plus-cart-item')) handler('increase', id);
      if (e.target.closest('.trash-button')) handler('delete', id);
    });
  }


  _addHandlerCloseCart() {
    const cartSection = document.querySelector('.cart-section');
    const closeCart = document.querySelector('.close-cart-btn');
    const openCart = document.querySelector('.open-cart-btn');

    if (!cartSection) return;

    if (closeCart) {
      closeCart.addEventListener('click', () => {
        cartSection.classList.add('translate-x-full');
      });
    }

    if (openCart) {
      openCart.addEventListener('click', () => {
        cartSection.classList.remove('translate-x-full');
      });
    }
  }



  _emptyCartMarkup() {
    return `
   <li
						class="flex flex-col items-center justify-center text-center gap-2">
						<p class="text-lg font-semibold">Your Cart is Empty</p>

						<svg
							class="fill-primary dark:fill-cream"
							width="124"
							height="124"
							viewBox="0 0 124 124"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M107.239 27.6158C106.754 27.0561 106.154 26.6072 105.48 26.2996C104.806 25.9921 104.074 25.8331 103.333 25.8333H31.9352L30.9277 19.8193C30.7271 18.6129 30.1051 17.5167 29.1723 16.7258C28.2394 15.9349 27.0563 15.5006 25.8333 15.5H14.2083C12.838 15.5 11.5239 16.0443 10.5549 17.0133C9.586 17.9822 9.04166 19.2964 9.04166 20.6667C9.04166 22.037 9.586 23.3511 10.5549 24.3201C11.5239 25.289 12.838 25.8333 14.2083 25.8333H21.4572L31.0672 83.514L31.2997 84.1547L31.5787 84.9348L32.1987 85.8597L32.6895 86.4383L33.6867 87.11L34.2653 87.4458C34.8673 87.6933 35.5107 87.8248 36.1615 87.8333H93C94.3703 87.8333 95.6844 87.289 96.6534 86.3201C97.6223 85.3511 98.1667 84.037 98.1667 82.6667C98.1667 81.2964 97.6223 79.9822 96.6534 79.0133C95.6844 78.0443 94.3703 77.5 93 77.5H40.5428L39.6852 72.3333H98.1667C99.41 72.3335 100.612 71.8853 101.551 71.0711C102.491 70.2568 103.105 69.131 103.282 67.9003L108.448 31.7337C108.554 31.0007 108.5 30.2537 108.292 29.5433C108.083 28.8328 107.724 28.1755 107.239 27.6158ZM97.3762 36.1667L95.9037 46.5H77.5V36.1667H97.3762ZM72.3333 36.1667V46.5H56.8333V36.1667H72.3333ZM72.3333 51.6667V62H56.8333V51.6667H72.3333ZM51.6667 36.1667V46.5H36.1667L35.402 46.655L33.6557 36.1667H51.6667ZM36.239 51.6667H51.6667V62H37.9595L36.239 51.6667ZM77.5 62V51.6667H95.1597L93.6871 62H77.5Z" />
							<path
								d="M43.9167 108.5C48.1969 108.5 51.6667 105.03 51.6667 100.75C51.6667 96.4698 48.1969 93 43.9167 93C39.6364 93 36.1667 96.4698 36.1667 100.75C36.1667 105.03 39.6364 108.5 43.9167 108.5Z" />
							<path
								d="M90.4167 108.5C94.6969 108.5 98.1667 105.03 98.1667 100.75C98.1667 96.4698 94.6969 93 90.4167 93C86.1365 93 82.6667 96.4698 82.6667 100.75C82.6667 105.03 86.1365 108.5 90.4167 108.5Z" />
						</svg>

						<a
							href="#home"
							class="mt-4 px-4 py-2 bg-primary dark:bg-lightbrown rounded-sm flex items-center gap-2">
							<p class="font-bold dark:text-slateblack text-cream">
								Go to Shop
							</p>
							<svg
								class="fill-cream dark:fill-slateblack"
								width="10"
								height="19"
								viewBox="0 0 10 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2.04332 5.20895L2.92749 4.36978L7.74332 8.94324C7.82095 9.01652 7.88256 9.10366 7.9246 9.19965C7.96664 9.29564 7.98828 9.39858 7.98828 9.50255C7.98828 9.60652 7.96664 9.70946 7.9246 9.80545C7.88256 9.90144 7.82095 9.98858 7.74332 10.0619L2.92749 14.6377L2.04416 13.7985L6.56416 9.50374L2.04332 5.20895Z" />
							</svg>
						</a>
					</li>
    `;
  }

  priceMarkup(totalCost) {
    const priceContainer = document.querySelector('.price-cart-container');
    const markup = `
    <div class="flex justify-between text-lg font-semibold">
							<p>Total:</p>
							<p>$<span id="cart-total">${totalCost.toFixed(2) || 0}</span></p>
						</div>
            <button
							class="px-2 clear-cart text-xl rounded-sm grid place-items-center hover:bg-red">
							<svg
								class="fill-cream"
								height="25px"
								width="25px"
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 370 370"
								xml:space="preserve">
								<title>clear all cart items</title>
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<g>
										<path
											d="M366.85,71.242c-2.842-3.661-7.216-5.802-11.85-5.802H97.836L87.698,37.929c-2.173-5.896-7.791-9.813-14.075-9.813H15 c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h48.165l85.384,231.704c2.173,5.897,7.791,9.814,14.075,9.814h147.823 c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15H173.082l-13.572-36.829h160.319c6.852,0,12.832-4.642,14.531-11.279L369.531,84.16 C370.681,79.671,369.69,74.902,366.85,71.242z M257.856,162.727c5.858,5.858,5.858,15.355,0,21.213 c-2.929,2.929-6.768,4.393-10.606,4.393s-7.678-1.464-10.606-4.393L223,170.296l-13.644,13.644 c-2.929,2.929-6.768,4.393-10.606,4.393s-7.678-1.464-10.606-4.393c-5.858-5.858-5.858-15.355,0-21.213l13.643-13.644 l-13.643-13.643c-5.858-5.858-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0L223,127.87l13.644-13.644 c5.857-5.858,15.355-5.858,21.213,0c5.858,5.858,5.858,15.355,0,21.213l-13.644,13.643L257.856,162.727z"></path>
										<path
											d="M181.482,303.196c-10.687,0-19.347,8.658-19.347,19.344c0,10.686,8.66,19.344,19.347,19.344 c10.686,0,19.347-8.659,19.347-19.344C200.829,311.854,192.169,303.196,181.482,303.196z"></path>
										<path
											d="M282.311,303.196c-10.686,0-19.347,8.658-19.347,19.344c0,10.686,8.66,19.344,19.347,19.344s19.342-8.659,19.342-19.344 C301.653,311.854,292.998,303.196,282.311,303.196z"></path>
									</g>
								</g>
							</svg>
						</button>`;

    priceContainer.innerHTML = markup;

  }

  _generateMarkup(prod) {
    return `
    
        <li class="flex gap-2 cart-item px-1" data-id="${prod.id}">
          <img
            class="h-[5rem] object-contain justify-self-center bg-white p-3 "
            src="${prod.thumbnail}"
            alt="${prod.title}"
          />
      
          <div class="flex flex-col justify-between  gap-3 flex-1 ">
            <p class='text-sm'>${prod.title.slice(0, 20)}</p>
      
            <div class=" bg-primary dark:bg-lightbrown dark:text-slateblack self-start flex items-center  gap-1 p-1 rounded-sm">
              <button class="minus-cart-item p-2">
                <svg width="15" height="15" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.25H12V1.75H0V0.25Z" class='fill-cream dark:fill-slateblack' />
                </svg>
              </button>
      
              <p class="text-cream dark:text-slateblack curCartNum text-sm font-bold">${prod.qty}</p>
      
              <button class="plus-cart-item p-2">
                <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4Z"
                    class='fill-cream dark:fill-slateblack'
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13 7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11H13V7Z"
                    class='fill-cream dark:fill-slateblack'
                  />
                </svg>
              </button>
            </div>
          </div>
      
          <div class="flex flex-col items-center justify-around">
            <button class="trash-button p-1 rounded-sm grid place-items-center hover:bg-red ">
              <svg class="fill-cream w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>delete item from cart</title>
                <path d="M2.88,5,5.11,24H18.89L21.12,5ZM17.11,22H6.89L5.12,7H18.88Z"></path>
                <polygon points="21 2 15 2 15 1 13 1 13 0 11 0 11 1 9 1 9 2 3 2 3 4 21 4 21 2"></polygon>
                <polygon points="10.23 17.66 12 15.89 13.77 17.66 15.18 16.24 13.41 14.47 15.18 12.71 13.77 11.29 12 13.06 10.23 11.29 8.82 12.71 10.59 14.47 8.82 16.24 10.23 17.66"></polygon>
              </svg>
            </button>
           <p class="font-bold price text-sm bg-primary dark:bg-lightbrown dark:text-slateblack text-cream p-1.5 rounded-sm">$ ${+prod.price * prod.qty}</p>
          </div>
        </li>
      `;
  }
}

export default new CartView();


