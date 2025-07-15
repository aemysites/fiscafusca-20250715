/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  // Each card is a direct child <a> of the grid container
  const cardElements = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cardElements.map(card => {
    // 1st column: The image (existing <img> element)
    let img = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // 2nd column: Text content
    const content = card.querySelector('.utility-padding-all-1rem');
    let textCell = [];
    if (content) {
      // Tag(s), if present
      const tagGroup = content.querySelector('.tag-group');
      if (tagGroup) {
        const tags = Array.from(tagGroup.querySelectorAll('.tag'));
        tags.forEach(tag => textCell.push(tag));
      }
      // Title (h3)
      const title = content.querySelector('h3, .h4-heading');
      if (title) {
        textCell.push(title);
      }
      // Description (p)
      const desc = content.querySelector('p');
      if (desc) {
        textCell.push(desc);
      }
    }
    // If textCell only has one element, use directly, else as array.
    return [img, textCell.length === 1 ? textCell[0] : textCell];
  });
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
