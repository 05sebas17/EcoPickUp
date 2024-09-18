document.addEventListener('DOMContentLoaded', async function() {
    const ctx = document.getElementById('graficoResiduos').getContext('2d');

    try {
        const response = await fetch('http://127.0.0.1:8000/historial');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const historialRecogidas = await response.json();

        const residuosPorMes = {};
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const hoy = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
            const mesTexto = `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
            residuosPorMes[mesTexto] = 0;
        }

        historialRecogidas.forEach(recogida => {
            const fechaRecogida = new Date(recogida.date);
            const mesTexto = `${meses[fechaRecogida.getMonth()]} ${fechaRecogida.getFullYear()}`;

            if (residuosPorMes.hasOwnProperty(mesTexto) && Array.isArray(recogida.materials)) {
                recogida.materials.forEach(material => {
                    residuosPorMes[mesTexto] += parseFloat(material.quantity) || 0;
                });
            }
        });

        const labels = Object.keys(residuosPorMes);
        const data = Object.values(residuosPorMes);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Residuos Reciclados (kg)',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Kilogramos'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.raw + ' kg';
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error al obtener los datos del historial:', error);
    }
});
