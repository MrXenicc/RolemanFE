import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './Map.css';

const Map = ({ isVisible, onClose, campaignId }) => {
    const [mapData, setMapData] = useState(null);
    const [characterPosition, setCharacterPosition] = useState(null);
    const gridSize = 40; // Adjust the grid size as needed
    const imageUrl = 'https://i.imgur.com/WJCgCj1.jpg'; // Adjust the image URL as needed
    const mapSize = { x: gridSize, y: gridSize };

    // Ustaw zmienną CSS na elemencie root
    document.documentElement.style.setProperty('--grid-size', `${gridSize}px`);

    const updateCharacterLocation = (x, y) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            console.error('No token or username found, please log in.');
            return;
        }

        const url = `${process.env.REACT_APP_ROLEMAN_BE}/map?campaignId=${encodeURIComponent(campaignId)}&username=${encodeURIComponent(username)}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                campaignId,
                imageUrl,
                currentLocation: { x, y },
                mapSize
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Character location updated successfully');
                } else {
                    console.error('Failed to update character location', data);
                }
            })
            .catch(error => {
                console.error('Error updating character location:', error);
            });
    };

    // Render grid cells
    const renderGrid = () => {
        const gridCells = [];

        for (let i = 0; i < gridSize * gridSize; i++) {
            gridCells.push(<div key={i} className="grid-cell"></div>);
        }
        return gridCells;
    };

    // Load map data when the component becomes visible or campaignId changes
    useEffect(() => {
        if (campaignId && isVisible) { // Usunięto sprawdzanie initialPositionSet
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            if (!token || !username) {
                console.error('No token or username found, please log in.');
                return;
            }

            const url = `${process.env.REACT_APP_ROLEMAN_BE}/map?campaignId=${encodeURIComponent(campaignId)}&username=${encodeURIComponent(username)}`;

            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }})
                .then(response => response.json())
                .then(data => {
                    if (data && data.currentLocation) {
                        setMapData(data); // Store the map data
                        setCharacterPosition({
                            x: data.currentLocation.x,
                            y: data.currentLocation.y
                        });
                    } else {
                        console.error('Failed to fetch character position', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching character position:', error);
                });
        }
    }, [campaignId, isVisible]); // Usunięto initialPositionSet z zależności

    if (!isVisible) {
        return null;
    }

    // Handle dragging the character to a new location
    const handleCharacterDrop = (e, data) => {
        // Calculate new position based on the grid size
        const newX = Math.round(data.x / gridSize) * gridSize;
        const newY = Math.round(data.y / gridSize) * gridSize;

        setCharacterPosition({ x: newX, y: newY });
        updateCharacterLocation(newX, newY);
    };

    return (
        <div className="map-container">
            <button onClick={onClose} className="close-map-button">Zamknij</button>
            <div className="grid-overlay">
                {renderGrid()}
            </div>
            {characterPosition && ( // Renderuj Draggable tylko, gdy characterPosition nie jest null
                <Draggable
                    grid={[gridSize, gridSize]}
                    position={{x: characterPosition.x, y: characterPosition.y}}
                    onStop={handleCharacterDrop}
                    bounds="parent"
                >
                    <div className="character-dot"></div>
                </Draggable>
            )}
        </div>
    );
};

export default Map;
