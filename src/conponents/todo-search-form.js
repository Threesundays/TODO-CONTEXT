import { Input } from '../conponents';

export const TodoSearchForm = ({ searchInputValue, setSearchInputValue }) => {
	return (
		<form>
			<Input
				name="search"
				type="text"
				placeholder="Поиск"
				value={searchInputValue}
				onChange={(event) => setSearchInputValue(event.target.value)}
			/>
		</form>
	);
};
