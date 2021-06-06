import { fireEvent, getByDisplayValue } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { CheckBox } from "./CheckBox";

describe("CheckBox component", () => {
  describe("renders", () => {
    it("renders with label property", () => {
      const { getByLabelText } = render(<CheckBox label="checkboxLabel" onChange={() => true} />);
      expect(getByLabelText(/^checkboxLabel$/g)).toBeInTheDocument();
    });

    it("renders with value property", () => {
      const { container, getByLabelText } = render(<CheckBox value="checkboxValue" onChange={() => true} />);

      expect(getByLabelText("checkboxValue")).toBeInTheDocument();
      expect(getByDisplayValue(container, "checkboxValue")).toHaveAttribute("value", "checkboxValue");
    });

    it("renders with name property", () => {
      render(<CheckBox name="checkboxName" onChange={() => true} />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("name", "checkboxName");
    });

    it("renders with default checked", () => {
      render(<CheckBox checked onChange={() => true} />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toBeChecked();
    });
  });

  it("checkbox click", () => {
    let checked = false;

    const handleChange = (e) => {
      checked = true;
      expect(e).not.toBeUndefined();
    };

    const { rerender } = render(<CheckBox checked={checked} onChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);

    rerender(<CheckBox checked={checked} onChange={handleChange} />);

    expect(checkbox).toBeChecked();
  });
});
