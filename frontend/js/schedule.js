import { schedulePickupPage } from './apiService.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scheduleForm');
    const materialList = document.getElementById('materialList');
    const addMaterialButton = document.getElementById('addMaterial');

    // Manejar la programación de recogida
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const address = document.getElementById('address').value;
        
        // Obtener todos los materiales seleccionados
        const materials = Array.from(materialList.querySelectorAll('.materialItem')).map(item => {
            return {
                type: item.querySelector('.type').value,
                quantity: item.querySelector('.quantity').value
            };
        });

        if (!date || !address || materials.length === 0) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        try {
            const data = await schedulePickupPage(date, address, materials); 
            alert(data.status); 
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al programar la recogida.');
        }
    });

    // Agregar más materiales dinámicamente
    addMaterialButton.addEventListener('click', function() {
        const newMaterialItem = document.createElement('div');
        newMaterialItem.classList.add('materialItem');

        newMaterialItem.innerHTML = `
            <label for="type">Tipo de Material:</label>
            <select class="type" name="type" required>
                <option value="plastico">Plástico</option>
                <option value="papel">Papel</option>
                <option value="vidrio">Vidrio</option>
                <option value="metal">Metal</option>
            </select>

            <label for="quantity">Cantidad (kg):</label>
            <input type="number" class="quantity" name="quantity" required min="1">
        `;

        materialList.appendChild(newMaterialItem);
    });
});
