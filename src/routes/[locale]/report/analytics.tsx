// import { component$ } from '@builder.io/qwik';
// import { routeLoader$ } from '@builder.io/qwik-city';
// import { createClient } from '@supabase/supabase-js';

// // Load analytics data
// export const useAnalyticsData = routeLoader$(async () => {
//   // Create Supabase client
//   const supabaseUrl = process.env.SUPABASE_URL || '';
//   const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
//   const supabase = createClient(supabaseUrl, supabaseKey);
  
//   // Get total count
//   const { count: totalCount } = await supabase
//     .from('l2tp_credentials')
//     .select('*', { count: 'exact', head: true });
  
//   // Get count of assigned credentials
//   const { count: assignedCount } = await supabase
//     .from('l2tp_credentials')
//     .select('*', { count: 'exact', head: true })
//     .eq('is_assigned', true);
  
//   // Get the usage percentage
//   const usagePercentage = totalCount ? Math.round((assignedCount || 0 / totalCount) * 100) : 0;
  
//   // Process platform distribution manually since group() might not be available in this context
//   const { data: platformDistributionRaw } = await supabase
//     .from('l2tp_credentials')
//     .select('platform')
//     .eq('is_assigned', true)
//     .not('platform', 'is', null);
  
//   // Process platform distribution
//   const platformMap = new Map();
//   if (platformDistributionRaw) {
//     platformDistributionRaw.forEach((item: any) => {
//       const platform = item.platform || 'unknown';
//       platformMap.set(platform, (platformMap.get(platform) || 0) + 1);
//     });
//   }
  
//   const platformData = Array.from(platformMap).map(([platform, count]) => ({
//     platform,
//     count
//   }));
  
//   // Get referrer distribution similarly
//   const { data: referrerDistributionRaw } = await supabase
//     .from('l2tp_credentials')
//     .select('referrer')
//     .eq('is_assigned', true)
//     .not('referrer', 'is', null);
  
//   // Process referrer distribution
//   const referrerMap = new Map();
//   if (referrerDistributionRaw) {
//     referrerDistributionRaw.forEach((item: any) => {
//       const referrer = item.referrer || 'unknown';
//       referrerMap.set(referrer, (referrerMap.get(referrer) || 0) + 1);
//     });
//   }
  
//   const referrerData = Array.from(referrerMap).map(([referrer, count]) => ({
//     referrer,
//     count
//   }));
  
//   // Get assignment trend (last 7 days)
//   const last7Days = new Date();
//   last7Days.setDate(last7Days.getDate() - 7);
  
//   const { data: dailyTrend } = await supabase
//     .from('l2tp_credentials')
//     .select('created_at')
//     .eq('is_assigned', true)
//     .gte('created_at', last7Days.toISOString());
  
//   // Process daily trend data
//   const trendMap = new Map();
//   const today = new Date();
  
//   for (let i = 0; i < 7; i++) {
//     const date = new Date();
//     date.setDate(today.getDate() - i);
//     const dateStr = date.toISOString().split('T')[0];
//     trendMap.set(dateStr, 0);
//   }
  
//   if (dailyTrend) {
//     dailyTrend.forEach((item: any) => {
//       const dateStr = new Date(item.created_at).toISOString().split('T')[0];
//       if (trendMap.has(dateStr)) {
//         trendMap.set(dateStr, trendMap.get(dateStr) + 1);
//       }
//     });
//   }
  
//   const dailyTrendData = Array.from(trendMap)
//     .map(([date, count]) => ({ date, count }))
//     .sort((a, b) => a.date.localeCompare(b.date));
  
//   // Get expiring soon count (next 30 days)
//   const next30Days = new Date();
//   next30Days.setDate(next30Days.getDate() + 30);
  
//   const { count: expiringSoonCount } = await supabase
//     .from('l2tp_credentials')
//     .select('*', { count: 'exact', head: true })
//     .lt('expiry_date', next30Days.toISOString())
//     .gt('expiry_date', new Date().toISOString());
  
//   return {
//     totalCount: totalCount || 0,
//     assignedCount: assignedCount || 0,
//     availableCount: (totalCount || 0) - (assignedCount || 0),
//     usagePercentage,
//     platformDistribution: platformData || [],
//     referrerDistribution: referrerData || [],
//     dailyTrend: dailyTrendData,
//     expiringSoonCount: expiringSoonCount || 0,
//   };
// });

// export default component$(() => {
//   const analyticsData = useAnalyticsData();
  
//   // Helper function to get platform distribution colors
//   const getPlatformColor = (platform: string) => {
//     const colorMap: Record<string, string> = {
//       android: '#3DDC84',
//       ios: '#007AFF',
//       windows: '#0078D7',
//       macos: '#000000',
//       linux: '#FCC624',
//     };
    
//     return colorMap[platform?.toLowerCase()] || '#6D28D9';
//   };
  
//   // Format date for display
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };
  
