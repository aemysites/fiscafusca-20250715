/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns14)'];

  // Get the columns container (the grid-layout div)
  const grid = element.querySelector(':scope > .grid-layout');
  let columnCells = [];

  if (grid) {
    // Get all direct children (columns)
    const columns = Array.from(grid.children);
    // For each column, reference the column element directly (not its HTML string)
    columnCells = columns;
  } else {
    // Fallback: treat element's direct children as columns if grid-layout not found
    columnCells = Array.from(element.children);
  }

  // Only create a row if we have at least one column
  if (columnCells.length === 0) {
    // If there's no column content, just remove the element (do not replace)
    element.remove();
    return;
  }

  // Compose the table as per the specification (header, plus single row with N columns)
  const tableCells = [
    headerRow,
    columnCells
  ];

  // Create table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
