import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoItem from '../Todos/TodoItem';

const todo = {
	text: 'sample text',
	done: false,
};

describe('single todo', () => {
	it('renders the todo item text', () => {
		render(<TodoItem todo={todo} />);

		expect(screen.getByText('sample text')).toBeInTheDocument();
	});
});
