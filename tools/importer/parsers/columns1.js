/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main two columns in the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the image
  const col1 = gridChildren[0];
  // Second column: the text content
  const col2 = gridChildren[1];

  // Build the block table as per spec
  const headerRow = ['Columns (columns1)'];
  const row = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  element.replaceWith(table);
}
