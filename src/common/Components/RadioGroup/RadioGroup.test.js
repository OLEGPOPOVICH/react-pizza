import { fireEvent, getByDisplayValue, getByText, render } from "@testing-library/react";
import { RadioButton, RadioGroup } from "..";

describe("RadioGroup component", () => {
it("rendres", () => {
    const { container } = render(
      <RadioGroup
        label="Группа"
      >
        <RadioButton label="A" />
        <RadioButton label="B" />
      </RadioGroup>
    );

    const radioGroup = getByText(container, "Группа");
    const radioButtonGroupA = getByText(container, "A");
    const radioButtonGroupB = getByText(container, "B");

    expect(radioGroup).toBeTruthy();
    expect(radioButtonGroupA).toBeTruthy();
    expect(radioButtonGroupB).toBeTruthy();
  });

it("check value", () => {
    const { container } = render(
      <RadioGroup
        label="Группа"
      >
        <RadioButton value="A" />
        <RadioButton value="B" />
      </RadioGroup>
    );

    const radioButtonValueA = getByDisplayValue(container, "A");
    const radioButtonValueB = getByDisplayValue(container, "B");

    expect(radioButtonValueA).toHaveAttribute('value', 'A');
    expect(radioButtonValueB).toHaveAttribute('value', 'B');
  });

it("selected default value", () => {
    const { container } = render(
      <RadioGroup
        label="Группа"
        value="A"
      >
        <RadioButton value="A" />
        <RadioButton value="B" />
      </RadioGroup>
    );

    const radioButtonValueA = getByDisplayValue(container, "A");

    expect(radioButtonValueA).toBeChecked();
  });

it("radio selected with onChange", () => {
    let value = "A";

    const hadlerOnChange = ({component}) => {
      expect(component).toEqual({value: "B", name: "group", type: "radio", checked: true})
      value = component.value;
    }

    const { container, rerender } = render(
      <RadioGroup
        label="Группа"
        value={value}
        name="group"
        onChange={hadlerOnChange}
      >
        <RadioButton value="A" />
        <RadioButton value="B" />
      </RadioGroup>
    );

    const radioButtonValueA = getByDisplayValue(container, "A");
    const radioButtonValueB = getByDisplayValue(container, "B");
    expect(radioButtonValueA).toBeChecked();

    fireEvent.click(radioButtonValueB)

    rerender(
      <RadioGroup
        label="Группа"
        value={value}
        name="group"
        onChange={hadlerOnChange}
      >
        <RadioButton value="A" />
        <RadioButton value="B" />
      </RadioGroup>
    );

    expect(radioButtonValueB).toBeChecked();
  });
});