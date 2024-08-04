'use client';

import {useEffect, useState} from "react";
import {
    Container,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    AppBar
} from "@mui/material";
import {Add, Delete, Edit, Search} from "@mui/icons-material";
import {
    addItem,
    getItems,
    deleteItem,
    updateItem,
} from "@/services/firestore";
import "./globals.css";
import Image from "next/image";
import bgImage from "../../public/images/pantryImage.jpg";
import {Input} from '@headlessui/react';
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/navigation";

interface PantryItem {
    id?: string;
    name: string;
    quantity: string;
}

const Home = () => {
    const user = useAuth();
    const router = useRouter();
    const [items, setItems] = useState<PantryItem[]>([]);
    const [newItem, setNewItem] = useState<Omit<PantryItem, 'id'>>({
        name: "",
        quantity: "",
    });
    const [editItem, setEditItem] = useState<PantryItem | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchItems = async () => {
            if (!user) {
                setLoading(true);
            } else {
                const fetchedItems = await getItems(user.uid);
                setItems(fetchedItems);
                setLoading(false); // Set loading to false after fetching items
            }
        };

        fetchItems();
    }, [user]);

    useEffect(() => {
        if (!user && !loading) {
            router.push('/login');
        }
    }, [user, loading]);


    const handleAddItem = async () => {
        if (user && newItem && newItem.quantity) {
            await addItem(user.uid, newItem);
            const updatedItems = await getItems(user.uid);
            setItems(updatedItems);
            setNewItem({ name: "", quantity: "" });

        }
        // if (newItem.name && newItem.quantity) {
        //     await addItem(newItem);
        //     setItems([...items, newItem]);
        //     setNewItem({ name: "", quantity: "" });
        // }
    };

    const handleEditItem = (item: PantryItem) => {
        setEditItem(item);
    };

    const handleUpdateItem = async () => {
        if (user && editItem && editItem.id && editItem?.name && editItem?.quantity) {
            await updateItem(user.uid, editItem.id, {
                name: editItem.name,
                quantity: editItem.quantity,
            });
            const updatedItems = await getItems(user.uid);
            setItems(updatedItems);
            setEditItem(null);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (user) {
            await deleteItem(user.uid, id);
        setItems(items.filter((item) => item.id !== id));
        }
        
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if(loading) {
        return <div> Loading...</div>
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <AppBar className=" relative flex flex-row justify-between items-center px-[5%] bg-white font-sans text-[24px] h-[10%]  text-black ">
                My Pantry
                <div className="flex flex-col justify-between items-center border-[1px] rounded-[5px]">
                    <div>
                        <Input type="text" className="w-[200px] h-[36px] focus-visible:outline-none text-[14px]"
                            value={ searchQuery }
                            onChange={ (e) => setSearchQuery(e.target.value) }
                        />
                        <Search />
                    </div>
                </div>
            </AppBar>
            <div className="h-[] flex max-sm:flex-col justify-center items-start gap-[2.5%] mt-[4%]">
                <div className="flex justify-start gap-[2%] rounded-[5px] bg-white p-[1.5%] overflow-y-auto shadow-sm ">
                    <div className="flex  flex-col justify-between items-center gap-[10px] ">
                        <TextField
                            label="Item Name"
                            value={ newItem.name }
                            onChange={ (e) => setNewItem({ ...newItem, name: e.target.value }) }
                        />
                        <TextField
                            label="Quantity"
                            value={ newItem.quantity }
                            onChange={ (e) =>
                                setNewItem({ ...newItem, quantity: e.target.value })
                            }
                        />
                        <Button className="w-[223px] h-[56px] bg-black rounded-[5px] text-white" onClick={ handleAddItem } startIcon={ <Add /> }>
                            Add Item{ " " }
                        </Button>
                    </div>
                    { editItem && (
                        <div className="flex flex-col justify-between items-center gap-[10px]">
                            <TextField
                                label="Item Name"
                                value={ editItem.name }
                                onChange={ (e) =>
                                    setEditItem({ ...editItem, name: e.target.value })
                                }
                            />
                            <TextField
                                label="Quantity"
                                value={ editItem.quantity }
                                onChange={ (e) =>
                                    setEditItem({ ...editItem, quantity: e.target.value })
                                }
                            />
                            <Button className="w-[223px] h-[56px] bg-black rounded-[5px] text-white" onClick={ handleUpdateItem } startIcon={ <Edit /> }>
                                Update Item
                            </Button>
                        </div>
                    ) }
                </div>

                <div className="flex w-[300px] justify-start gap-[2%] p-[5px] rounded-[5px] bg-white">
                    <List className="w-[100%]">
                        { items.map((item) => (
                            <ListItem
                                key={ item.id }
                                className="border-b-[1px] border-[#b4b0b0]">
                                <ListItemText
                                    primary={ item.name }
                                    secondary={ `Quantity: ${item.quantity}` }
                                />
                                <IconButton onClick={ () => handleEditItem(item) }>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={ () => handleDeleteItem(item.id!) }>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        )) }
                    </List>
                </div>
            </div>
        </>
    );
};

export default Home;
