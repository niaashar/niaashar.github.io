/* Lenni Art, задание 1.6: учебные формы без серверной отправки. */
(() => {
  const page = document.body;
  const modal = document.getElementById('event-pp');
  let previousFocus = null;

  const openModal = (event) => {
    if (!modal) return;
    if (event) event.preventDefault();
    previousFocus = document.activeElement;
    modal.hidden = false;
    page.classList.add('page--popup-open');
    modal.querySelector('.event-pp__close')?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    page.classList.remove('page--popup-open');
    previousFocus?.focus();
  };

  document.querySelectorAll('[data-popup-open="event-pp"]').forEach((link) => {
    link.addEventListener('click', openModal);
  });

  if (modal) {
    modal.querySelectorAll('[data-popup-close]').forEach((button) => {
      button.addEventListener('click', closeModal);
    });
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (modal.hidden) return;
      if (event.key === 'Escape') closeModal();
      if (event.key === 'Tab') {
        const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]')]
          .filter((element) => element.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    const requestForm = document.getElementById('event-request-form');
    requestForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!requestForm.reportValidity()) return;
      const status = modal.querySelector('.event-pp__status');
      status.textContent = 'Форма заполнена корректно. Это учебный проект: заявка не отправлена.';
    });
  }

  const bookingForm = document.getElementById('table-booking-form');
  bookingForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const selectedTable = bookingForm.elements.namedItem('table').value;
    bookingForm.querySelector('.booking__status').textContent =
      `Стол № ${selectedTable} выбран. Форма заполнена корректно; в учебном проекте бронирование не отправляется.`;
  });
})();
