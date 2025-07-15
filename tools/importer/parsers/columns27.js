/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid - each column
  const cols = Array.from(grid.children);
  if (cols.length < 2) return; // Expecting at least 2 columns

  // Reference the actual DOM elements for each cell
  // Left: text content, Right: image
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Block header row (must match spec exactly)
  const headerRow = ['Columns (columns27)'];

  const tableRows = [headerRow, [leftCol, rightCol]];

  // Create table with specified cells
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  
  // Replace original element with block table
  element.replaceWith(block);
}
