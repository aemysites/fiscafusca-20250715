/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header
  const headerRow = ['Cards (cards8)'];
  // Get all immediate children (should be card wrappers)
  const cardWrappers = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardWrappers.forEach((wrapper) => {
    // Each wrapper should contain just an image for this HTML
    const img = wrapper.querySelector('img');
    // Reference the existing image directly. Text cell is empty since there is no text in the HTML.
    rows.push([img, '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
