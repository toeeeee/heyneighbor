import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/select';

const Dropdown = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/items');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full max-w-xs">
            <Select
                value={selectedItem}
                onValueChange={setSelectedItem}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                    {items.map((item) => (
                        <SelectItem key={item._id} value={item.value}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Dropdown;