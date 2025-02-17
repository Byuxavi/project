document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { question: "¿Te sientes con energía durante el día?", options: ["Sí", "A veces", "No"] },
        { question: "¿Tienes dificultades para dormir?", options: ["Nunca", "A veces", "Frecuentemente"] },
        { question: "¿Sientes que manejas bien el estrés?", options: ["Sí", "A veces", "No"] }
    ];

    const questionsContainer = document.getElementById("questions-container");
    
    // Generar las preguntas dinámicamente
    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${q.question}</p>
            ${q.options.map(opt => `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label>
            `).join('')}
        `;
        questionsContainer.appendChild(div);
    });

    // Objeto para manejar los resultados del test
    const testResults = {
        answers: [],
        score: 0,
        evaluate() {
            this.score = this.answers.reduce((acc, answer) => 
                acc + (answer === "Sí" || answer === "Nunca" ? 2 : answer === "A veces" ? 1 : 0), 0
            );

            if (this.score >= 5) {
                return "¡Tu bienestar emocional parece estar en buen estado! 😊";
            } else if (this.score >= 3) {
                return "Tu bienestar emocional es moderado. Considera mejorar tu rutina. 🤔";
            } else {
                return "Podrías necesitar hacer ajustes en tu bienestar emocional. ¡Cuídate! ❤️";
            }
        }
    };

    // Evento de envío del formulario
    document.getElementById("test-form").addEventListener("submit", function(event) {
        event.preventDefault();

        // Capturar respuestas seleccionadas
        testResults.answers = Array.from(document.querySelectorAll("input[type='radio']:checked"))
            .map(input => input.value);

        // Evaluar y mostrar resultados
        const evaluation = testResults.evaluate();
        localStorage.setItem("testResults", JSON.stringify(testResults.answers));
        document.getElementById("result-container").innerHTML = `
            <h2>Resultado:</h2>
            <p>${evaluation}</p>
        `;
    });

    // Mostrar resultados anteriores si existen
    const savedResults = JSON.parse(localStorage.getItem("testResults"));
    if (savedResults) {
        document.getElementById("result-container").innerHTML = `
            <h2>Resultado anterior:</h2>
            <p>Tus respuestas previas: ${savedResults.join(", ")}</p>
        `;
    }
});
