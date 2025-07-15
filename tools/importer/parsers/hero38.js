/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero38)'];

  // Get the direct child grid divs
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');

  // 2nd row: Background image (optional)
  let imageCell = '';
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) imageCell = img;
  }

  // 3rd row: Title, subheading, CTA
  let contentCell = '';
  if (gridDivs.length > 1) {
    // This grid column contains the content grid
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      const frag = document.createDocumentFragment();
      // Heading (h1)
      const h1 = contentGrid.querySelector('h1');
      if (h1) frag.appendChild(h1);
      // Subheading, paragraph, CTA button
      // These are inside .flex-vertical
      const flex = contentGrid.querySelector('.flex-vertical');
      if (flex) {
        flex.childNodes.forEach((node) => {
          // Only append element nodes and non-empty text nodes
          if (node.nodeType === Node.ELEMENT_NODE) {
            frag.appendChild(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            // Wrap text nodes in <p>
            const p = document.createElement('p');
            p.textContent = node.textContent;
            frag.appendChild(p);
          }
        });
      }
      contentCell = frag;
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
