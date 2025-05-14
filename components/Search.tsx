import React, { useEffect } from "react";
import { Searchbar } from "react-native-paper"
import { useItems } from "../context/ItemsContext";

export const SearchComponent = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const { searchItems } = useItems();

    useEffect(() => {
        if (searchQuery !== '') {
            searchItems(searchQuery);
        } else {
            searchItems('');
        }
    }, [searchQuery]);
    
    return (
        <>
        <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}/>
        </>
    )
}