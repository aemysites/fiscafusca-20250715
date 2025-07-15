/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Columns (columns35)'];

  // Find the main container and top-level grid
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const topGrid = container.querySelector(':scope > .grid-layout');
  if (!topGrid) return;
  const gridChildren = Array.from(topGrid.children);
  if (gridChildren.length < 2) return;

  // Left column: text, subheading, buttons
  const leftCol = gridChildren[0];
  // Collect all meaningful nodes as-is for semantic preservation
  const leftContent = Array.from(leftCol.childNodes)
    .filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') return true;
      return false;
    });

  // Right column: multiple images (possibly in a grid)
  const rightCol = gridChildren[1];
  // Find the grid that contains all images
  let imagesGrid = rightCol.querySelector(':scope > .grid-layout');
  let rightContent;
  if (imagesGrid) {
    // Use all img elements as-is, in sequence
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    rightContent = imgs;
  } else {
    // Fallback: use all children (should never happen with example HTML)
    rightContent = Array.from(rightCol.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') return true;
      return false;
    });
  }

  // Construct the block table according to columns block spec
  const cells = [
    headerRow,
    [leftContent, rightContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
