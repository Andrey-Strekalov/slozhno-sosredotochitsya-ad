(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

function setTheme(theme) {
  // Поддерживаем два варианта: класс на :root (html) и класс на .page.
  // Тесты/макет обычно опираются на `.page.theme_dark/.page.theme_light`,
  // а скрипт-переключатель удобнее держать на html.
  const html = document.documentElement;
  const body = document.body;

  html.classList.remove('theme-dark', 'theme-light');
  body.classList.remove('theme_dark', 'theme_light');

  if (theme === 'dark') {
    html.classList.add('theme-dark');
    body.classList.add('theme_dark');
  } else if (theme === 'light') {
    html.classList.add('theme-light');
    body.classList.add('theme_light');
  }

  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.setAttribute('disabled', true);
  } else {
    const autoButton = document.querySelector(
      '.header__theme-menu-button_type_auto'
    );
    autoButton.classList.add('header__theme-menu-button_active');
    autoButton.setAttribute('disabled', true);
  }
}
