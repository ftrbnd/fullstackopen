import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
	const onClickDelete = (todo) => () => {
		deleteTodo(todo);
	};

	const onClickComplete = (todo) => () => {
		completeTodo(todo);
	};

	return (
		<>
			{todos
				.map((todo, i) => (
					<TodoItem
						key={crypto.randomUUID()}
						todo={todo}
						onClickComplete={onClickComplete(todo)}
						onClickDelete={onClickDelete(todo)}
					/>
				))
				.reduce(
					(acc, cur) => [...acc, <hr key={crypto.randomUUID()} />, cur],
					[]
				)}
		</>
	);
};

export default TodoList;
