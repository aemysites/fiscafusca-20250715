/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Hero (hero12)'];

  // Find the direct child grid columns (should be 2: image, then content)
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = '';
  let contentBlock = '';
  if (grid) {
    const columns = grid.children;
    // First column: look for background image (img tag in first col)
    if (columns.length > 0) {
      const img = columns[0].querySelector('img');
      if (img) bgImg = img;
    }
    // Second column: look for content card
    if (columns.length > 1) {
      const cardBody = columns[1].querySelector('.card-body');
      if (cardBody) contentBlock = cardBody;
    }
  }

  // Compose the table as per structure: header, bgImg, content
  const cells = [
    headerRow,
    [bgImg],
    [contentBlock],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
