import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
  Avatar,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Stat,
  StatLabel,
  StatNumber,
  StatTrend,
  StatGroup,
} from "../index";

/**
 * Showcase of responsive behavior across mobile, tablet, and desktop
 */
export const ResponsiveShowcase = component$(() => {
  const screenSize = useSignal<"mobile" | "tablet" | "desktop">("desktop");
  const actualWidth = useSignal(0);

  // Monitor actual screen width
  useVisibleTask$(({ cleanup }) => {
    const updateSize = () => {
      const width = window.innerWidth;
      actualWidth.value = width;
      
      if (width < 640) {
        screenSize.value = "mobile";
      } else if (width < 1024) {
        screenSize.value = "tablet";
      } else {
        screenSize.value = "desktop";
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    cleanup(() => window.removeEventListener("resize", updateSize));
  });

  // Sample data for table
  const tableData = [
    { id: 1, product: "iPhone 14 Pro", category: "Electronics", price: "$999", stock: 15, status: "In Stock" },
    { id: 2, product: "MacBook Air M2", category: "Computers", price: "$1,199", stock: 8, status: "Low Stock" },
    { id: 3, product: "AirPods Pro", category: "Audio", price: "$249", stock: 0, status: "Out of Stock" },
    { id: 4, product: "iPad Air", category: "Tablets", price: "$599", stock: 23, status: "In Stock" },
  ];

  const tableColumns = [
    {
      id: "product",
      header: "Product",
      field: "product",
      sortable: true,
    },
    {
      id: "category",
      header: "Category",
      field: "category",
      hideOn: { sm: true }, // Hide on mobile
    },
    {
      id: "price",
      header: "Price",
      field: "price",
      align: "right" as const,
    },
    {
      id: "stock",
      header: "Stock",
      field: "stock",
      align: "center" as const,
      hideOn: { md: true }, // Hide on tablet and below
    },
    {
      id: "status",
      header: "Status",
      field: "status",
      renderCell: (value: unknown) => {
        const strValue = String(value);
        const color = strValue === "In Stock" ? "success" : strValue === "Low Stock" ? "warning" : "error";
        return <Badge color={color} size="sm">{strValue}</Badge>;
      },
    },
  ];

  return (
    <div class="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header with screen info */}
      <div class="space-y-4">
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Responsive Design Showcase
        </h1>
        
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <Badge color={screenSize.value === "mobile" ? "primary" : screenSize.value === "tablet" ? "secondary" : "success"}>
              {screenSize.value} ({actualWidth.value}px)
            </Badge>
          </div>
          
          <div class="flex flex-wrap gap-2 text-xs">
            <span class="px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded">Mobile: &lt;640px</span>
            <span class="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 rounded">Tablet: 640-1024px</span>
            <span class="px-2 py-1 bg-success-100 dark:bg-success-900 rounded">Desktop: &gt;1024px</span>
          </div>
        </div>
      </div>

      {/* Responsive Grid Layout */}
      <section class="space-y-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Grid System
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="filled" class="p-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">Full Width Mobile</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              1 column on mobile, 2 on tablet, 4 on desktop
            </p>
          </Card>
          
          <Card variant="filled" class="p-4 sm:col-span-1 lg:col-span-2">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">Adaptive Spanning</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Spans 1 column on mobile/tablet, 2 on desktop
            </p>
          </Card>
          
          <Card variant="filled" class="p-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">Flexible Grid</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Automatically adjusts based on screen size
            </p>
          </Card>
        </div>
      </section>

      {/* Responsive Stats */}
      <section class="space-y-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Statistics
        </h2>
        
        <StatGroup>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat>
              <StatLabel class="text-xs md:text-sm">Users</StatLabel>
              <StatNumber value="12.5K" class="text-xl md:text-2xl lg:text-3xl" />
              <StatTrend value={15.3} />
            </Stat>
            
            <Stat>
              <StatLabel class="text-xs md:text-sm">Revenue</StatLabel>
              <StatNumber value="$125K" class="text-xl md:text-2xl lg:text-3xl" />
              <StatTrend value={-5.2} />
            </Stat>
            
            <Stat class="hidden lg:block">
              <StatLabel class="text-xs md:text-sm">Orders</StatLabel>
              <StatNumber value="1,842" class="text-xl md:text-2xl lg:text-3xl" />
              <StatTrend value={8.7} />
            </Stat>
            
            <Stat class="hidden lg:block">
              <StatLabel class="text-xs md:text-sm">Growth</StatLabel>
              <StatNumber value="23%" class="text-xl md:text-2xl lg:text-3xl" />
              <StatTrend value={12.1} />
            </Stat>
          </div>
        </StatGroup>
      </section>

      {/* Responsive Table */}
      <section class="space-y-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Table
        </h2>
        
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Columns hide progressively on smaller screens. Category hides on mobile, Stock hides on tablet.
        </p>
        
        <div class="overflow-x-auto">
          <Table
            data={tableData}
            columns={tableColumns}
            size="sm"
            hoverable
            class="min-w-full"
          />
        </div>
      </section>

      {/* Responsive Navigation Pattern */}
      <section class="space-y-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Navigation
        </h2>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Mobile: Accordion */}
          <div class="block sm:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="profile">
                <AccordionTrigger>
                  <div class="flex items-center gap-3">
                    <Avatar initials="JD" size="sm" />
                    <span>Profile Settings</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <List spacing="compact">
                    <ListItem>Personal Information</ListItem>
                    <ListItem>Security Settings</ListItem>
                    <ListItem>Preferences</ListItem>
                  </List>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="team">
                <AccordionTrigger>Team Management</AccordionTrigger>
                <AccordionContent>
                  <List spacing="compact">
                    <ListItem>Team Members</ListItem>
                    <ListItem>Permissions</ListItem>
                    <ListItem>Integrations</ListItem>
                  </List>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Tablet/Desktop: Sidebar + Content */}
          <div class="hidden sm:flex">
            <div class="w-48 lg:w-64 border-r border-gray-200 dark:border-gray-700 p-4">
              <List spacing="normal">
                <ListItem class="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <Avatar initials="JD" size="sm" />
                  <span class="hidden lg:inline">John Doe</span>
                </ListItem>
                <ListItem class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  Profile Settings
                </ListItem>
                <ListItem class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  Team Management
                </ListItem>
                <ListItem class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
                  Billing
                </ListItem>
              </List>
            </div>
            
            <div class="flex-1 p-6">
              <h3 class="text-lg font-medium mb-4">Content Area</h3>
              <p class="text-gray-600 dark:text-gray-400">
                Main content displays here with more space on larger screens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Scaling */}
      <section class="space-y-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Typography
        </h2>
        
        <Card class="p-4 md:p-6 lg:p-8 space-y-4">
          <h3 class="text-base md:text-lg lg:text-xl font-semibold">
            Heading scales with screen size
          </h3>
          
          <p class="text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400">
            Body text adjusts for optimal reading experience across devices.
            Line heights and spacing also scale proportionally.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
            <button class="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-primary-500 text-white rounded">
              Mobile First
            </button>
            <button class="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded">
              Responsive
            </button>
          </div>
        </Card>
      </section>

      {/* Responsive Features Summary */}
      <section class="space-y-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Responsive Features
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card class="p-4">
            <CardHeader>
              <h3 class="font-medium">Flexible Grids</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Grid columns adjust from 1 on mobile to 4+ on desktop
              </p>
            </CardBody>
          </Card>
          
          <Card class="p-4">
            <CardHeader>
              <h3 class="font-medium">Adaptive Components</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Tables become cards, navigation becomes accordion on mobile
              </p>
            </CardBody>
          </Card>
          
          <Card class="p-4">
            <CardHeader>
              <h3 class="font-medium">Smart Visibility</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Non-essential content hides on smaller screens
              </p>
            </CardBody>
          </Card>
          
          <Card class="p-4">
            <CardHeader>
              <h3 class="font-medium">Touch Optimized</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Larger tap targets and touch-friendly interactions on mobile
              </p>
            </CardBody>
          </Card>
          
          <Card class="p-4">
            <CardHeader>
              <h3 class="font-medium">Fluid Typography</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Text sizes scale smoothly between breakpoints
              </p>
            </CardBody>
          </Card>
          
          <Card class="p-4">
            <CardHeader>
              <h3 class="font-medium">Progressive Disclosure</h3>
            </CardHeader>
            <CardBody>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Show more information as screen space increases
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
});