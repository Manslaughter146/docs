import DocCard from '@theme/DocCard';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import type {
  PropSidebar,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

export interface DocLinkProps {
  docId: string;
}

function findSidebarItemLink(
  sidebar: PropSidebar,
  docId: string,
): PropSidebarItemLink | undefined {
  for (const item of sidebar) {
    if (item.type === 'category') {
      const subItem = findSidebarItemLink(item.items, docId);
      if (subItem) {
        return subItem;
      }
    } else if (item.type === 'link' && item.docId === docId) {
      return item;
    }
  }
  return undefined;
}

export default function DocLinkCard(props: DocLinkProps): JSX.Element {
  const sidebar = useDocsSidebar();
  if (!sidebar) {
    throw new Error('Unexpected: cant find current sidebar in context');
  }

  const item = findSidebarItemLink(sidebar.items, props.docId);
  if (!item) {
    throw new Error(
      `Could not find link with the following doc id: ${props.docId}`,
    );
  }

  return <DocCard item={item} />;
}
