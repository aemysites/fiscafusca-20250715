/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly as specified
  const headerRow = ['Columns (columns11)'];

  // Get all direct children (which are the columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column may wrap an image in a div.utility-aspect-1x1
  // For robustness, include the entire wrapper div as the cell
  const contentRow = columnDivs.map(colDiv => colDiv);

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
