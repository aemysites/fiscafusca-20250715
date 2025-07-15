/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as in the instructions
  const headerRow = ['Hero (hero6)'];

  // Find the first image from the immediate child divs
  let backgroundImg = null;
  const childDivs = element.querySelectorAll(':scope > div');
  for (const div of childDivs) {
    const img = div.querySelector('img');
    if (img && !backgroundImg) {
      backgroundImg = img;
      break;
    }
  }
  // If for some reason no image is found, we still need a blank cell
  const imageCell = backgroundImg ? backgroundImg : '';

  // Content row: nothing in given HTML represents headline/subheadline/cta, so blank.
  const contentCell = '';

  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
