'use strict'

class VendingMachine {
    constructor() {
        this.balance = 0;
        this.isCardPayment = false;
        this.messageElement = document.getElementById("message");
        this.balanceElement = document.getElementById("balance");
        this.stock = JSON.parse(localStorage.getItem("vendingMachineStock")) || { "cola": 5, "water": 5, "coffee": 5 };
        this.init();
    }

    insertMoney(amount) {
        if (amount === "card") {
            this.isCardPayment = true;
            this.messageElement.textContent = "카드를 인식했습니다. 상품을 선택해주세요.";
            return;
        }
        this.balance += amount;
        this.isCardPayment = false;
        this.updateUI(`${amount}원이 투입되었습니다. 현재 잔액: ${this.balance}원`);
    }

    purchaseProduct(price, name) {
        if (!this.stock.hasOwnProperty(name)) {
            this.messageElement.textContent = "선택한 상품이 존재하지 않습니다.";
            return;
        }
        if (this.stock[name] <= 0) {
            this.messageElement.textContent = `${name}는 품절되었습니다.`;
            return;
        }
        if (this.isCardPayment || this.balance >= price) {
            if (!this.isCardPayment) {
                this.balance -= price;
            }
            this.stock[name]--;
            localStorage.setItem("vendingMachineStock", JSON.stringify(this.stock));
            this.updateUI(`${name}를 구매했습니다. 남은 잔액: ${this.balance}원 (남은 재고: ${this.stock[name]}개)`);
            this.isCardPayment = false;
        } else {
            this.messageElement.textContent = "잔액이 부족합니다. 추가 금액을 투입하거나 카드를 다시 사용하세요.";
        }
    }

    updateUI(message) {
        this.balanceElement.textContent = this.balance;
        this.messageElement.textContent = message;
    }

    init() {
        document.getElementById("btn-100")?.addEventListener("click", () => this.insertMoney(100));
        document.getElementById("btn-500")?.addEventListener("click", () => this.insertMoney(500));
        document.getElementById("btn-1000")?.addEventListener("click", () => this.insertMoney(1000));
        document.getElementById("btn-5000")?.addEventListener("click", () => this.insertMoney(5000));
        document.getElementById("btn-10000")?.addEventListener("click", () => this.insertMoney(10000));
        document.getElementById("btn-card")?.addEventListener("click", () => this.insertMoney("card"));

        document.getElementById("btn-cola")?.addEventListener("click", () => this.purchaseProduct(1100, "cola"));
        document.getElementById("btn-water")?.addEventListener("click", () => this.purchaseProduct(600, "water"));
        document.getElementById("btn-coffee")?.addEventListener("click", () => this.purchaseProduct(700, "coffee"));
    }
}
export default VendingMachine;