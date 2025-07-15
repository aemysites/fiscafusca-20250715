/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the block specification
  const headerRow = ['Columns (columns18)'];

  // Select all direct children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // If there are no columns, do nothing
  if (columns.length === 0) return;

  // Each direct child is already a column; use as-is, reference, not clone
  const columnsRow = columns;

  // Compose the table
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
