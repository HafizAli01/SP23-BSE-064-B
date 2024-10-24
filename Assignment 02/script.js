document.getElementById('checkoutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true;

    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const city = document.getElementById('city');

    // Clear previous error messages and styles
    clearErrors(name, 'nameError');
    clearErrors(email, 'emailError');
    clearErrors(address, 'addressError');
    clearErrors(city, 'cityError');

    // Validate Name
    if (name.value.trim() === '') {
        showError(name, 'nameError', 'Name is required.');
        isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value.trim() === '') {
        showError(email, 'emailError', 'Email is required.');
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, 'emailError', 'Please enter a valid email.');
        isValid = false;
    }

    // Validate Address
    if (address.value.trim() === '') {
        showError(address, 'addressError', 'Address is required.');
        isValid = false;
    }

    // Validate City
    if (city.value.trim() === '') {
        showError(city, 'cityError', 'City is required.');
        isValid = false;
    }

    // If the form is valid, show success message
    if (isValid) {
        alert('Form submitted successfully!');
    }
});

// Function to show error messages and style the input field
function showError(inputElement, errorElementId, errorMessage) {
    document.getElementById(errorElementId).textContent = errorMessage;
    inputElement.style.border = '2px solid red';
}

// Function to clear error messages and styles when user focuses on the input field
function clearErrors(inputElement, errorElementId) {
    inputElement.addEventListener('focus', function () {
        document.getElementById(errorElementId).textContent = '';
        inputElement.style.border = '1px solid #ced4da'; // Reset to the default Bootstrap style
    });
}
