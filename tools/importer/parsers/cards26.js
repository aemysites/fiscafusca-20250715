/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per the example
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // For each tab content (supports all tabs in markup)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach(tabPane => {
    // Find the grid in this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Find all card links (each card is an <a>)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(card => {
      // ---- First column: image, if present ----
      let imageEl = null;
      const img = card.querySelector('.utility-aspect-3x2 img');
      if (img) imageEl = img;

      // ---- Second column: text content ----
      // Card titles as heading
      let title = card.querySelector('h3, .h4-heading');
      // Card description as paragraph
      let desc = card.querySelector('.paragraph-sm');
      // Some layouts have text nested deeper
      if ((!title || !desc) && card.querySelector('.utility-text-align-center')) {
        const inner = card.querySelector('.utility-text-align-center');
        if (!title) title = inner.querySelector('h3, .h4-heading');
        if (!desc) desc = inner.querySelector('.paragraph-sm');
      }

      // Build text cell contents, referencing existing elements
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // Only push row if at least one cell has content
      if (imageEl || textCell.length) {
        rows.push([
          imageEl ? imageEl : '',
          textCell.length === 1 ? textCell[0] : textCell
        ]);
      }
    });
  });

  // Build and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
