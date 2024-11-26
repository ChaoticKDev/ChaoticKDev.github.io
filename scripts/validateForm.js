document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const errorsDiv = document.getElementById("formErrors");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Clear previous errors
        errorsDiv.innerHTML = "";

        // Get form values
        const firstName = form.firstName.value.trim();
        const lastName = form.lastName.value.trim();
        const username = form.username.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();
        const confirmPassword = form.confirmPassword.value.trim();
        const gender = form.gender.value.trim();
        const address = form.address.value.trim();
        const phone = form.phone.value.trim();

        let errors = [];

        // Validation checks
        if (!firstName) errors.push("First name is required.");
        if (!lastName) errors.push("Last name is required.");
        if (!username) errors.push("Username is required.");
        if (!email) errors.push("Email is required.");
        if (!password) errors.push("Password is required.");
        if (password !== confirmPassword) errors.push("Passwords do not match.");
        if (!gender) errors.push("Gender is required.");
        if (!address) errors.push("Address is required.");
        if (!phone) errors.push("Phone number is required.");

        // Display errors or success message
        if (errors.length > 0) {
            errors.forEach((error) => {
                const errorItem = document.createElement("div");
                errorItem.textContent = error;
                errorsDiv.appendChild(errorItem);
            });
        } else {
            alert(`
                Registration Successful!
                Name: ${firstName} ${lastName}
                Username: ${username}
                Email: ${email}
                Gender: ${gender}
                Address: ${address}
                Phone: ${phone}
            `);
            form.reset();
        }
    });
});