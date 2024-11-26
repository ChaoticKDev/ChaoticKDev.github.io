document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("timeManagementForm");
    const feedback = document.getElementById("feedback");
    const timeChart = document.getElementById("timeChart");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Clear previous feedback
        feedback.textContent = "";

        // Get user input
        const work = parseFloat(form.work.value) || 0;
        const leisure = parseFloat(form.leisure.value) || 0;
        const family = parseFloat(form.family.value) || 0;
        const exercise = parseFloat(form.exercise.value) || 0;
        const sleep = parseFloat(form.sleep.value) || 0;

        const totalHours = work + leisure + family + exercise + sleep;

        // Validation: Total hours cannot exceed 24
        if (totalHours > 24) {
            feedback.textContent = "Error: The total hours cannot exceed 24!";
            return;
        }

        // Feedback: Healthy balance check
        if (sleep < 7) {
            feedback.textContent = "Consider increasing your sleep to at least 7 hours for better health.";
        } else if (exercise < 1) {
            feedback.textContent = "Consider adding at least an hour of exercise to your daily routine.";
        } else if (leisure < 1) {
            feedback.textContent = "Try to include some leisure time for relaxation.";
        } else {
            feedback.textContent = "Great job! You seem to have a balanced schedule.";
        }

        // Update chart
        const chartData = {
            labels: ["Work", "Leisure", "Family", "Exercise", "Sleep"],
            datasets: [
                {
                    label: "Daily Time Distribution",
                    data: [work, leisure, family, exercise, sleep],
                    backgroundColor: [
                        "#FF6384", // Work
                        "#36A2EB", // Leisure
                        "#FFCE56", // Family
                        "#4BC0C0", // Exercise
                        "#9966FF", // Sleep
                    ],
                },
            ],
        };

        const chartConfig = {
            type: "pie",
            data: chartData,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: "#FFFFFF",
                        },
                    },
                    tooltip: {
                        bodyColor: "#FFFFFF",
                        titleColor: "#FFFFFF",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                },
            },
        };

        new Chart(timeChart, chartConfig);
    });
});
