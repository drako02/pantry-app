'use client';

import { useEffect, useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton , AppBar} from "@mui/material";
import { Add, Delete, Edit } from '@mui/icons-material';
import { addItem, getItems, deleteItem, updateItem } from '@/services/firestore';
import './globals.css';
import Image from 'next/image';
import bgImage from '../../public/images/pantryImage.jpg';


interface PantryItem {
    id?: string;
    name: string;
    quantity: string;
}

const Home = () => {
    const [items, setItems] = useState<PantryItem[]>([]);
    const [newItem, setNewItem] = useState<PantryItem>({ name: '', quantity: '' });
    const [editItem, setEditItem] = useState<PantryItem|null>(null)

    useEffect(() => {
        const fetchItems = async () => {
            const fetchedItems = await getItems();
            setItems(fetchedItems);
        };
        fetchItems();
    }, []);

    const handleAddItem = async () => {
        if (newItem.name && newItem.quantity) {
            await addItem(newItem);
            setItems([...items, newItem]);
            setNewItem({ name: '', quantity: '' });
        }
    }

    const handleEditItem = (item: PantryItem) => {
        setEditItem(item);
    };

    const handleUpdateItem = async () => {
        if (editItem && editItem.id && editItem?.name && editItem.quantity) {
            await updateItem(editItem.id, { name: editItem.name, quantity: editItem.quantity });
            const updatedItems = await getItems();
            setItems(updatedItems);
            setEditItem(null);
        }
    };

    const handleDeleteItem = async (id: string) => {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
    }

    

    return (
      <div className="h-[100vh] flex flex-col justify-start items-center gap-[2.5%]">
        {/* <div className="flex justify-center items-center font-sans text-[64px] h-[%] bg-amber-300">
          Pantry App
        </div> */}
        <AppBar className=" relative flex justify-center items-center font-sans text-[24px] h-[10%]  text-black " > My Pantry</AppBar>

            <Container className="flex flex-col justify-between gap-[2%] h-[70%] w-[50%] rounded-[5px] bg-white p-[1.5%] overflow-y-auto shadow-sm ">
                <div className="flex justify-center items-center gap-[2.5%] ">
                    <TextField
                        label="Item Name"
                        value={ newItem.name }
                        onChange={ (e) =>
                            setNewItem({ ...newItem, name: e.target.value })
                        }
                    />
                    <TextField
                        label="Quantity"
                        value={ newItem.quantity }
                        onChange={ (e) =>
                            setNewItem({ ...newItem, quantity: e.target.value })
                        }
                    />
                    <Button onClick={ handleAddItem } startIcon={ <Add /> }>
                        Add Item{ " " }
                    </Button>
                </div>
                { editItem &&
                    <div className='flex justify-center items-center gap-[2.5%]'>
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
                        <Button onClick={ handleUpdateItem } startIcon={ <Edit /> }>
                            Update Item
                        </Button>
                    </div>
                }
                <List>
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
                
            </Container>
      </div>
    );
}

    export default Home;