// Tia Petts 
// January 4th, 2026
// Form Validation Script for Adoption Form

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("adoption-form"); 


    form.addEventListener("submit", async function(event) {
        // Prevent default first 
        event.preventDefault();

        // Clear previous error messages
        document.querySelectorAll(".error-message").forEach(el => el.remove());

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
        if (!emailPattern.test(emailInput.value)) {
            displayError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        // Validate Phone Number
        const phoneInput = document.getElementById("phone");
        const phonePattern = /^\d{10}$/; 
        if (!phone.value.match(phonePattern)) {
            displayError(phoneInput, "Please enter a valid 10-digit phone number.");
            isValid = false;
        }


        // Validate Animal Selection
        const animalSelect = document.getElementById("animal");
        if (animalSelect.value === "") {
            displayError(animalSelect, "Please select an animal.");
            isValid = false;
        }
        
        // Stop here if validation failed
        if (!isValid) return;

        // Ready for backend submission
        alert("Application submitted successfully!");

        console.log({
            name,
            email,
            phone,
            address: homeAddressInput.value,
            city: document.getElementById("city"),
            state: document.getElementById("state"),
            zip: zipInput.value,
            animal: animalSelect.value
          });

          const payload = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("home_address").value.trim(),
            city: document.getElementById("city").value.trim(),
            state: document.getElementById("state").value.trim(),
            zip: document.getElementById("zip_code").value.trim(),
            animal_id: Number(selectedAnimalId)
          };
          
          console.log("Submitting payload:", payload);

        // try {
        //     const response = await fetch("/api/adoptions", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             // 
        //             name: name.value,
        //             email: email.value,
        //             phone: phone.value,
        //             address: document.getElementById("home_address").value,
        //             city: document.getElementById("city").value,
        //             state: document.getElementById("state").value,
        //             zip: document.getElementById("zip_code").value,
        //             animal_id: animal.value
        //         })
        //     });

        //     const result = await response.json();

        //     if (response.ok) {
        //         alert(result.message);
        //     } else {
        //         alert("Error: " + result.error);
        //     }
        // } catch (error) {
        //     alert("An unexpected error occurred. Please try again later.");
        //     console.error("Error submitting form:", error);
        // }

        form.reset();
        // If all validations pass, allow form submission
        // if (isValid) {
        //     alert("Application submitted successfully!");
        //     form.reset();
        // }
        
    });
    // Function to display error messages
    function displayError(inputElement, message) {
        const errorElement = document.createElement("div"); 
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.textContent = message;
        inputElement.insertAdjacentElement("afterend", errorElement);
    }
});