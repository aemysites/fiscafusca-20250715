/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab labels (menu)
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = Array.from(tabMenu ? tabMenu.children : []);

  // Find tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = Array.from(tabContent ? tabContent.children : []);

  // Prepare the table: first row is ['Tabs'] (exactly one column)
  const rows = [['Tabs']];

  // Each tab: [Tab Label, Tab Content] (2 columns for each row)
  tabLinks.forEach((tabLink) => {
    // Get label
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Find matching pane by data-w-tab attribute
    const tabName = tabLink.getAttribute('data-w-tab');
    const pane = tabPanes.find((p) => p.getAttribute('data-w-tab') === tabName);
    // Defensive: if no content, fallback to empty span
    let content = pane;
    if (!content) content = document.createElement('span');
    // Add row: [Tab Label, Tab Content]
    rows.push([label, content]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
