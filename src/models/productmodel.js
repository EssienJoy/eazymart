import { RES_PER_PAGE } from '../utilities/config.js';

export const state = {

    cartState: {},
    cartItem: [],
    cartQty: 0,
    page: 1,
    resultsPerPage: {
        limit: RES_PER_PAGE,
        skip: 0,
    },
    total: 0,
};


// Fetch all Products
export const allProductsData = async function () {
    try {
        const res = await fetch(`https://dummyjson.com/products`);

        if (!res.ok) throw new Error('Request Error');

        const { total } = await res.json();

        return total;

    } catch (err) {
        console.error(err);
    }
};


// Fetch Limit Products
export const productsData = async function (skip = 0) {
    try {
        const res = await fetch(`https://dummyjson.com/products?limit=${state.resultsPerPage.limit}&skip=${skip}`);

        if (!res.ok) {
            throw new Error(`Check Internet Connection`);
        }

        const products = await res.json();

        return products;

    } catch (error) {
        throw error;
    }
};



// Add product to cart (frontend only)
export const addToCart = function (product) {
    const existing = state.cartItem.find(p => p.id === product.id);

    if (existing) {
        return; // just increase qty
    } else {
        state.cartItem.push({ ...product, qty: 1 });
    }

    return state.cartItem;
};


// Total Product Cart
export const totalCartPrice = function () {
    state.total = state.cartItem.reduce(
        (acc, prod) => acc + prod.price * prod.qty,
        0
    );
    return state.total;
};


// Remove a product from cart
export const deleteFromCart = function (id) {
    state.cartItem = state.cartItem.filter(item => item.id !== +id);
    return state.cartItem;
};

// Clear the cart
export const clearCart = function () {
    state.cartItem = [];
    return state.cartItem;
};

// Update quantity (increase/decrease)
export const updateCartQuantity = function (id, action) {
    const item = state.cartItem.find(prod => prod.id === +id);
    if (!item) return;

    if (action === 'increase') {
        item.qty++;
        state.total += item.price;
        console.log(state.total);
    }
    if (action === 'decrease') {
        item.qty--;
        state.total -= item.price;
        console.log(state.total);


        if (item.qty <= 0) {

            return deleteFromCart(id);
        }
    }

    return { item: state.cartItem, total: state.total };
};
