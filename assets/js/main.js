/**
 * EXAMEN - Main JavaScript
 * Handles UI interactions and functionality
 */

document.addEventListener('DOMContentLoaded', () => {
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
    console.log('EXAMEN initialized');
});
