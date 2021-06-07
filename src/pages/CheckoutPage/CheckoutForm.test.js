import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CheckoutForm } from "./CheckoutForm";
import { ProviderCheckoutPage } from "./useCheckoutPageContext";

describe("CheckoutForm", () => {
  describe("on change delivery address", () => {
    it("display a message about the mandatory filling of the delivery address fields", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const address = getByTestId("address");
      const entrance = getByTestId("entrance");
      const floor = getByTestId("floor");
      const flat = getByTestId("flat");

      await act(async () => {
        fireEvent.input(address, { target: { value: "address" } });
        fireEvent.input(address, { target: { value: "" } });
        fireEvent.input(entrance, { target: { value: "entrance" } });
        fireEvent.input(entrance, { target: { value: "" } });
        fireEvent.input(floor, { target: { value: "floor" } });
        fireEvent.input(floor, { target: { value: "" } });
        fireEvent.input(flat, { target: { value: "flat" } });
        fireEvent.input(flat, { target: { value: "" } });
      });

      expect(address.nextSibling.innerHTML).toBe("Обязательное поле");
      expect(entrance.nextSibling.innerHTML).toBe("Обязательное поле");
      expect(floor.nextSibling.innerHTML).toBe("Обязательное поле");
      expect(flat.nextSibling.innerHTML).toBe("Обязательное поле");
    });

    it("display a message about the minimum number of characters for delivery address field", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const address = getByTestId("address");

      await act(async () => {
        fireEvent.input(address, { target: { value: "a" } });
      });

      expect(address.nextSibling.innerHTML).toBe("Адрес должен быть не меньше 2 символов");
    });

    it("display a message about incorrect input of fields: entrance, floor, apartment", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const entrance = getByTestId("entrance");
      const floor = getByTestId("floor");
      const flat = getByTestId("flat");

      await act(async () => {
        fireEvent.input(entrance, { target: { value: "entrance" } });
        fireEvent.input(floor, { target: { value: "floor" } });
        fireEvent.input(flat, { target: { value: "flat" } });
      });

      expect(entrance.nextSibling.innerHTML).toBe("Пароль некорректный, пароль может содержать только цифры!");
      expect(floor.nextSibling.innerHTML).toBe("Пароль некорректный, пароль может содержать только цифры!");
      expect(flat.nextSibling.innerHTML).toBe("Пароль некорректный, пароль может содержать только цифры!");
    });
  });

  describe("on change card data", () => {
    it("display a message about the mandatory filling of the card data fields", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const cardNumber = getByTestId("cardNumber");
      const cardExpiryDate = getByTestId("cardExpiryDate");
      const codeCVV = getByTestId("codeCVV");
      const cardowner = getByTestId("cardowner");

      await act(async () => {
        fireEvent.input(cardNumber, { target: { value: "1234" } });
        fireEvent.input(cardNumber, { target: { value: "" } });
        fireEvent.input(cardExpiryDate, { target: { value: "20" } });
        fireEvent.input(cardExpiryDate, { target: { value: "" } });
        fireEvent.input(codeCVV, { target: { value: "123" } });
        fireEvent.input(codeCVV, { target: { value: "" } });
        fireEvent.input(cardowner, { target: { value: "cardowner" } });
        fireEvent.input(cardowner, { target: { value: "" } });
      });

      expect(cardNumber.nextSibling.innerHTML).toBe("Обязательное поле");
      expect(cardExpiryDate.nextSibling.innerHTML).toBe("Обязательное поле");
      expect(codeCVV.nextSibling.innerHTML).toBe("Обязательное поле");
      expect(cardowner.nextSibling.innerHTML).toBe("Обязательное поле");
    });

    it("display a message about incorrect card number input", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const cardNumber = getByTestId("cardNumber");

      await act(async () => {
        fireEvent.input(cardNumber, { target: { value: "1234 5678 9123 456" } });
      });

      expect(cardNumber.nextSibling.innerHTML).toBe("Номер карты должен содержать 16 цифр!");
    });

    it("display a message about incorrect date input", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const cardExpiryDate = getByTestId("cardExpiryDate");

      await act(async () => {
        fireEvent.input(cardExpiryDate, { target: { value: "13/2020" } });
      });

      expect(cardExpiryDate.nextSibling.innerHTML).toBe("Некорректная дата");
    });

    it("display a message about incorrect card name input", async () => {
      const { getByTestId } = render(
        <ProviderCheckoutPage>
          <CheckoutForm />
        </ProviderCheckoutPage>
      );

      const cardowner = getByTestId("cardowner");

      await act(async () => {
        fireEvent.input(cardowner, { target: { value: "cardowner 1234" } });
      });

      expect(cardowner.nextSibling.innerHTML).toBe("Поле может содержать только буквы русского или латинского алфавитов");
    });
  });
});
