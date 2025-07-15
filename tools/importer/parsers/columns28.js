/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct child divs (these are columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (likely the inner .utility-aspect-1x1 with the image)
  const columnCells = columns.map(col => {
    // If column has just one child, use it directly (the aspect wrapper)
    return col.children.length === 1 ? col.children[0] : col;
  });
  
  // Build the table: header row is a single cell, then content row with N columns
  const rows = [
    ['Columns (columns28)'],
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
