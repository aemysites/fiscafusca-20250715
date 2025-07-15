/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: Must match exactly
  const headerRow = ['Cards (cards32)'];

  // Find all card anchors (each <a> is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  // For each card, extract image and text content
  const rows = Array.from(cardLinks).map((card) => {
    // Image for first column
    const img = card.querySelector('img');

    // Find the text section (the div that contains h3)
    let textSection = null;
    const divs = card.querySelectorAll('div');
    for (const div of divs) {
      if (div.querySelector('h3')) {
        textSection = div;
        break;
      }
    }
    // Fallback: if h3 not found, use the last div (most likely all text content)
    if (!textSection && divs.length > 0) {
      textSection = divs[divs.length - 1];
    }
    // Defensive: If no textSection, create placeholder
    if (!textSection) {
      textSection = document.createElement('div');
    }
    // Return one row: [imageElement, textSectionElement]
    return [img, textSection];
  });

  // Compose table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
