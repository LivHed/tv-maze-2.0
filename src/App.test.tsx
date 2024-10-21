import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('header renders', () => {
  render(<App />);
  const header = screen.getByText(/tvmaze/i);
  expect(header).toBeInTheDocument();
});
