import { component$ } from "@builder.io/qwik";
import Stack from "../Stack";

/**
 * Example showcasing enhanced RTL support with logical properties,
 * RTL-aware dividers, and different RTL strategies
 */
export const RTLStack = component$(() => {
  return (
    <div class="space-y-8 p-4">
      {/* RTL with Logical Properties */}
      <div>
        <h3 class="text-lg font-semibold mb-4">RTL with Logical Properties</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LTR Example */}
          <div dir="ltr">
            <h4 class="text-sm font-medium mb-2">LTR Layout</h4>
            <Stack
              direction="row"
              spacing="md"
              supportRtl={true}
              rtlStrategy="logical"
              dividers={true}
              dividerColor="muted"
              class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">Start</div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">Middle</div>
              <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded">End</div>
            </Stack>
          </div>

          {/* RTL Example */}
          <div dir="rtl">
            <h4 class="text-sm font-medium mb-2">RTL Layout</h4>
            <Stack
              direction="row"
              spacing="md"
              supportRtl={true}
              rtlStrategy="logical"
              dividers={true}
              dividerColor="muted"
              class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">البداية</div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">الوسط</div>
              <div class="bg-purple-100 dark:bg-purple-900 p-3 rounded">النهاية</div>
            </Stack>
          </div>
        </div>
      </div>

      {/* RTL Navigation Menu Example */}
      <div>
        <h3 class="text-lg font-semibold mb-4">RTL Navigation Menu</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LTR Navigation */}
          <div dir="ltr">
            <h4 class="text-sm font-medium mb-2">English Navigation</h4>
            <Stack
              as="nav"
              direction="row"
              spacing="lg"
              justify="start"
              align="center"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border"
            >
              <div class="font-bold text-blue-600">Logo</div>
              <Stack direction="row" spacing="md" class="flex-1">
                <a href="#" class="hover:text-blue-600 transition-colors">Home</a>
                <a href="#" class="hover:text-blue-600 transition-colors">About</a>
                <a href="#" class="hover:text-blue-600 transition-colors">Services</a>
                <a href="#" class="hover:text-blue-600 transition-colors">Contact</a>
              </Stack>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Login
              </button>
            </Stack>
          </div>

          {/* RTL Navigation */}
          <div dir="rtl">
            <h4 class="text-sm font-medium mb-2">Arabic Navigation</h4>
            <Stack
              as="nav"
              direction="row"
              spacing="lg"
              justify="start"
              align="center"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border"
            >
              <div class="font-bold text-blue-600">الشعار</div>
              <Stack direction="row" spacing="md" class="flex-1">
                <a href="#" class="hover:text-blue-600 transition-colors">الرئيسية</a>
                <a href="#" class="hover:text-blue-600 transition-colors">عن الشركة</a>
                <a href="#" class="hover:text-blue-600 transition-colors">الخدمات</a>
                <a href="#" class="hover:text-blue-600 transition-colors">اتصل بنا</a>
              </Stack>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                تسجيل الدخول
              </button>
            </Stack>
          </div>
        </div>
      </div>

      {/* RTL with Enhanced Dividers */}
      <div>
        <h3 class="text-lg font-semibold mb-4">RTL-Aware Dividers</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LTR with dividers */}
          <div dir="ltr">
            <h4 class="text-sm font-medium mb-2">LTR Dividers</h4>
            <Stack
              direction="row"
              spacing="lg"
              dividers={true}
              dividerColor="touch"
              dividerThickness="medium"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div class="bg-red-100 dark:bg-red-900 p-3 rounded">Section 1</div>
              <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded">Section 2</div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">Section 3</div>
            </Stack>
          </div>

          {/* RTL with dividers */}
          <div dir="rtl">
            <h4 class="text-sm font-medium mb-2">RTL Dividers</h4>
            <Stack
              direction="row"
              spacing="lg"
              dividers={true}
              dividerColor="touch"
              dividerThickness="medium"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
            >
              <div class="bg-red-100 dark:bg-red-900 p-3 rounded">القسم 1</div>
              <div class="bg-yellow-100 dark:bg-yellow-900 p-3 rounded">القسم 2</div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">القسم 3</div>
            </Stack>
          </div>
        </div>
      </div>

      {/* Vertical RTL Stack */}
      <div>
        <h3 class="text-lg font-semibold mb-4">Vertical RTL Content</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LTR Vertical */}
          <div dir="ltr">
            <h4 class="text-sm font-medium mb-2">English Content</h4>
            <Stack
              direction="column"
              spacing="md"
              dividers={true}
              dividerColor="minimal"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-white dark:bg-gray-900 p-4 rounded-lg border"
            >
              <div class="text-left">
                <h5 class="font-semibold">Article Title</h5>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  This is an English article with left-aligned text.
                </p>
              </div>
              <div class="text-left">
                <h5 class="font-semibold">Another Section</h5>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Content flows naturally from left to right.
                </p>
              </div>
              <div class="text-left">
                <h5 class="font-semibold">Final Section</h5>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Consistent alignment throughout.
                </p>
              </div>
            </Stack>
          </div>

          {/* RTL Vertical */}
          <div dir="rtl">
            <h4 class="text-sm font-medium mb-2">Arabic Content</h4>
            <Stack
              direction="column"
              spacing="md"
              dividers={true}
              dividerColor="minimal"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-white dark:bg-gray-900 p-4 rounded-lg border"
            >
              <div class="text-right">
                <h5 class="font-semibold">عنوان المقال</h5>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  هذا مقال باللغة العربية مع محاذاة النص إلى اليمين.
                </p>
              </div>
              <div class="text-right">
                <h5 class="font-semibold">قسم آخر</h5>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  المحتوى يتدفق بشكل طبيعي من اليمين إلى اليسار.
                </p>
              </div>
              <div class="text-right">
                <h5 class="font-semibold">القسم الأخير</h5>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  محاذاة متسقة في جميع الأجزاء.
                </p>
              </div>
            </Stack>
          </div>
        </div>
      </div>

      {/* RTL Strategy Comparison */}
      <div>
        <h3 class="text-lg font-semibold mb-4">RTL Strategy Comparison</h3>
        <div class="space-y-4">
          <div dir="rtl">
            <h4 class="text-sm font-medium mb-2">Logical Properties (Recommended)</h4>
            <Stack
              direction="row"
              spacing="md"
              supportRtl={true}
              rtlStrategy="logical"
              class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200"
            >
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">استخدام خصائص CSS المنطقية</div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">أداء أفضل</div>
              <div class="bg-green-100 dark:bg-green-900 p-3 rounded">دعم حديث</div>
            </Stack>
          </div>

          <div dir="rtl">
            <h4 class="text-sm font-medium mb-2">Transform Strategy</h4>
            <Stack
              direction="row"
              spacing="md"
              supportRtl={true}
              rtlStrategy="transform"
              class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200"
            >
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">استخدام التحويلات</div>
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">دعم أوسع</div>
              <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">طريقة تقليدية</div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
});