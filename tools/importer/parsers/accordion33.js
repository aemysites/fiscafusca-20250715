/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header as specified
  const headerRow = ['Accordion (accordion33)'];

  // Collect all direct accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .w-dropdown'));

  // Map each item to a [title, content] row
  const rows = accordionItems.map((item) => {
    // Title: inside .w-dropdown-toggle > .paragraph-lg (or fallback: last child)
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle.lastElementChild;
    }
    // Content: inside nav.accordion-content > .utility-padding... > .rich-text.w-richtext
    let contentEl = null;
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      const rich = nav.querySelector('.rich-text.w-richtext');
      if (rich) {
        contentEl = rich;
      } else {
        // fallback: include the entire nav if .rich-text is missing
        contentEl = nav;
      }
    }
    // Ensure both cells are present and reference existing elements
    return [titleEl, contentEl];
  });

  // Build the table: header, then one row per accordion item
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}
