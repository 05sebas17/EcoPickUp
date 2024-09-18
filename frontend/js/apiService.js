const API_URL = 'http://127.0.0.1:8000';

// Función para programar recogida desde la página de schedule
export const schedulePickupPage = async (date, address, materials) => {
    try {
        const response = await fetch(`${API_URL}/schedule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: date,
                address: address,
                materials: materials
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText} (Código: ${response.status})`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error programando la recogida en la página de schedule:', error);
        throw error;
    }
};
