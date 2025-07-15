/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the grid layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the immediate columns (should be two: content and image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Reference the content elements directly (do not clone)
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // Build the table structure according to the Columns (columns15) block requirements
  const cells = [
    ['Columns (columns15)'],
    [leftCol, rightCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
