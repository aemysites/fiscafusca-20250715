/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main container inside the section
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // 2. Find the grid layout for the columns
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // 3. Extract top-level column elements
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // 4. For each column, collect its non-empty child nodes (preserving structure)
  const cells = columns.map((col) => {
    // Filter out empty text nodes
    const colChildren = Array.from(col.childNodes).filter(
      n => !(n.nodeType === 3 && !n.textContent.trim())
    );
    // If only one meaningful child, use it directly; else use array
    if (colChildren.length === 1) {
      return colChildren[0];
    }
    return colChildren.length ? colChildren : '';
  });

  // 5. Construct the table: header and content row
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns5)'],
    cells,
  ], document);

  // 6. Replace the original section with the constructed block table
  element.replaceWith(table);
}
