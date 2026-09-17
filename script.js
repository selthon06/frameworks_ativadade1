document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = [
    { id: 'first-name', valid: (val) => val.trim() !== '' },
    { id: 'last-name', valid: (val) => val.trim() !== '' },
    { id: 'email', valid: (val) => emailRegex.test(val.trim()) },
    { id: 'message', valid: (val) => val.trim() !== '' },
  ];

  fields.forEach(({ id, valid }) => {
    const input = document.getElementById(id);
    const errorMsg = document.getElementById(`${id}-error`);
    if (!valid(input.value)) {
      input.classList.add('error');
      errorMsg.style.display = 'block';
      input.setAttribute('aria-invalid', 'true');
      isValid = false;
    } else {
      input.classList.remove('error');
      errorMsg.style.display = 'none';
      input.removeAttribute('aria-invalid');
    }
  });

  // Validação Radio Buttons
  const queryTypes = document.querySelectorAll('input[name="queryType"]');
  const queryError = document.getElementById('query-type-error');
  const isQuerySelected = Array.from(queryTypes).some((r) => r.checked);
  queryError.style.display = isQuerySelected ? 'none' : 'block';
  if (!isQuerySelected) isValid = false;

  // Validação Checkbox
  const consent = document.getElementById('consent');
  const consentError = document.getElementById('consent-error');
  if (!consent.checked) {
    consentError.style.display = 'block';
    isValid = false;
  } else {
    consentError.style.display = 'none';
  }

  // Sucesso
  if (isValid) {
    document.getElementById('success-toast').classList.remove('hidden');
    e.target.reset();
  }
});