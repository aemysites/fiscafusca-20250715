/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid/block
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get each direct column block (should be a div)
  const columnDivs = Array.from(grid.children);

  // For each column, grab ALL content inside the column block (not just image)
  // In this specific HTML, each column contains an image inside a nested div.
  // To be resilient: look for all direct children of the main column div
  const columnsContent = columnDivs.map(col => {
    // If there's only a single child (e.g., a div with an img), just use that child
    if (col.children.length === 1) {
      const child = col.children[0];
      // If that child has children, we want all of them
      if (child && child.children.length > 0) {
        return Array.from(child.children);
      }
      // If that child is an img or has no further children
      return [child];
    }
    // Otherwise, put all children of the column div into the cell
    return Array.from(col.children);
  });

  // Header row: single column
  const headerRow = ['Columns (columns30)'];
  // Content row: each column's content in a cell
  const contentRow = columnsContent;

  // Compose cells
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the section with the new table
  element.replaceWith(block);
}
