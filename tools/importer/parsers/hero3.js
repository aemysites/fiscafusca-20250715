/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Identify left (background image) and right (content) columns
  const cols = grid.querySelectorAll(':scope > div');
  if (cols.length < 2) return;

  // BACKGROUND IMAGE (row 2)
  // Typically an img with class 'cover-image' inside the left column
  const bgImg = cols[0].querySelector('img.cover-image');
  // If no image, leave cell blank
  const bgRow = [bgImg ? bgImg : ''];

  // CONTENT (row 3)
  // The right column contains a nested grid and then a .card
  let card = cols[1].querySelector('.card');
  if (!card) {
    // fallback: use right column content
    card = cols[1];
  }
  const contentRow = [card];

  // Compose the block table
  const rows = [
    ['Hero (hero3)'],
    bgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
