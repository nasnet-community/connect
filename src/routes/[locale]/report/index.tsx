// import { component$ } from '@builder.io/qwik';
// import { routeLoader$ } from '@builder.io/qwik-city';
// import { createClient } from '@supabase/supabase-js';

// // Load credentials stats for dashboard
// export const useCredentialsStats = routeLoader$(async () => {
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

//   // Get count of available credentials
//   const { count: availableCount } = await supabase
//     .from('l2tp_credentials')
//     .select('*', { count: 'exact', head: true })
//     .eq('is_assigned', false);

//   // Get count by platform
//   const { data: platformData } = await supabase
//     .from('l2tp_credentials')
//     .select('platform, count')
//     .eq('is_assigned', true)
//     .group('platform');

//   const platformStats = platformData || [];

//   // Get recent assignments (last 10)
//   const { data: recentAssignments } = await supabase
//     .from('l2tp_credentials')
//     .select('*')
//     .eq('is_assigned', true)
//     .order('created_at', { ascending: false })
//     .limit(10);

//   return {
//     totalCount: totalCount || 0,
//     assignedCount: assignedCount || 0,
//     availableCount: availableCount || 0,
//     platformStats,
//     recentAssignments: recentAssignments || []
//   };
// });

// export default component$(() => {
//   const stats = useCredentialsStats();

//   return (
//     <div class="container mx-auto px-4 py-8">
//       <h1 class="text-3xl font-bold mb-8">VPN Credentials Dashboard</h1>

//       {/* Stats Overview Cards */}
//       <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Total Credentials</h2>
//           <p class="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.value.totalCount}</p>
//         </div>

//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Assigned Credentials</h2>
//           <p class="text-4xl font-bold text-green-600 dark:text-green-400">{stats.value.assignedCount}</p>
//         </div>

//         <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 class="text-xl font-semibold mb-2">Available Credentials</h2>
//           <p class="text-4xl font-bold text-purple-600 dark:text-purple-400">{stats.value.availableCount}</p>
//         </div>
//       </div>

//       {/* Usage by Platform Section */}
//       <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
//         <h2 class="text-xl font-semibold mb-4">Usage by Platform</h2>
//         <div class="overflow-x-auto">
//           <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead>
//               <tr>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Platform</th>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Count</th>
//               </tr>
//             </thead>
//             <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
//               {stats.value.platformStats.map((platform) => (
//                 <tr key={platform.platform || 'unknown'}>
//                   <td class="px-6 py-4 whitespace-nowrap">{platform.platform || 'Unknown'}</td>
//                   <td class="px-6 py-4 whitespace-nowrap">{platform.count}</td>
//                 </tr>
//               ))}
//               {stats.value.platformStats.length === 0 && (
//                 <tr>
//                   <td colspan="2" class="px-6 py-4 whitespace-nowrap text-center">No data available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Recent Assignments */}
//       <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <h2 class="text-xl font-semibold mb-4">Recent Credential Assignments</h2>
//         <div class="overflow-x-auto">
//           <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead>
//               <tr>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Server</th>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Platform</th>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
//                 <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expiry Date</th>
//               </tr>
//             </thead>
//             <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
//               {stats.value.recentAssignments.map((cred) => (
//                 <tr key={cred.id}>
//                   <td class="px-6 py-4 whitespace-nowrap">{cred.username}</td>
//                   <td class="px-6 py-4 whitespace-nowrap">{cred.server}</td>
//                   <td class="px-6 py-4 whitespace-nowrap">{cred.platform || 'Unknown'}</td>
//                   <td class="px-6 py-4 whitespace-nowrap">{new Date(cred.created_at).toLocaleString()}</td>
//                   <td class="px-6 py-4 whitespace-nowrap">{cred.expiry_date ? new Date(cred.expiry_date).toLocaleString() : 'N/A'}</td>
//                 </tr>
//               ))}
//               {stats.value.recentAssignments.length === 0 && (
//                 <tr>
//                   <td colspan="5" class="px-6 py-4 whitespace-nowrap text-center">No recent assignments</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// });
