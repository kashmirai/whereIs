import React, { useEffect } from "react";
import { Text, View } from "react-native"
import { Searchbar } from "react-native-paper"
import { supabase } from "../supabaseClient";
import { useItems } from "../context/ItemsContext";



export const SearchComponent = () => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const { items, searchItems } = useItems();

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
                  value={searchQuery}
                  />
        </>
    )
}