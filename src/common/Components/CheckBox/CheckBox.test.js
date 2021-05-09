import {
  fireEvent,
  getByDisplayValue,
  getByLabelText,
} from '@testing-library/dom';

import { render } from '@testing-library/react';

import { CheckBox } from './CheckBox';

describe('checkbox component', () => {
  it('renders', () => {
    const { container } = render(<CheckBox label="Oleg" />);
    const checkbox = getByLabelText(container, 'Oleg');

    expect(checkbox).toBeTruthy();
  });

  it('check value', () => {
    const { container } = render(<CheckBox value="Oleg" />);
    const checkbox = getByDisplayValue(container, 'Oleg');

    expect(checkbox).toHaveAttribute('value', 'Oleg');
  });

  it('check label', () => {
    const { container } = render(<CheckBox label="Oleg" />);
    const checkbox = getByLabelText(container, 'Oleg');
    expect(checkbox.nextElementSibling).toContainHTML('<span>Oleg</span>');
  });

  it('checkbox selected', () => {
    const { container } = render(<CheckBox label="Oleg" />);
    const checkbox = getByLabelText(container, 'Oleg');

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
