import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import Text from '../Text';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'lightgrey',
	},
	sort: {
		backgroundColor: 'lightgrey',
		textAlign: 'center',
		padding: 16,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortSelection = ({ refetch }) => {
	const [showPicker, setShowPicker] = useState(false);
	const [selection, setSelection] = useState('CREATED_AT');

	useEffect(() => {
		switch (selection) {
			case 'CREATED_AT':
				refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
				break;
			case 'HIGHEST_RATING_AVERAGE':
				refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
				break;
			case 'LOWEST_RATING_AVERAGE':
				refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
				break;
			default:
				refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
		}

		setShowPicker(false);
	}, [selection]);

	const togglePicker = () => {
		setShowPicker((prev) => !prev);
	};

	const currentSorting = () => {
		switch (selection) {
			case 'CREATED_AT':
				return 'Latest repositories';
			case 'HIGHEST_RATING_AVERAGE':
				return 'Highest rated repositories';
			case 'LOWEST_RATING_AVERAGE':
				return 'Lowest rated repositories';
			default:
				return 'Latest repositories';
		}
	};

	return (
		<View>
			<Pressable onPress={togglePicker}>
				<Text
					fontWeight={'bold'}
					style={styles.sort}>
					Sort by: {currentSorting()}
				</Text>
			</Pressable>
			{showPicker && (
				<Picker
					selectedValue={selection}
					onValueChange={(itemValue) => setSelection(itemValue)}>
					<Picker.Item
						label='Latest repositories'
						value='CREATED_AT'
					/>
					<Picker.Item
						label='Highest rated repositories'
						value='HIGHEST_RATING_AVERAGE'
					/>
					<Picker.Item
						label='Lowest rated repositories'
						value='LOWEST_RATING_AVERAGE'
					/>
				</Picker>
			)}
		</View>
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
			ListHeaderComponent={<SortSelection refetch={refetch} />}
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
