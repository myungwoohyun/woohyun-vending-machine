'use strict';
import vmInstance from "./vendingMachine.js";

document.addEventListener("DOMContentLoaded", () => {
    const stockFormModal = document.getElementById("sectionModal");
    const stockFormButton = document.getElementById("btnStock");
    const stockForm = document.getElementById("stockForm");
    const inputs = document.querySelectorAll("input[type='number']");

    const initializeStockForm = () => {
        const savedStock = JSON.parse(localStorage.getItem("vendingMachineStock")) || {};

        inputs.forEach(elm => {
            const type = elm.getAttribute("data-type");
            if (!type) return;

            elm.value = savedStock[type] !== undefined ? savedStock[type] : 5;

            elm.addEventListener("input", () => {
                const updatedStock = JSON.parse(localStorage.getItem("vendingMachineStock")) || {};
                updatedStock[type] = elm.value;
                localStorage.setItem("vendingMachineStock", JSON.stringify(updatedStock));
                vmInstance.updateStock(updatedStock);
            });
        });
    };

    if (stockForm) {
        stockForm.addEventListener("submit", e => {
            e.preventDefault();
            const stock = {
                "cola": parseInt(document.getElementById("stockCola").value, 10),
                "water": parseInt(document.getElementById("stockWater").value, 10),
                "coffee": parseInt(document.getElementById("stockCoffee").value, 10)
            };
            localStorage.setItem("vendingMachineStock", JSON.stringify(stock));
            stockFormModal.removeAttribute("data-mode");
        });

        stockFormButton.addEventListener("click", () => {
            stockFormModal.setAttribute("data-mode", true);
            initializeStockForm();
        });

        initializeStockForm();
    }
});