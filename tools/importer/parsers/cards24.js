/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct card containers (children of grid)
  const cardElements = Array.from(element.children).filter((child) => child.querySelector('img'));

  const rows = [['Cards (cards24)']];

  cardElements.forEach(card => {
    // Find the main image
    const img = card.querySelector('img');
    // Find text content area: try the most nested utility-padding container, else any div with text, else card
    let textContainer = card.querySelector('.utility-padding-all-2rem') || card;
    // Compose text content (heading + description, as present)
    const textNodes = [];
    // Heading (preserve heading tag if present)
    const heading = textContainer.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) textNodes.push(heading);
    // Paragraphs (can be multiple, preserve p tag)
    const paragraphs = textContainer.querySelectorAll('p');
    if (paragraphs.length) {
      paragraphs.forEach(p => textNodes.push(p));
    }
    // If neither, use plain text if not empty
    if (textNodes.length === 0) {
      const text = textContainer.textContent.trim();
      if (text) textNodes.push(document.createTextNode(text));
    }
    // Add the row: [image, text content]
    rows.push([
      img,
      textNodes.length === 1 ? textNodes[0] : textNodes
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
