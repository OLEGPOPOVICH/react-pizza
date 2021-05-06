import {
  fireEvent,
  getByDisplayValue,
  getByText
} from '@testing-library/dom'

import {
  render
} from "@testing-library/react";

import { CheckBox } from "./CheckBox";

describe("checkbox component", () => {
  it("renders", () => {
    const { container } = render(<CheckBox name="name" />)
    const checkbox = container.querySelector("[name='name']")

    expect(checkbox).toBeTruthy();
  });

  it("check value", () => {
    const { container } = render(<CheckBox value="Oleg" />)
    const checkbox = getByDisplayValue(container, 'Oleg');

    expect(checkbox).toHaveAttribute('value', 'Oleg');
  });

  it("check label", () => {
    const { container } = render(<CheckBox label="Oleg" />)
    const checkbox = getByText(container, "Oleg");

    expect(checkbox).toHaveTextContent("Oleg")
  });

  it("checkbox selected", () => {
    const { container } = render(<CheckBox name="name"/>)
    const checkbox = container.querySelector("[name='name']")

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked()
  });

  it("checkbox selected with onChange", () => {
    const handlerOnChange = ({component}) => {
      expect(component).toEqual({value: "Oleg", name: "name", type: "checkbox", checked: true})
    }

    const { container } = render(<CheckBox name="name" value="Oleg" onChange={handlerOnChange} />)
    const checkbox = container.querySelector("[name='name']")

    fireEvent.click(checkbox);
  });
});