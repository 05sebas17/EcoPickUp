document.addEventListener('DOMContentLoaded', async function() {
    const recogidasList = document.getElementById('recogidasList');

    try {
        // Hacer una solicitud para obtener los datos del historial desde schedules.json
        const response = await fetch('http://127.0.0.1:8000/historial');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const historialRecogidas = await response.json();

        // Verificar si el historial tiene datos
        if (historialRecogidas.length === 0) {
            recogidasList.innerHTML = '<tr><td colspan="4">No tienes recogidas programadas aún.</td></tr>';
            return;
        }

        // Mostrar las recogidas en la tabla
        historialRecogidas.forEach(recogida => {
            // Verificar que la propiedad 'materials' existe y es un array
            if (Array.isArray(recogida.materials)) {
                recogida.materials.forEach(material => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${recogida.date || 'Fecha no disponible'}</td>
                        <td>${recogida.address || 'Dirección no disponible'}</td>
                        <td>${material.type || 'Tipo no disponible'}</td>
                        <td>${material.quantity || 'Cantidad no disponible'}</td>
                    `;
                    recogidasList.appendChild(row);
                });
            } else {
                // Manejar el caso donde 'materials' no esté presente o no sea un array
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${recogida.date || 'Fecha no disponible'}</td>
                    <td>${recogida.address || 'Dirección no disponible'}</td>
                    <td colspan="2">Materiales no disponibles</td>
                `;
                recogidasList.appendChild(row);
            }
        });

    } catch (error) {
        console.error('Error al obtener el historial de recogidas:', error);
        recogidasList.innerHTML = '<tr><td colspan="4">Error al cargar el historial.</td></tr>';
    }
});