//   return (
//     <div class="container mx-auto px-4 py-8">
//       <div class="flex justify-between items-center mb-8">
//         <h1 class="text-3xl font-bold">VPN Analytics Dashboard</h1>
        
//         <div class="space-x-3">
//           <a 
//             href="/api/rest/credentials-report?action=export&format=csv&filter=all" 
//             target="_blank" 
//             class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
//           >
//             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
//             </svg>
//             Export All (CSV)
//           </a>
          
//           <a 
//             href="/api/rest/credentials-report?action=export&format=csv&filter=assigned" 
//             target="_blank" 
//             class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
//           >
//             <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
//             </svg>
//             Export Assigned (CSV)
//           </a>
//         </div>
//       </div>
      
//       {/* Key Metrics */}
//       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Total Credentials</h2>
//           <p class="text-4xl font-bold text-blue-600 dark:text-blue-400">{analyticsData.value.totalCount}</p>
//         </div>
        
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Assigned Credentials</h2>
//           <p class="text-4xl font-bold text-green-600 dark:text-green-400">{analyticsData.value.assignedCount}</p>
//         </div>
        
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Available Credentials</h2>
//           <p class="text-4xl font-bold text-purple-600 dark:text-purple-400">{analyticsData.value.availableCount}</p>
//         </div>
        
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Expiring Soon</h2>
//           <p class="text-4xl font-bold text-red-600 dark:text-red-400">{analyticsData.value.expiringSoonCount}</p>
//         </div>
//       </div>
      
//       {/* Usage Percentage */}
//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-4">Usage Percentage</h2>
//           <div class="relative pt-1">
//             <div class="flex mb-2 items-center justify-between">
//               <div>
//                 <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-200 dark:bg-blue-800">
//                   Assigned
//                 </span>
//               </div>
//               <div class="text-right">
//                 <span class="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
//                   {analyticsData.value.usagePercentage}%
//                 </span>
//               </div>
//             </div>
//             <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
//               <div 
//                 style={{ width: `${analyticsData.value.usagePercentage}%` }} 
//                 class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
//               ></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Daily Trend */}
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-4">Last 7 Days Trend</h2>
//           <div class="h-64 flex items-end space-x-2">
//             {analyticsData.value.dailyTrend.map((day) => {
//               const maxCount = Math.max(...analyticsData.value.dailyTrend.map(d => d.count));
//               const percentage = maxCount ? (day.count / maxCount) * 100 : 0;
              
//               return (
//                 <div key={day.date} class="flex flex-col items-center flex-1">
//                   <div 
//                     class="w-full bg-indigo-500 dark:bg-indigo-600 rounded-t"
//                     style={{ height: `${percentage}%`, minHeight: '4px' }}
//                   ></div>
//                   <div class="text-xs mt-2 transform -rotate-45 origin-top-left overflow-hidden whitespace-nowrap w-8">
//                     {formatDate(day.date)}
//                   </div>
//                   <div class="text-xs font-medium mt-1">{day.count}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
      
//       {/* Platform and Referrer Distribution */}
//       <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-4">Platform Distribution</h2>
//           {analyticsData.value.platformDistribution.length === 0 ? (
//             <p class="text-gray-500 dark:text-gray-400 italic">No platform data available</p>
//           ) : (
//             <div class="space-y-4">
//               {analyticsData.value.platformDistribution.map((platform: any) => {
//                 const totalAssigned = analyticsData.value.assignedCount;
//                 const percentage = totalAssigned ? Math.round((platform.count / totalAssigned) * 100) : 0;
                
//                 return (
//                   <div key={platform.platform} class="space-y-2">
//                     <div class="flex justify-between">
//                       <span class="font-medium">{platform.platform || 'Unknown'}</span>
//                       <span>{platform.count} ({percentage}%)</span>
//                     </div>
//                     <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
//                       <div 
//                         style={{ 
//                           width: `${percentage}%`,
//                           backgroundColor: getPlatformColor(platform.platform)
//                         }} 
//                         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
//                       ></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
        
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-4">Referrer Distribution</h2>
//           {analyticsData.value.referrerDistribution.length === 0 ? (
//             <p class="text-gray-500 dark:text-gray-400 italic">No referrer data available</p>
//           ) : (
//             <div class="space-y-4">
//               {analyticsData.value.referrerDistribution.map((referrer: any) => {
//                 const totalAssigned = analyticsData.value.assignedCount;
//                 const percentage = totalAssigned ? Math.round((referrer.count / totalAssigned) * 100) : 0;
                
//                 return (
//                   <div key={referrer.referrer} class="space-y-2">
//                     <div class="flex justify-between">
//                       <span class="font-medium">{referrer.referrer || 'Unknown'}</span>
//                       <span>{referrer.count} ({percentage}%)</span>
//                     </div>
//                     <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
//                       <div 
//                         style={{ width: `${percentage}%` }} 
//                         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
//                       ></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }); 