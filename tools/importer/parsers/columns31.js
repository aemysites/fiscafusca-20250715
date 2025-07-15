/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // Defensive: Expecting two columns
  let imgCol = null;
  let contentCol = null;
  // Identify imgCol and contentCol
  gridChildren.forEach((child) => {
    if (!imgCol && child.tagName === 'IMG') {
      imgCol = child;
    } else if (!contentCol) {
      contentCol = child;
    }
  });
  // If column is wrapped (e.g. image is not direct child)
  if (!imgCol) {
    // Defensive fallback
    const img = grid.querySelector('img');
    if (img && img.closest('.grid-layout') === grid) {
      imgCol = img;
    }
  }
  // Header row exactly as in example
  const headerRow = ['Columns (columns31)'];
  // Second row with exactly two columns: image, content
  const secondRow = [imgCol, contentCol];
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
