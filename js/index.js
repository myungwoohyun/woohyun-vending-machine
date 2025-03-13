'use strict'

document.addEventListener("DOMContentLoaded", () => {
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
            window.location.href = "vendingMachine.html";
        });
    }
});