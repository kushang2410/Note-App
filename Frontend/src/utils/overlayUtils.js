export const showOverlay = () => {
  document.getElementById('dark-overlay').classList.add('active');
};

export const hideOverlay = () => {
  const overlay = document.getElementById('dark-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
};

