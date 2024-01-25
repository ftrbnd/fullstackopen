import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: 'lightgrey',
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, openSingleView }) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
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
	const { repositories } = useRepositories();
	const navigate = useNavigate();

	const openSingleView = (id) => {
		navigate(`/repositories/${id}`);
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			openSingleView={openSingleView}
		/>
	);
};

export default RepositoryList;
