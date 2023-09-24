// --- dark mode js ---

// Function to set the theme based on user preference
function setTheme(isDarkMode) {
    const body = document.body;
    body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

const toggle = document.querySelector('.toggle');

// Function to handle the toggle change event
function handleToggleChange() {
    const isDarkMode = toggle.checked;
    setTheme(isDarkMode);
}

// Check if the theme preference is already set in localStorage
const selectedTheme = localStorage.getItem('theme');

// If the theme preference is not set, default to dark mode
const isDarkMode = selectedTheme === null ? true : selectedTheme === 'dark';

// Set the initial theme
setTheme(isDarkMode);
toggle.checked = isDarkMode;

toggle.addEventListener('change', handleToggleChange);

// Listen for changes in localStorage in other tabs/windows
window.addEventListener('storage', function (event) {
    if (event.key === 'theme') {
        const isDarkMode = event.newValue === 'dark';
        setTheme(isDarkMode);
        toggle.checked = isDarkMode;
    }
});

window.addEventListener('load', function () {
    const selectedTheme = localStorage.getItem('theme');
    if (selectedTheme === 'dark' && !toggle.checked) {
        // Ensure dark mode is applied on load when not using the toggle
        setTheme(true);
        toggle.checked = true;
    }
});