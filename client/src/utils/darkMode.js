export const handleColorMode = () => {
  if (!document.body.classList.contains('darkMode')) {
    document.body.classList.add('darkMode');
  } else {
    document.body.classList.remove('darkMode');
  }
};
