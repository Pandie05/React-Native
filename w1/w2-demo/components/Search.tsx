import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type SearchProps = {
    value: string;
    onChangeText: (text: string) => void;
};

const Search: React.FC<SearchProps> = ({ value, onChangeText }) => {
    return (
        <View style={styles.searchContainer}>
            <Icon name="search" size={20} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 10,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
        color: '#888',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});

export default Search;