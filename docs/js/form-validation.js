// Tia Petts 
// January 4th, 2026
// Form Validation Script for Adoption Form

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("adoption-form"); 


    form.addEventListener("submit", async function(event) {
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault(); 
        }
        // Clear previous error messages
        const errorElements = document.querySelectorAll(".error-message");
        errorElements.forEach(el => el.remove());   
        let isValid = true;
        // Validate Name
        const nameInput = document.getElementById("name");      
        if (nameInput.value.trim() === "") {
            displayError(nameInput, "Please enter your name.");
            isValid = false;
        }
        // Validate Email
        const emailInput = document.getElementById("email");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.match(emailPattern)) {
            displayError(emailInput, "Please enter a valid email address.");
            isValid = false;

        }
        // Validate Phone Number
        const phoneInput = document.getElementById("phone");
        const phonePattern = /^\d{10}$/; // Simple pattern for 10 digit numbers
        if (phoneInput.value && !phoneInput.value.match(phonePattern)) {
            displayError(phoneInput, "Please enter a valid 10-digit phone number.");
            isValid = false;
        }
        // Validate Animal Selection
        const animalSelect = document.getElementById("animal");
        if (animalSelect.value === "") {
            displayError(animalSelect, "Please select an animal.");
            isValid = false;
        }
        
        // If all validations pass, allow form submission
        if (isValid) {
            alert("Application submitted successfully!");
            form.reset();
        }
        
    });
    // Function to display error messages
    function displayError(inputElement, message) {
        const errorElement = document.createElement("div"); 
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.textContent = message;
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
});