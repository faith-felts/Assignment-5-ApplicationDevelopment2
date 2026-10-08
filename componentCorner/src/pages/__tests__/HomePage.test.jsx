import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders its main content and product link', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Better tools for your everyday rituals.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Useful things, chosen with care.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse all products/i })).toHaveAttribute('href', '/products');
  });
});