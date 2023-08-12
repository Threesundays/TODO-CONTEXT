import { Input } from '../conponents';
import { useRequestAdd } from '../hooks';
import { useState, useContext } from 'react';
import { AppContext } from '../Context';

export const TodoAddForm = () => {
	const { refreshTodos } = useContext(AppContext);
	const [inputValue, setInputValue] = useState('');

	const { requestAdd } = useRequestAdd(refreshTodos);

	const onSubmit = (event) => {
		event.preventDefault();
		const submitData = { title: inputValue };
		requestAdd(submitData);
		setInputValue('');
	};

	return (
		<form onSubmit={onSubmit}>
			<Input
				name="todo"
				type="text"
				placeholder="Введите задачу"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
			/>
			<button>✔</button>
		</form>
	);
};
