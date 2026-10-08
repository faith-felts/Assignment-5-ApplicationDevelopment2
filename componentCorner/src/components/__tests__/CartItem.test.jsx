import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CartItem from '../CartItem';

const item = {
  cartItemId: 'cart-item-1',
  name: 'Halo Desk Light',
  price: 128,
  quantity: 2,
};

describe('CartItem', () => {
  it('renders the item name, price, and quantity', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />);

    expect(screen.getByRole('heading', { name: item.name })).toBeInTheDocument();
    expect(screen.getByText('$128.00')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
  });

  it('calls onRemove with the cart item id when removed', () => {
    const onRemove = vi.fn();

    render(<CartItem item={item} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: `Remove ${item.name} from cart` }));

    expect(onRemove).toHaveBeenCalledWith(item.cartItemId);
  });
});