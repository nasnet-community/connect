import { component$, JSXChildren } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { BreadcrumbItem as BreadcrumbItemType } from './Breadcrumbs.types';

export interface BreadcrumbItemProps {
  item: BreadcrumbItemType;
  isLast: boolean;
  isEllipsis: boolean;
  separatorContent: JSXChildren;
}

export const BreadcrumbItem = component$<BreadcrumbItemProps>(({ 
  item, 
  isLast, 
  isEllipsis, 
  separatorContent 
}) => {
  return (
    <li 
      class={`flex items-center ${item.class || ''}`}
    >
      {/* Render the breadcrumb item */}
      {item.isCurrent || !item.href ? (
        <span 
          class={`${item.isCurrent ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'} ${isEllipsis ? 'px-1' : ''}`}
          aria-current={item.isCurrent ? 'page' : undefined}
        >
          {item.icon && <span class="mr-1">{item.icon}</span>}
          {item.label}
        </span>
      ) : (
        <Link 
          href={item.href}
          class={`text-primary hover:text-primary-dark hover:underline ${isEllipsis ? 'px-1' : ''}`}
          aria-current={item.isCurrent ? 'page' : undefined}
        >
          {item.icon && <span class="mr-1">{item.icon}</span>}
          {item.label}
        </Link>
      )}
      
      {/* Render the separator if not the last item */}
      {!isLast && (
        <span 
          class="mx-2 text-gray-400 dark:text-gray-500" 
          aria-hidden="true"
        >
          {separatorContent}
        </span>
      )}
    </li>
  );
}); 