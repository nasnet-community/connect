import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const guidelines = [
    {
      title: "Use proper state management",
      description:
        "Store and update the currentPage in your component state to maintain pagination state between renders.",
      code: `
import { component$, useSignal } from '@builder.io/qwik';
import { Pagination } from '~/components/Core/Navigation/Pagination';

export default component$(() => {
  const currentPage = useSignal(1);
  const totalPages = 10;
  
  return (
    <Pagination
      currentPage={currentPage.value}
      totalPages={totalPages}
      onPageChange$={(page) => {
        currentPage.value = page;
        // Fetch data for the new page here
      }}
    />
  );
});
      `,
      type: "do" as const,
    },
    {
      title: "Update content when page changes",
      description:
        "Always update the displayed content when the page changes to provide immediate feedback.",
      code: `
// When page changes, update the displayed items
const onPageChange$ = $((page: number) => {
  currentPage.value = page;
  const start = (page - 1) * pageSize.value;
  const end = start + pageSize.value;
  displayedItems.value = allItems.value.slice(start, end);
});
      `,
      type: "do" as const,
    },
    {
      title: "Add proper loading states",
      description:
        "Show loading indicators while fetching data for the new page to provide feedback to users.",
      code: `
const onPageChange$ = $((page: number) => {
  currentPage.value = page;
  isLoading.value = true;
  
  // Fetch data for new page
  fetchPageData(page)
    .then((data) => {
      items.value = data;
      isLoading.value = false;
    });
});
      `,
      type: "do" as const,
    },
    {
      title: "Rely only on client-side pagination for large datasets",
      description:
        "For large datasets, server-side pagination is more efficient than loading all data and paginating client-side.",
      code: `
// DON'T: Load all 10,000 items up front and paginate in the browser
const allItems = await fetchAllItems(); // 10,000 items!
const currentPageItems = allItems.slice(startIndex, endIndex);
      `,
      type: "dont" as const,
    },
    {
      title: "Forget to handle edge cases",
      description:
        "Always validate page numbers to prevent accessing invalid pages.",
      code: `
// DON'T: Allow navigation to invalid pages
<Pagination
  currentPage={currentPage.value}
  totalPages={0} // This will cause issues!
  onPageChange$={(page) => {
    currentPage.value = page;
  }}
/>
      `,
      type: "dont" as const,
    },
    {
      title: "Overuse pagination features",
      description:
        "Don't enable all pagination features at once as it can overwhelm users with too many controls.",
      code: `
// DON'T: Enable too many controls at once
<Pagination
  currentPage={currentPage.value}
  totalPages={totalPages}
  showPageNumbers={true}
  showPageInput={true}
  showPageSizeSelector={true}
  showItemCount={true}
  pageSizeOptions={[5, 10, 25, 50, 100, 200]}
/>
      `,
      type: "dont" as const,
    },
  ];

  const bestPractices = [
    {
      title: "Maintain URL state",
      description:
        "Consider reflecting the current page in the URL to allow bookmarking and sharing specific pages.",
    },
    {
      title: "Use appropriate page sizes",
      description:
        "Choose default page sizes that make sense for your content and screen space. Too few items may require excessive pagination, while too many can cause performance issues.",
    },
    {
      title: "Position consistently",
      description:
        "Place pagination controls in a consistent location, typically at the bottom of the paginated content. For long tables, consider showing pagination at both top and bottom.",
    },
    {
      title: "Provide context",
      description:
        'Show users information about their current position, such as "Showing items 1-10 of 57" to help them understand the dataset size.',
    },
  ];

  const accessibilityTips = [
    {
      title: "Use semantic markup",
      description:
        "The Pagination component uses proper semantic elements like nav and ol to ensure good accessibility.",
    },
    {
      title: "Provide ARIA labels",
      description:
        "Use the ariaLabel props to provide context for screen reader users about what content is being paginated.",
    },
    {
      title: "Ensure keyboard navigation",
      description:
        "Test that all pagination controls can be accessed and operated using only a keyboard.",
    },
    {
      title: "Announce page changes",
      description:
        "Consider using ARIA live regions to announce page changes to screen reader users.",
    },
  ];

  const performanceTips = [
    "Use server-side pagination for large datasets to minimize data transfer and improve page load times.",
    "Consider implementing virtual rendering for large tables rather than traditional pagination if users frequently need to scan through many items.",
    "Implement data caching strategies to prevent refetching previously viewed pages.",
    "Preload the next page when users are near the end of the current page to reduce perceived loading time.",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The Pagination component helps users navigate through large sets of data
        by breaking it into manageable chunks. This section provides guidelines
        and best practices for implementing pagination effectively in your
        application.
      </p>
    </UsageTemplate>
  );
});
