/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the direct children of the grid container as columns
  const columns = Array.from(grid.children);
  // Header row: single cell as per block requirements
  const headerRow = ['Columns (columns9)'];
  // Content row: each column as a cell
  const contentRow = columns.map(col => col);
  // Assemble table structure
  const tableCells = [headerRow, contentRow];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element
  element.replaceWith(table);
}
