/* global WebImporter */
export default function parse(element, { document }) {
  // Header as per example
  const headerRow = ['Columns (columns37)'];

  // Select direct children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect ALL its direct children (not just images)
  const contentRow = columns.map(col => {
    // If there's more than one child, include them all as an array
    const children = Array.from(col.childNodes).filter(node => {
      // Only include element nodes and text nodes with meaningful text
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim() !== '');
    });
    // If only one meaningful child, just return it, else return array
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      // fallback: return empty string for empty column
      return '';
    }
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
