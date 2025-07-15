/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains the two columns (text and right-side content)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCol, rightCol;
  if (mainGrid) {
    const mainGridChildren = mainGrid.querySelectorAll(':scope > div');
    leftCol = mainGridChildren[0];
    rightCol = mainGridChildren[1];
  }

  // If not found, fallback: just grab all top-level divs in .container as left/right
  if ((!leftCol || !rightCol) && element.querySelector('.container')) {
    const fallbackDivs = element.querySelector('.container').querySelectorAll(':scope > div');
    leftCol = fallbackDivs[0];
    rightCol = fallbackDivs[1];
  }

  // For the bottom images grid (two images side by side)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Reference (not clone) the left and right blocks for the first content row
  // This ensures existing elements (and not clones) are used
  const cells = [
    ['Columns (columns23)'],
    [leftCol, rightCol],
  ];
  // Add the image row only if both images are present
  if (images.length === 2) {
    cells.push([images[0], images[1]]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
