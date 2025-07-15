/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards20) block: 2 columns (image, text), header row is 1 column (block name)
  const headerRow = ['Cards (cards20)'];

  // Find the card body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory)
  const image = cardBody.querySelector('img');

  // Find the heading (optional, but present)
  const heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');

  // Find any descriptive text not part of heading or image
  let description = '';
  Array.from(cardBody.childNodes).forEach(node => {
    // Only text nodes that are not all whitespace and not inside the heading
    if (
      node.nodeType === Node.TEXT_NODE && node.textContent.trim() &&
      (!heading || !heading.contains?.(node))
    ) {
      description += node.textContent.trim() + ' ';
    }
    // Or block-level elements except heading & image
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node !== heading && node !== image && !node.matches('img, .h4-heading, h1, h2, h3, h4, h5, h6')
    ) {
      description += node.textContent.trim() + ' ';
    }
  });
  description = description.trim();

  // Compose the text cell: heading, then (if present) description
  const textContent = [];
  if (heading) textContent.push(heading);
  if (description) {
    const descEl = document.createElement('div');
    descEl.textContent = description;
    textContent.push(descEl);
  }

  // Build the table: header is a single cell row, body is two cells per row
  const rows = [headerRow, [image, textContent]];

  // Create table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
