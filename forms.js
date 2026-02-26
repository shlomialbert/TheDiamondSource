const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxo6RxNjJVQzc7zuK1H-33h3yOzayGf-18xTBHjcblrYbimGVRBRk-wmLPKSF9NXaSs/exec";

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("Thank you! We received your inquiry.");
      form.reset();
    } else {
      alert("Error submitting form.");
      console.error(result);
    }

  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again.");
  }
}

// Attach to BOTH forms if they exist
document.addEventListener("DOMContentLoaded", function () {
  const inquiryForm = document.getElementById("inquiryForm");
  const contactForm = document.getElementById("contactForm");

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", handleFormSubmit);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
});