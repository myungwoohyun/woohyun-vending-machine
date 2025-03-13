'use strict'

document.addEventListener("DOMContentLoaded", () => {
    const stockFormModal = document.getElementById("sectionModal");
    const stockFormButton = document.getElementById("btnStock");
    const stockForm = document.getElementById("stockForm");
    
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
        });
    }
});