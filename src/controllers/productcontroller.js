import * as model from '../models/productmodel.js';
import * as mainModel from '../models/model.js';
import productsView from "../views/productsview.js";
import paginationview from "../views/paginationview.js";
import cartview from "../views/cartview.js";
import toggleView from "../views/toggleview.js";


// Load Products
const getProductsController = async function () {
    try {
        // 1. Render spinner
        productsView.renderSpinner();

        // 2. Fetch Products
        const { products } = await model.productsData();

        // 3. Render Products
        productsView.renderProducts(products);

        // 4. Fetch Products Length
        const total = await model.allProductsData();

        // 5. Render Pagination
        paginationview.renderPagination(model.state.page, model.state.resultsPerPage, total);
    } catch (err) {
        productsView.renderError(err.message);
    }
};

// Pagination
const getProductsPagination = async function (skip) {
    try {
        const { products } = await model.productsData(skip);
        productsView.renderProducts(products);
    } catch (err) {
        console.error(err);
    }
};

// Add to Cart
const addToCartController = async function (cartData) {

    try {

        const cart = model.addToCart(cartData);

        if (!cart || !cart.length) return;

        cartview.renderCartProducts(cart);

        model.totalCartPrice();

        cartview.priceMarkup(model.state.total);
    } catch (err) {
        console.error(err);
    }
};

// Cart Actions
const cartActionsController = async function (action, id) {

    let updatedCart;
    let totalPrice;

    if (action === 'delete') {
        const result = model.updateCartQuantity(id, action);
        updatedCart = model.deleteFromCart(id);
        totalPrice = result.total;
    };

    if (action === 'clear') {
        const result = model.clearCart();
        updatedCart = result.item;
        totalPrice = result.total;
    }

    if (action === 'increase' || action === 'decrease') {
        const result = model.updateCartQuantity(id, action);
        updatedCart = result.item ?? result;
        totalPrice = result.total ?? model.totalCartPrice();
    }

    cartview.renderCartProducts(updatedCart);
    cartview.priceMarkup(totalPrice);
};

// Init
const init = async function () {
    try {
        window.addEventListener('DOMContentLoaded', getProductsController);
        paginationview._addHandlerPageNumber(getProductsPagination);

        const currentUser = await mainModel.authorizeUser();

        if (currentUser) {
            cartview.addHandlerCartActions(cartActionsController);
            productsView._addHandlerAddToCart(addToCartController);
        }
    } catch (err) {
        console.error(err);

    }

};

init();
