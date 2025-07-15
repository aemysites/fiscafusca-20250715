/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns in the block)
  const columns = Array.from(grid.children);

  // Compose the header row with a single cell, as required
  const headerRow = ['Columns (columns34)'];

  // Compose the columns row: one cell per column element
  // This ensures all text and structure from the source is preserved
  const columnsRow = columns.map((col) => col);

  // Only create the table if there is at least one column
  if (columnsRow.length === 0) return;

  const cells = [
    headerRow, // single cell header row
    columnsRow // columns row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
