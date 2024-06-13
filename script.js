document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const fechaCita = new Date(document.getElementById('fecha_cita').value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for comparison

    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1); // Add one day to get tomorrow's date
    mañana.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for comparison

    if (fechaCita < hoy || fechaCita > mañana) {
        alert('La fecha de la cita solo puede ser hoy o mañana.');
        return; // Stop form submission
    }

    const tipoNovedad = document.querySelector('input[name="tipo_novedad"]:checked');
    if (tipoNovedad && tipoNovedad.value === 'Novedad con cargue') {
        alert('No se puede enviar el formulario si hay una novedad con cargue.');
        return; // Stop form submission
    }

    // Proceed with form submission if validations pass
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    fetch('https://script.google.com/macros/s/AKfycby4ZsdxhSQLGiPF12HFVLYK4Djj6jlMEpE5zo1IEKeWdZmaQq6shXUA7KeMQXBcKavvJw/exec', { // Reemplaza con tu URL de despliegue
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then(response => {
        // Check for successful response
        if (response.ok || response.type === 'opaque') {
            alert('Formulario enviado exitosamente');
            event.target.reset(); // Reset the form after successful submission
        } else {
            alert('Hubo un problema al enviar el formulario');
        }
    })
    .catch(error => {
        alert('Hubo un error: ' + error.message);
    });
});
