// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date of the document
const lastModifiedDate = document.lastModified; 

// Update the copyright year in the footer
const copyrightElement = document.querySelector('footer p:first-child span'); 
copyrightElement.textContent = currentYear;