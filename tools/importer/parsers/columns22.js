/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the section
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The structure: grid has two direct children: left = DIV, right = IMG
  let leftCol = null;
  let rightCol = null;
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftCol) leftCol = child;
    if (child.tagName === 'IMG' && !rightCol) rightCol = child;
  }

  // Fallback: if not found, gracefully skip
  if (!leftCol || !rightCol) return;

  // Create the columns table
  const headerRow = ['Columns (columns22)'];
  const dataRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(table);
}
