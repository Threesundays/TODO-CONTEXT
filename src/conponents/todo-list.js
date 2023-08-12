import { useRequestDelete, useRequestEdit } from '../hooks';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../Context';
import { Input } from '../conponents';
import styles from '../app.module.css';

export const TodoList = ({  searchInputValue }) => {
    const { todos, setTodos, refreshTodos} = useContext(AppContext);
	const [showForm, setShowForm] = useState(false);
	const [inputEditValue, setInputEditValue] = useState('');
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [filteredTodos, setFilteredTodos] = useState(todos);

	const { requestEdit } = useRequestEdit(refreshTodos, setEditingTaskId);
	const { requestDelete } = useRequestDelete(refreshTodos);

	const handleOpenEditForm = (id, title) => {
		setEditingTaskId(id);
		setInputEditValue(title);
		setShowForm(!showForm);
	};

	const onSubmitEditForm = (event) => {
		event.preventDefault();
		const submitData = { title: inputEditValue };
		requestEdit(editingTaskId, submitData);
		setShowForm(!showForm);
	};

	useEffect(() => {
		const filteredList = todos.filter((todo) => todo.title.toLowerCase().includes(searchInputValue));
		setFilteredTodos(filteredList);
	}, [searchInputValue, todos]);

	return (
		<ol className={styles.todoList}>
			{filteredTodos.map(({ id, title }) => (
				<li key={id}>
					{title}
					<button onClick={() => requestDelete(id)}>✘</button>
					<button onClick={() => handleOpenEditForm(id, title)}>✎</button>
					{showForm && editingTaskId === id && (
						<div>
							<form onSubmit={onSubmitEditForm}>
								<Input
									type="text"
									value={inputEditValue}
									onChange={(event) => setInputEditValue(event.target.value)}
								/>
								<button type="submit">Редактировать</button>
							</form>
						</div>
					)}
				</li>
			))}
		</ol>
	);
};
