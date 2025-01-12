import React, { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Dropdown = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState('');

    // TODO: "Name" is misleading, it should be "Id"
    const [senderName, setSenderName] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [shareStatus, setShareStatus] = useState<{type: String, message: String}>();
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
        localStorage.setItem("userId", "6783189ab0d8193ea042be3b"); // DELETE THIS WHEN ANNA IS DONE
        const fetchItems = async () => {
            try {
                const response = await fetch(`/api/user/items/${localStorage.getItem('userId')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data.items);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    /*'''useEffect(()=> {
        set
        maybe a hook for changing selected item
    }, []
    )*/

    const handleShare = async () => {
        // Validate form
        if (!selectedItem || !senderName || !recipientName) {
            setShareStatus({
                type: 'error',
                message: 'Please fill in all fields and select an item'
            });
            return;
        }

        setIsSharing(true);

        try {
            const requestorId = senderName;
            const requestorItemId = selectedItem;
            const requesteeId = recipientName;
            
            const bodyy = JSON.stringify({
                requestorId,
                requestorItemId,
                requesteeId,
                requesteeItemId: "6783b161ca6e3621902509c8",
                tradeStatus: "pending"
            });
            console.log(bodyy);
            const response = await fetch('/api/trade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyy
            });

            

            if (!response.ok) {
                throw new Error('Failed to share item');
            }

            setShareStatus({
                type: 'success',
                message: `Successfully gave away item to ${recipientName}!`
            });

            // Reset form
            setRecipientName('');
            setSelectedItem('');
        } catch (err) {
            console.log(err);
            setShareStatus({
                type: 'error',
                message: 'Failed to share item. Please try again.'
            });
        } finally {
            setIsSharing(false);
        }
    };


    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <div className="w-full max-w-md space-y-4">
            {/* Sender name input */}
            <div className="space-y-2">
                <label htmlFor="senderName" className="text-sm font-medium">
                    Your ID
                </label>
                <Input
                    id="senderName"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full"
                />
            </div>

            {/* Item selection dropdown */}
            <div className="space-y-2">
                <label className="text-sm font-medium">
                    Select Item to Share
                </label>
                <Select
                    value={selectedItem}
                    onValueChange={setSelectedItem}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item.itemName} value={item._id}>
                                {item.itemName}
                                {' - '}
                                {item.itemDescription}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Recipient name input */}
            <div className="space-y-2">
                <label htmlFor="recipientName" className="text-sm font-medium">
                    Recipient's ID
                </label>
                <Input
                    id="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter recipient's ID"
                    className="w-full"
                />
            </div>

            {/* Share button */}
            <Button 
                onClick={handleShare}
                disabled={isSharing}
                className="w-full"
            >
                {isSharing ? 'Sharing...' : 'Share Item'}
            </Button>

            {/* Status message */}
            {shareStatus && (
                <Alert variant={shareStatus.type === 'error' ? 'destructive' : 'default'}>
                    <AlertDescription>
                        {shareStatus.message}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );

};

export default Dropdown;