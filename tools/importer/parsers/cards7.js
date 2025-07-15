/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];
  // Each card is an <a> child of the main element
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // First cell: image (img inside aspect ratio div)
    let img = null;
    const aspectDiv = card.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      img = aspectDiv.querySelector('img');
    }
    // Second cell: tag/date group, then heading
    const textContent = [];
    const tagDateGroup = card.querySelector('.flex-horizontal');
    if (tagDateGroup && tagDateGroup.childNodes.length > 0) {
      textContent.push(tagDateGroup);
    }
    const heading = card.querySelector('h3');
    if (heading) {
      textContent.push(heading);
    }
    // Only push row if at least image and heading exist
    if (img && heading) {
      rows.push([img, textContent]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
