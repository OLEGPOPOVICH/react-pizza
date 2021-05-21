import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { RadioButton, RadioGroup } from 'Common/Components';

describe('RadioGroup component', () => {
  describe('renders', () => {
    it('rendres with label and value property', () => {
      const { getByLabelText, getByText, getByDisplayValue } = render(
        <RadioGroup label="Группа" onChange={() => true}>
          <RadioButton label="A" />
          <RadioButton value="B" />
        </RadioGroup>
      );

      expect(getByText('Группа')).toHaveTextContent('Группа');
      expect(getByLabelText('A')).toBeInTheDocument();
      expect(getByDisplayValue('B')).toHaveAttribute('value', 'B');
    });

    it('renders with name property', () => {
      const { getByDisplayValue } = render(
        <RadioGroup name="radioName" onChange={() => true}>
          <RadioButton value="A" />
          <RadioButton value="B" />
        </RadioGroup>
      );

      expect(getByDisplayValue('A')).toHaveAttribute('name', 'radioName');
      expect(getByDisplayValue('B')).toHaveAttribute('name', 'radioName');
    });

    it('renders with default checked', () => {
      render(<RadioButton checked onChange={() => true} />);
      const radio = screen.getByRole('radio');

      expect(radio).toBeChecked();
    });
  });

  it('radioButton click', () => {
    let checked = 'A';
    const handleChange = () => (checked = 'B');

    const { getByDisplayValue, rerender } = render(
      <RadioGroup onChange={handleChange}>
        <RadioButton value="A" checked={checked === 'A'} />
        <RadioButton value="B" checked={checked === 'B'} />
      </RadioGroup>
    );

    const radioButton = getByDisplayValue('B');
    fireEvent.click(radioButton);

    rerender(
      <RadioGroup onChange={handleChange}>
        <RadioButton value="A" checked={checked === 'A'} />
        <RadioButton value="B" checked={checked === 'B'} />
      </RadioGroup>
    );

    expect(radioButton).toBeChecked();
  });
});
