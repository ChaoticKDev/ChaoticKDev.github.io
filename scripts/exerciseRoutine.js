document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("exerciseForm");
    const feedback = document.getElementById("feedback");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Clear previous feedback
        feedback.textContent = "";

        // Get user input
        const cardio = parseFloat(form.cardio.value) || 0;
        const strength = parseFloat(form.strength.value) || 0;
        const flexibility = parseFloat(form.flexibility.value) || 0;
        const rest = parseFloat(form.rest.value) || 0;

        const totalMinutes = cardio + strength + flexibility + rest;

        // Validation: Total minutes cannot exceed 1440 (24 hours)
        if (totalMinutes > 1440) {
            feedback.textContent = "Error: Total exercise and rest time cannot exceed 1440 minutes!";
            fetchRandomTip();
            return;
        }

        // Feedback: Check if balance is achieved
        if (cardio < 30) {
            feedback.textContent = "Consider adding at least 30 minutes of cardio for optimal health.";
        } else if (strength < 20) {
            feedback.textContent = "Consider including at least 20 minutes of strength training.";
        } else if (flexibility < 10) {
            feedback.textContent = "Adding 10 minutes of flexibility exercises would benefit your routine.";
        } else if (rest < 30) {
            feedback.textContent = "Ensure you have at least 30 minutes of rest and recovery.";
        } else {
            feedback.textContent = "Great! You have a balanced exercise routine.";
        }

        fetchRandomTip();
    });

    // Function to fetch and display a random tip using the Advice Slip API
    async function fetchRandomTip() {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");
            const data = await response.json();

            const advice = data.slip.advice;

            // Create a container for the advice
            const tipContainer = document.createElement("div");
            tipContainer.id = "tipContainer";

            // Style and display the advice
            tipContainer.textContent = `${advice}`;
            tipContainer.style.marginTop = "20px";
            tipContainer.style.fontFamily = "Courier New";
            tipContainer.style.fontStyle = "italic";
            tipContainer.style.color = "#fff";
            tipContainer.style.textAlign = "center";

            // Add the advice below the feedback
            const existingTip = document.getElementById("tipContainer");
            if (existingTip) {
                existingTip.remove();
            }
            feedback.appendChild(tipContainer);
        } catch (error) {
            console.error("Error fetching advice:", error);
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Unable to fetch advice at the moment.";
            errorMessage.style.marginTop = "20px";
            tipContainer.style.fontFamily = "Courier New";
            errorMessage.style.fontStyle = "italic";
            errorMessage.style.color = "#fff";
            errorMessage.style.textAlign = "center";

            const existingTip = document.getElementById("tipContainer");
            if (existingTip) {
                existingTip.remove();
            }
            feedback.appendChild(errorMessage);
        }
    }
});
