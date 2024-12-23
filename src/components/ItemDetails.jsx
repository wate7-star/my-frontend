import { useParams } from 'react-router-dom';
import UseFetch from '../../UseFetch';
import React from 'react';
const ItemDetails = () => {
    const { id } = useParams(); // Extract item ID from URL
    const { data: item, loading, error } = UseFetch(`http://192.168.100.51:8001/api/items/${id}`);

    // Helper function to format the phone number
    const formatPhoneNumber = (phoneNumber) => {
        // Convert phoneNumber to a string in case it's not
        const phoneStr = String(phoneNumber);
    
        if (phoneStr.startsWith('0')) {
            // Replace leading '0' with '254' (Kenya's country code)
            return `254${phoneStr.slice(1)}`;
        }
        return phoneStr; // Return the number as is if no '0'
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!item) return <p>No item found!</p>;

    // Format the user's phone number
    const formattedPhoneNumber = formatPhoneNumber(item.phoneNumber);

    // Construct the WhatsApp message and link
    const message = `I'm interested in your ${item.name} that costs ${item.price}`;
    const encodedMessage = encodeURIComponent(message);
    const Whatsapp = `https://wa.me/${formattedPhoneNumber}?text=${encodedMessage}`;

    return (
        <div className="body">
            <div className="item-details">
                <img src={item.image} alt={item.name} />

                <div className="details">
                    <h2>Name: {item.name}</h2>
                    <h3>Sh.{item.price}</h3>
                    <h4>{item.description}</h4>
                    <h5>Location: {item.location}</h5>
                    <a href={Whatsapp} target="_blank" rel="noopener noreferrer">
                        <button>Buy</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
