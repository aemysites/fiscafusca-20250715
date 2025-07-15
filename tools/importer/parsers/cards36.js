/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid directly inside the .container (skip extra wrappers)
  let mainGrid = element.querySelector('.container > .w-layout-grid.grid-layout');
  if (!mainGrid) {
    // Fallback: just look for first grid
    mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  }
  if (!mainGrid) return;

  // Cards can be direct children (large feature), or inside a nested grid
  // Find all cards at immediate level
  const cards = Array.from(mainGrid.querySelectorAll(':scope > a.utility-link-content-block'));
  // Look for a nested grid inside mainGrid (holding additional cards)
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block'));
  }
  // Maintain order: direct cards first, then nested cards (matches visual layout)
  const allCards = [...cards, ...nestedCards];

  // Build rows: [header], then each card as [img, text-block]
  const rows = [['Cards (cards36)']];

  allCards.forEach(card => {
    // IMAGE: always the first img in the card (inside a div)
    const img = card.querySelector('img');
    // TEXT: gather heading(s), paragraph(s), button (if any) IN CARD ONLY
    // Some cards wrap text in .utility-padding-all-2rem, some not
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    const textBits = [];
    // Take heading (h2, h3, h4, etc)
    const heading = textContainer.querySelector('h2, h3, h4, h5, h6');
    if (heading) textBits.push(heading);
    // Take all <p> after the heading
    textBits.push(...Array.from(textContainer.querySelectorAll('p')));
    // Optionally, button or cta div
    const cta = textContainer.querySelector('.button');
    if (cta) textBits.push(cta);
    rows.push([
      img || '',
      textBits.length ? textBits : ''
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
