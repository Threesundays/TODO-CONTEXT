import { sortTodosByTitle } from './helpers';
import { useState } from 'react';
import styles from './app.module.css';
import { TodoAddForm, TodoList, TodoSearchForm } from './conponents';
import { useRequestGet } from './hooks';
import { AppContext } from './Context';

export const App = () => {
	const [searchInputValue, setSearchInputValue] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
	const [isSorted, setIsSorted] = useState(false);
	const { todos, setTodos } = useRequestGet(refreshTodosFlag);

	const handleSorted = () => {
		if (!isSorted) {
			const sortedTodos = sortTodosByTitle(todos);
			setTodos(sortedTodos);
			setIsSorted(true);
		} else {
			refreshTodos();
			setIsSorted(false);
		}
	};

	return (
		<AppContext.Provider value={{ todos, setTodos, refreshTodos }}>
			<div className={styles.app}>
				<TodoAddForm />
				<TodoSearchForm
					searchInputValue={searchInputValue}
					setSearchInputValue={setSearchInputValue}
				/>
				<button onClick={handleSorted}>Abc 🠗</button>
				<TodoList searchInputValue={searchInputValue} />
			</div>
		</AppContext.Provider>
	);
};
