import { schedulePickupDashboard } from './apiService.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pickupForm');
    const materialList = document.getElementById('materialList');
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const materials = Array.from(materialList.querySelectorAll('.materialItem')).map(item => {
                return {
                    type: item.querySelector('.material').value,
                    quantity: item.querySelector('.cantidad').value
                };
            });

            if (materials.length === 0) {
                alert('Por favor, agrega al menos un material.');
                return;
            }

            try {
                const data = await schedulePickupDashboard(materials);
                alert(data.status);
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al programar la recogida.');
            }
        });

        document.getElementById('addMaterial').addEventListener('click', function() {
            const newMaterialItem = document.createElement('div');
            newMaterialItem.classList.add('materialItem');

            newMaterialItem.innerHTML = `
                <label for="material">Seleccionar Material:</label>
                <select class="material" name="material" required>
                    <option value="plastico">Plástico</option>
                    <option value="papel">Papel</option>
                    <option value="vidrio">Vidrio</option>
                    <option value="metal">Metal</option>
                </select>

                <label for="cantidad">Cantidad (kg):</label>
                <input type="number" class="cantidad" name="cantidad" required min="1">
            `;

            materialList.appendChild(newMaterialItem);
        });
    }
});
