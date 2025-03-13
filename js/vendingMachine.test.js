import { jest } from "@jest/globals";
import { VendingMachine } from "./vendingMachine.js";

describe("VendingMachine Class", () => {
    let vm;

    beforeEach(() => {
        document.body.innerHTML = `
            <span id="balance">0</span>
            <p id="message"></p>
        `;
        Object.defineProperty(global, "localStorage", {
            value: {
                getItem: jest.fn(() => JSON.stringify({ "cola": 5, "water": 5, "coffee": 5 })),
                setItem: jest.fn(),
            },
            writable: true,
        });

        vm = new VendingMachine();
    });

    test("초기 잔액은 0원이어야 한다", () => {
        expect(vm.balance).toBe(0);
    });

    test("100원을 투입하면 잔액이 100 증가해야 한다", () => {
        vm.insertMoney(100);
        expect(vm.balance).toBe(100);
    });

    test("카드 결제 시 카드 결제 모드로 변경되어야 한다", () => {
        vm.insertMoney("card");
        expect(vm.isCardPayment).toBe(true);
        expect(document.getElementById("message").textContent).toBe("카드를 인식했습니다. 상품을 선택해주세요.");
    });

    test("잔액이 부족할 때 상품을 구매하면 구매되지 않아야 한다", () => {
        vm.purchaseProduct(1100, "cola");
        expect(document.getElementById("message").textContent).toBe("잔액이 부족합니다. 추가 금액을 투입하거나 카드를 다시 사용하세요.");
    });

    test("음료가 품절되면 구매가 불가능해야 한다", () => {
        vm.stock["cola"] = 0;
        vm.purchaseProduct(1100, "cola");
        expect(document.getElementById("message").textContent).toBe("cola는 품절되었습니다.");
    });

    test("잔액이 충분하면 상품 구매가 가능해야 한다", () => {
        vm.insertMoney(2000);
        vm.purchaseProduct(1100, "cola");
        expect(vm.balance).toBe(900);
        expect(vm.stock["cola"]).toBe(4);
        expect(document.getElementById("message").textContent).toBe("cola를 구매했습니다. 남은 잔액: 900원 (남은 재고: 4개)");
    });

    test("카드 결제로 상품을 구매하면 잔액이 차감되지 않아야 한다", () => {
        vm.insertMoney("card");
        vm.purchaseProduct(1100, "cola");
        expect(vm.balance).toBe(0);
        expect(vm.stock["cola"]).toBe(4);
    });

    test("카드 결제 후 한 번만 구매 가능해야 한다", () => {
        vm.insertMoney("card");
        vm.purchaseProduct(1100, "cola");
        vm.purchaseProduct(1100, "cola");
        expect(document.getElementById("message").textContent).toBe("잔액이 부족합니다. 추가 금액을 투입하거나 카드를 다시 사용하세요.");
    });

    test("음료 선택 시 존재하지 않는 음료라면 오류 메시지가 나와야 한다", () => {
        vm.purchaseProduct(1200, "tea");
        expect(document.getElementById("message").textContent).toBe("선택한 상품이 존재하지 않습니다.");
    });

    test("여러 번 결제 후 잔액과 재고가 정상적으로 줄어야 한다", () => {
        vm.insertMoney(5000);
        vm.purchaseProduct(1100, "cola");
        vm.purchaseProduct(600, "water");
        vm.purchaseProduct(700, "coffee");
        expect(vm.balance).toBe(2600);
        expect(vm.stock["cola"]).toBe(4);
        expect(vm.stock["water"]).toBe(4);
        expect(vm.stock["coffee"]).toBe(4);
    });
});