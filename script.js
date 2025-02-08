// Array de productos disponibles
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" }
];

document.addEventListener("DOMContentLoaded", () => {
    populateProductDropdown();
    setupFormSubmission();
});

// 📌 Poblar dinámicamente el select de productos
function populateProductDropdown() {
    const productSelect = document.getElementById("product");
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// 📌 Manejo del envío del formulario con confirmación y almacenamiento local
function setupFormSubmission() {
    const form = document.getElementById("review-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío automático

        // Obtener valores del formulario
        const product = document.getElementById("product").value;
        if (!product) {
            alert("Por favor, selecciona un producto antes de enviar tu reseña.");
            return;
        }

        // Confirmación antes de enviar
        const confirmSend = confirm(`¿Estás seguro de enviar la reseña para ${product}?`);
        if (!confirmSend) return;

        // Guardar reseña en localStorage
        saveReview({ product });

        // Redirigir a la página de confirmación con parámetros
        window.location.href = `review.html?product=${encodeURIComponent(product)}`;
    });
}

// 📌 Guardar la reseña en localStorage
function saveReview(reviewData) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}
