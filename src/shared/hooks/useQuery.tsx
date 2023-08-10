import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
export const useQuery = (word) => {
	const { search } = useLocation();
	const query = useMemo(() => new URLSearchParams(search), [search]);
	const id = query.get(word);

	return id;
};
