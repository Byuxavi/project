// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleccionar elementos del formulario
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const consultaInput = document.getElementById('consulta');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy');

    // Recuperar datos almacenados en localStorage
    const savedData = JSON.parse(localStorage.getItem('contactData')) || {};
    if (savedData.name) nameInput.value = savedData.name;
    if (savedData.email) emailInput.value = savedData.email;
    if (savedData.phone) phoneInput.value = savedData.phone;
    if (savedData.consulta) consultaInput.value = savedData.consulta;
    if (savedData.message) messageInput.value = savedData.message;

    // Guardar datos en localStorage cada vez que el usuario escriba
    [nameInput, emailInput, phoneInput, consultaInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const contactData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                consulta: consultaInput.value,
                message: messageInput.value
            };
            localStorage.setItem('contactData', JSON.stringify(contactData));
        });
    });

    // Validación del formulario antes del envío
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!privacyCheckbox.checked) {
            alert('Debes aceptar la política de privacidad antes de enviar el mensaje.');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            alert('Por favor, introduce un correo electrónico válido.');
            return;
        }

        // Simulación de envío de formulario
        alert(`¡Gracias por tu mensaje, ${nameInput.value}! Te responderemos pronto.`);
        
        // Limpiar localStorage y formulario tras el envío
        localStorage.removeItem('contactData');
        contactForm.reset();
    });

    // Validar email con una expresión regular
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Sección interactiva: ayuda al usuario
    const helpSection = document.querySelector('.help-section');
    if (helpSection) {
        helpSection.addEventListener('click', function(e) {
            if (e.target.tagName === 'H2' || e.target.tagName === 'LI') {
                e.target.style.opacity = '0.7';
                setTimeout(() => window.location.href = 'contacto.html', 200);
            }
        });

        helpSection.querySelectorAll('h2, li').forEach(element => {
            element.setAttribute('title', 'Haz clic para contactar');
            element.addEventListener('mouseenter', function() { this.style.cursor = 'pointer'; });
        });
    }

    // Lista de preguntas frecuentes y respuestas
    const faqs = [
        { pregunta: '¿Cuánto dura una sesión?', respuesta: 'Las sesiones duran entre 45 minutos y 1 hora.' },
        { pregunta: '¿Cuáles son los métodos de pago?', respuesta: 'Aceptamos tarjeta de crédito, PayPal y transferencia bancaria.' },
        { pregunta: '¿Puedo obtener una consulta gratuita?', respuesta: 'Sí, la primera consulta es gratuita durante 15 minutos.' }
    ];

    // Generar dinámicamente las preguntas en el DOM
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        faqs.forEach(({ pregunta, respuesta }) => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');
            faqItem.innerHTML = `
                <h3>${pregunta}</h3>
                <p class="faq-answer" style="display:none;">${respuesta}</p>
            `;
            faqContainer.appendChild(faqItem);

            faqItem.addEventListener('click', () => {
                const answer = faqItem.querySelector('.faq-answer');
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    // Manejo de errores en la redirección
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'A') {
            console.error('Error al redirigir.');
            alert('Hubo un problema al intentar redirigir. Por favor, intenta nuevamente.');
        }
    });

});
