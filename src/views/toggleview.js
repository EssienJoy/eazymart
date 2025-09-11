import { STORAGE_KEY } from "../utilities/config.js";

class ToggleView {
    _toggle = document.getElementById("toggle");
    _parentElement = document.documentElement;

    constructor() {
        this._activetheme();
        this._addHandleToggle();
    }

    _addHandleToggle() {
        if (!this._toggle) return;

        this._toggle.addEventListener("change", () => {
            const isDark = this._parentElement.classList.toggle("dark");
            localStorage.setItem(STORAGE_KEY, isDark ? "dark" : " ");
        });
    }

    _activetheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;

        this._parentElement.classList.toggle("dark", stored === "dark");
    }
}

export default new ToggleView();
