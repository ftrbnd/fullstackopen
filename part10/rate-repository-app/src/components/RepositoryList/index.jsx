import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import { Button, Menu, Divider, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'lightgrey',
	},
	search: {
		margin: 8,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortSelection = ({ refetch }) => {
	const [visible, setVisible] = useState(false);

	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	const handleSelection = (sortingValue) => {
		switch (sortingValue) {
			case 'LATEST':
				refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
				break;
			case 'HIGHEST':
				refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
				break;
			case 'LOWEST':
				refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
				break;
			default:
				refetch();
		}

		closeMenu();
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
			}}>
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={<Button onPress={openMenu}>Sort By</Button>}>
				<Menu.Item
					onPress={() => handleSelection('LATEST')}
					title='Latest repositories'
				/>
				<Menu.Item
					onPress={() => handleSelection('HIGHEST')}
					title='Highest rated repositories'
				/>
				<Divider />
				<Menu.Item
					onPress={() => handleSelection('LOWEST')}
					title='Lowest rated repositories'
				/>
			</Menu>
		</View>
	);
};

const SearchRepositories = ({ refetch }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchKeyword] = useDebounce(searchQuery, 500);

	useEffect(() => {
		refetch({ searchKeyword });
	}, [searchKeyword]);

	return (
		<Searchbar
			style={styles.search}
			autoCapitalize={'none'}
			placeholder='Search repositories'
			onChangeText={setSearchQuery}
			value={searchQuery}
		/>
	);
};

export const RepositoryListContainer = ({
	repositories,
	refetch,
	openSingleView,
}) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ListHeaderComponent={
				<>
					<SearchRepositories refetch={refetch} />
					<SortSelection refetch={refetch} />
				</>
			}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<Pressable onPress={() => openSingleView(item.id)}>
					<RepositoryItem repository={item} />
				</Pressable>
			)}
		/>
	);
};

const RepositoryList = () => {
	const { repositories, refetch } = useRepositories();
	const navigate = useNavigate();

	const openSingleView = (id) => {
		navigate(`/repositories/${id}`);
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			refetch={refetch}
			openSingleView={openSingleView}
		/>
	);
};

export default RepositoryList;
