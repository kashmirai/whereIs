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
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = async (item: Item) => {
        const {error} = await supabase.from('Item').insert([item])
        setItems((prevItems) => [...prevItems, item]);
    };

    return (
        <ItemsContext.Provider value={{ items, addItem }}>
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