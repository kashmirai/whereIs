import React, { createContext, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';

interface Item {
    nimi : string;
    kuvaus : string;
    sijainti : {
        latitude : number;
        longitude : number;
    };
    kuva : string;
}

interface ItemsContextType {
    items: Item[];
    addItem: (item: Item) => void;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    searchItems: (searchQuery: string) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [items, setItems] = useState<Item[]>([]);

    const addItem = async (item: Item) => {
        const {error} = await supabase.from('Item').insert([item])
        setItems((prevItems) => [...prevItems, item]);
    };


    const searchItems = async (searchQuery: string) => {
        const {data, error} = await supabase.from('Item').select().ilike('nimi', `%${searchQuery}%`);
        console.log('Haettu data:', data);
        if (error) {
            console.error('Virhe haettaessa dataa:', error);
        } else {
            setItems(data as Item[]);
        }
    }
    

    return (
        <ItemsContext.Provider value={{ items, addItem, setItems, searchItems }}>
            {children}
        </ItemsContext.Provider>
    );
};

export const useItems = () => {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error('useItems must be used within an ItemsProvider');
    }
    return context;
};