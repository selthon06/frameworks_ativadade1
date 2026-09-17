document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const successToast = document.getElementById('success-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Regra Regex para formato de Email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 1. Validação dos Campos de Texto Simples
    const textFields = [
      { id: 'first-name', errorId: 'first-name-error' },
      { id: 'last-name', errorId: 'last-name-error' },
      { id: 'message', errorId: 'message-error' }
    ];

    textFields.forEach(({ id, errorId }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(errorId);

      if (input) {
        if (!input.value.trim()) {
          showError(input, errorEl);
          isValid = false;
        } else {
          clearError(input, errorEl);
        }
      }
    });

    // 2. Validação do Campo de E-mail
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (emailInput) {
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, emailError);
        isValid = false;
      } else {
        clearError(emailInput, emailError);
      }
    }

    // 3. Validação das Opções de Radio (Query Type)
    const radioInputs = document.querySelectorAll('input[name="queryType"]');
    const queryError = document.getElementById('query-type-error');
    const isRadioSelected = Array.from(radioInputs).some((radio) => radio.checked);

    if (!isRadioSelected) {
      if (queryError) queryError.style.display = 'block';
      isValid = false;
    } else {
      if (queryError) queryError.style.display = 'none';
    }

    // 4. Validação da Caixinha de Consentimento (Checkbox)
    const consentInput = document.getElementById('consent');
    const consentError = document.getElementById('consent-error');
    if (consentInput) {
      if (!consentInput.checked) {
        showError(consentInput, consentError);
        isValid = false;
      } else {
        clearError(consentInput, consentError);
      }
    }

    // 5. Sucesso ao Enviar o Formulário
    if (isValid) {
      if (successToast) {
        successToast.classList.remove('hidden');
        successToast.style.display = 'block';
      }
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Funções Auxiliares para Manipulação dos Estados de Erro e Acessibilidade (A11y)
  function showError(input, errorEl) {
    if (input) {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.style.display = 'block';
    }
  }

  function clearError(input, errorEl) {
    if (input) {
      input.classList.remove('error');
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }
});