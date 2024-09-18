document.addEventListener('DOMContentLoaded', async function() {
    const puntosTotalesElement = document.getElementById('puntosTotales');
    const tablaPuntos = document.getElementById('tablaPuntos').querySelector('tbody');
    let puntosTotales = 0;

    // Definir los puntos por tipo de material
    const puntosPorMaterial = {
        plastico: 10, // 10 puntos por cada kg de plástico
        papel: 5,     // 5 puntos por cada kg de papel
        vidrio: 15,   // 15 puntos por cada kg de vidrio
        metal: 25     // 25 puntos por cada kg de metal
    };

    // Para acumular los kilos por cada material
    const materialesAcumulados = {
        plastico: { kilos: 0, puntos: 0 },
        papel: { kilos: 0, puntos: 0 },
        vidrio: { kilos: 0, puntos: 0 },
        metal: { kilos: 0, puntos: 0 }
    };

    try {
        // Hacer una solicitud para obtener los datos desde schedules.json
        const response = await fetch('http://127.0.0.1:8000/historial');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const historialRecogidas = await response.json();

        // Calcular los puntos basados en el tipo y la cantidad de material reciclado
        historialRecogidas.forEach(recogida => {
            if (Array.isArray(recogida.materials)) {
                recogida.materials.forEach(material => {
                    const tipo = material.type.toLowerCase();
                    const cantidad = parseFloat(material.quantity) || 0;

                    // Sumar los puntos y los kilos si el material está en la lista de puntosPorMaterial
                    if (puntosPorMaterial.hasOwnProperty(tipo)) {
                        materialesAcumulados[tipo].kilos += cantidad;
                        materialesAcumulados[tipo].puntos += puntosPorMaterial[tipo] * cantidad;
                        puntosTotales += puntosPorMaterial[tipo] * cantidad;
                    }
                });
            }
        });

        // Actualizar el HTML con los puntos totales
        puntosTotalesElement.textContent = puntosTotales;

        // Llenar la tabla con el desglose de materiales
        for (const tipo in materialesAcumulados) {
            if (materialesAcumulados[tipo].kilos > 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</td>
                    <td>${materialesAcumulados[tipo].kilos.toFixed(2)} kg</td>
                    <td>${materialesAcumulados[tipo].puntos} puntos</td>
                `;
                tablaPuntos.appendChild(row);
            }
        }

    } catch (error) {
        console.error('Error al obtener el historial de recogidas:', error);
        puntosTotalesElement.textContent = 'Error al cargar los puntos.';
    }
});
