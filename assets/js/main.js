/**
 * EXAMEN - Main JavaScript
 * Handles UI interactions and functionality
 */

// Tailwind configuration
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    border: "hsl(var(--border))",
                    input: "hsl(var(--input))",
                    ring: "hsl(var(--ring))",
                    background: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
                    primary: {
                        DEFAULT: "hsl(var(--primary))",
                        foreground: "hsl(var(--primary-foreground))",
                    },
                    secondary: {
                        DEFAULT: "hsl(var(--secondary))",
                        foreground: "hsl(var(--secondary-foreground))",
                    },
                    destructive: {
                        DEFAULT: "hsl(var(--destructive))",
                        foreground: "hsl(var(--destructive-foreground))",
                    },
                    muted: {
                        DEFAULT: "hsl(var(--muted))",
                        foreground: "hsl(var(--muted-foreground))",
                    },
                    accent: {
                        DEFAULT: "hsl(var(--accent))",
                        foreground: "hsl(var(--accent-foreground))",
                    },
                    popover: {
                        DEFAULT: "hsl(var(--popover))",
                        foreground: "hsl(var(--popover-foreground))",
                    },
                    card: {
                        DEFAULT: "hsl(var(--card))",
                        foreground: "hsl(var(--card-foreground))",
                    },
                },
                borderRadius: {
                    lg: "var(--radius)",
                    md: "calc(var(--radius) - 2px)",
                    sm: "calc(var(--radius) - 4px)",
                },
            },
        },
    }
}

// Handle JS detection
(function() {
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
})();

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

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initial setup - disable scrolling
    document.body.classList.add('loading');

    // Trigger all animations
    const header = document.querySelector('.header');
    setTimeout(() => {
        header.classList.add('loaded');
        
        // Content sections
        document.querySelector('.content').style.opacity = '1';
        
        // Buttons
        setTimeout(() => {
            document.querySelectorAll('.button-group').forEach(el => {
                el.style.opacity = '1';
            });
        }, 300);
        
        // Image grid
        setTimeout(() => {
            document.querySelectorAll('.image-card').forEach(el => {
                el.style.opacity = '1';
            });
        }, 500);
    }, 100);
    
    // Add any additional initialization code here
    const headerText = document.querySelector('.header-text');
    setTimeout(() => {
        headerText.classList.add('visible');
    }, 1000); // Delay to ensure shader is loaded
    
    // Start animation immediately but slower (500ms instead of 1000ms)
    headerText.style.transform = 'scale(0.95)';
    headerText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    
    setTimeout(() => {
        headerText.style.transform = 'scale(1)';
    }, 100);
    
    // After all animations complete (2.5s total)
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 2500);
    
    console.log('EXAMEN initialized');
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
