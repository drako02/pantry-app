'use client';

import { useEffect, useState } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Add, Delete, Update } from '@mui/icons-material';
import { addItem, getItems, deleteItem } from '@/services/firestore';
import './globals.css';


interface PantryItem {
    id?: string;
    name: string;
    quantity: string;
}

const Home = () => {
    const [items, setItems] = useState<PantryItem[]>([]);
    const [newItem, setNewItem] = useState<PantryItem>({ name: '', quantity: '' });

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

    const handleDeleteItem = async (id: string) => {
        await deleteItem(id);
        setItems(items.filter(item => item.id !== id));
    }

    const handleUpdateItem = async (item: Partial<PantryItem>) => {

    }

    return (
        <div className="h-100vh">
            <div className='flex justify-center items-center font-sans text-[64px] h-[1%] bg-amber-300'>
                Pantry App
                <div className="h-[45%]">

                </div>
            </div>

            <div>
                <Container className='flex flex-col justify-between'>
                    <div className="flex justify-center items-center gap-[2.5%] ">
                        <TextField
                            label="Item Name"
                            value={ newItem.name }
                            onChange={ (e) => setNewItem({ ...newItem, name: e.target.value }) }
                        />
                        <TextField
                            label="Quantity"
                            value={ newItem.quantity }
                            onChange={ (e) => setNewItem({ ...newItem, quantity: e.target.value }) }
                        />
                        <Button onClick={ handleAddItem } startIcon={ <Add /> } >Add Item </Button>
                    </div>
                    <List>
                        { items.map(item => (
                            <ListItem key={ item.id }>
                                <ListItemText primary={ item.name } secondary={ `Quantity: ${item.quantity}` } />
                                <IconButton>
                                    <Update />
                                </IconButton>
                                <IconButton onClick={ () => handleDeleteItem(item.id!) }>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        )) }
                    </List>
                </Container>
            </div>
        </div>
    )
}

export default Home;