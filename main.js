// main.js - Fixed TOC: mobile-friendly, closable, hidden by default on small screens

function createTOC() {
    // Only run if there are headings to show
    const headings = document.querySelectorAll('main h2, main h3, article h2, article h3');
    if (headings.length === 0) return;

    // Create TOC container if it doesn't exist
    let toc = document.getElementById('toc-sidebar');
    if (!toc) {
        toc = document.createElement('aside');
        toc.id = 'toc-sidebar';
        toc.className = 'glass';
        toc.innerHTML = `
            <div class="toc-header">
                <h3>Contents</h3>
                <button class="toc-close" aria-label="Close table of contents">✕</button>
            </div>
            <ul id="toc-list"></ul>
        `;
        // Put it inside main or body
        const main = document.querySelector('main') || document.body;
        main.prepend(toc);
    }

    const list = document.getElementById('toc-list');
    list.innerHTML = '';

    headings.forEach(h => {
        if (!h.id) {
            h.id = 'toc-' + Math.random().toString(36).substr(2, 9);
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.trim();
        a.style.color = 'var(--text)';
        a.style.textDecoration = 'none';

        // Indent h3 a bit more
        if (h.tagName === 'H3') {
            li.style.paddingLeft = '1.2rem';
        }

        li.appendChild(a);
        list.appendChild(li);
    });

    // Close button logic
    const closeBtn = toc.querySelector('.toc-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toc.style.display = 'none';
        });
    }

    // Show/hide logic based on screen size
    function toggleTOC() {
        if (window.innerWidth < 992) {           // below ~992px = tablet/mobile
            toc.style.display = 'none';
        } else {
            toc.style.display = 'block';
        }
    }

    toggleTOC(); // run once
    window.addEventListener('resize', toggleTOC);
}

// Run when page is loaded
document.addEventListener('DOMContentLoaded', createTOC);