import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Form } from './Form';
import userEvent from '@testing-library/user-event';

describe('Form tests', () => {
  test('Form renders properly', () => {
    const wrapper = render(<Form onVatDataChange={() => {}} />);
    expect(wrapper).toBeTruthy();
  });

  test('show validation if nip text is not valid', () => {
    const wrapper = render(<Form onVatDataChange={() => {}} />);
    const nipInput = wrapper.getByLabelText('Podaj numer NIP');
    userEvent.type(nipInput, '123456789');
    const submitButton = wrapper.getByRole('button');
    userEvent.click(submitButton);
    expect(wrapper.findByText('Numer NIP musi mieć 10 cyfr')).toBeTruthy();
  });

  test('show success message after data is sent', () => {
    const wrapper = render(<Form onVatDataChange={() => {}} />);
    const nipInput = wrapper.getByLabelText('Podaj numer NIP');
    userEvent.type(nipInput, '1234567890');
    const submitButton = wrapper.getByRole('button');
    userEvent.click(submitButton);
    expect(wrapper.findByText('Dane zostały pobrane pomyślnie!')).toBeTruthy();
  });

  test('show error message after data is sent', () => {
    const wrapper = render(<Form onVatDataChange={() => {}} />);
    const nipInput = wrapper.getByLabelText('Podaj numer NIP');
    userEvent.type(nipInput, '1234567890');
    const submitButton = wrapper.getByRole('button');
    userEvent.click(submitButton);
    expect(
      wrapper.findByText('Wystąpił jakiś nieczekiwany błąd!')
    ).toBeTruthy();
  });
});
