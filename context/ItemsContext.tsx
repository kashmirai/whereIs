import React, { createContext, useState, useContext } from 'react';
import { supabase } from '../supabaseClient';

interface Item {
    id? : number;
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
    oneItem : Item | null;
    addItem: (item: Item) => void;
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    searchItems: (searchQuery: string) => void;
    deleteItem: (id: number) => void;
    searchOne: (id: number) => void;
    dialogi : boolean;
    setDialogi : React.Dispatch<React.SetStateAction<boolean>>;
    dialogTyyppi : 'edit' | 'delete' | null;
    setDialogTyyppi : React.Dispatch<React.SetStateAction<'edit' | 'delete' | null>>;
    muokkausTila : boolean;
    setMuokkausTila : React.Dispatch<React.SetStateAction<boolean>>;
    editItem: (id: number, updatedItem: Item) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [items, setItems] = useState<Item[]>([]);
    const [oneItem, setOneItem] = useState<Item | null>(null);
    const [dialogi, setDialogi] = useState<boolean>(false);
    const [dialogTyyppi, setDialogTyyppi] = useState<'edit' | 'delete' | null>(null);
    const [muokkausTila, setMuokkausTila] = useState<boolean>(false);

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

    const searchOne = async (id: number) => {
        const {data, error} = await supabase.from('Item').select().eq('id', id);
        if (data && data.length > 0) {
            setOneItem(data[0] as Item);
        } else {
            console.error('Ei löytynyt esinettä id:llä:', id);

        }

     }

    const deleteItem = async (id: number, onSuccess? : () => void) => {
        const {error} = await supabase.from('Item').delete().eq('id', id);
        searchItems('');
        setDialogi(false);
        if (onSuccess) {
            onSuccess();
        } 
    }

    const editItem = async (id: number, updatedItem: Item, onSuccess?: () => void) => {
        const {data, error} = await supabase.from('Item').update(updatedItem).eq('id', id).select().single(); 
        
        if (error) {
            console.error("Virhe päivitettäessä esinettä:", error.message);
        } else {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, ...updatedItem } : item
                )
            );
            setDialogi(false);
            if ( onSuccess) {
                onSuccess();
            }
        }
    }
    

    return (
        <ItemsContext.Provider value={{ items, oneItem, dialogi, setDialogi, dialogTyyppi, setDialogTyyppi, addItem, setItems, searchItems, deleteItem, searchOne, muokkausTila, setMuokkausTila, editItem }}>
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