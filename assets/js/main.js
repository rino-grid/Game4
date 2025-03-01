/**
 * EXAMEN - Main JavaScript
 * Handles UI interactions and game functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Button event listeners
    const steamButton = document.querySelector('.btn-primary');
    const gridbasedGamesButton = document.querySelector('.btn-secondary');
    const discordButton = document.querySelector('.btn-ghost');
    const exitButton = document.querySelector('.btn-destructive');
    
    if (steamButton) {
        steamButton.addEventListener('click', () => {
            console.log('Opening Steam...');
            window.open('https://store.steampowered.com/', '_blank');
        });
    }
    
    if (gridbasedGamesButton) {
        gridbasedGamesButton.addEventListener('click', () => {
            console.log('Opening Gridbased Games...');
            window.open('https://gridbased.netlify.app/', '_blank');
        });
    }
    
    if (discordButton) {
        discordButton.addEventListener('click', () => {
            console.log('Opening Discord...');
            window.open('https://discord.com/', '_blank');
        });
    }
    
    if (exitButton) {
        exitButton.addEventListener('click', () => {
            console.log('Exiting...');
            // Add exit functionality here
            if (confirm('Are you sure you want to exit?')) {
                console.log('Exit confirmed');
                // Add actual exit logic here
            }
        });
    }
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item) => {
        const trigger = item.querySelector('.accordion-trigger');
        const content = item.querySelector('.accordion-content');
        
        // Set initial state
        item.setAttribute('data-state', 'closed');
        content.style.height = '0';
        
        trigger.addEventListener('click', () => {
            // Toggle the state
            const isOpen = item.getAttribute('data-state') === 'open';
            
            // Close all accordions first
            accordionItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.setAttribute('data-state', 'closed');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherContent.style.height = '0';
                }
            });
            
            // Toggle the clicked accordion
            if (isOpen) {
                item.setAttribute('data-state', 'closed');
                content.style.height = '0';
            } else {
                item.setAttribute('data-state', 'open');
                content.style.height = content.scrollHeight + 'px';
            }
        });
    });
    
    // Add any additional initialization code here
    console.log('EXAMEN game initialized');
});
