document.getElementById('year').textContent = new Date().getFullYear();
const forms = document.querySelectorAll('form[data-netlify="true"]');
forms.forEach((form) => {
    const statusEl = form.querySelector('.form-status');
    form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const sendingMessage = form.dataset.sendingMessage || 'Sending...';
    const successMessage = form.dataset.successMessage || 'Thanks for your submission!';
    const errorMessage = form.dataset.errorMessage || 'Submission failed. Please try again.';

    if (statusEl) {
        statusEl.textContent = sendingMessage;
        statusEl.classList.remove('success', 'error');
    }

    const submissionField = form.querySelector('input[name="submission-time"]');
    if (submissionField) {
        submissionField.value = new Date().toISOString();
    }

    const formData = new FormData(form);
    const endpoint = form.getAttribute('action') || window.location.pathname;

    try {
        const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        form.reset();
        if (statusEl) {
        statusEl.textContent = successMessage;
        statusEl.classList.add('success');
        }
    } catch (error) {
        console.error(error);
        if (statusEl) {
        statusEl.textContent = errorMessage;
        statusEl.classList.add('error');
        }
    }
    });
});