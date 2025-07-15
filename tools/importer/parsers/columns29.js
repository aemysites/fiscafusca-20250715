/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all top-level columns in the grid (should be at least 4: name, tags, h2, rich text)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 4) return;

  // Table header row: single column only
  const headerRow = ['Columns (columns29)'];

  // Cell 1: Name column
  const cell1 = gridChildren[0];
  // Cell 2: Tags column
  const cell2 = gridChildren[1];
  // Cell 3: Heading + intro copy
  const cell3Content = [];
  if (gridChildren[2]) cell3Content.push(gridChildren[2]);
  if (gridChildren[3]) cell3Content.push(gridChildren[3]);

  const contentRow = [cell1, cell2, cell3Content];

  // Compose table: header is a single cell, second row is three cells
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
