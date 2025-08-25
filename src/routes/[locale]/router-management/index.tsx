import { component$, useSignal, $, useStore, type PropFunction } from "@builder.io/qwik";
import {
  Alert,
  Spinner,
  Dialog,
  Input,
  PasswordField,
  TabNavigation
} from "~/components/Core";
import { Button } from "~/components/Core/button";
import { Card, Badge } from "~/components/Core/DataDisplay";
import { Container } from "~/components/Core/Layout";
import { Heading, Text } from "~/components/Core/Typography";
import {
  LuWifi,
  LuRouter,
  LuSearch,
  LuShield,
  LuActivity,
  LuSettings,
  LuCheck,
  LuX,
  LuKey
} from "@qwikest/icons/lucide";
import type { RouterInfo, RouterCredentials, SystemResource, SSIDConfig, VPNInterface } from "~/services/mikrotik/types";
import { scanNetwork, getSystemResources, getSSIDs, updateSSID, getVPNInterfaces, updateVPNInterface } from "~/services/mikrotik/api-client";

export default component$(() => {
  // State management
  const scanningState = useSignal<"idle" | "scanning" | "completed" | "error">("idle");
  const foundRouters = useSignal<RouterInfo[]>([]);
  const selectedRouter = useSignal<RouterInfo | null>(null);
  const connectedRouter = useStore<{
    info: RouterInfo | null;
    resources: SystemResource | null;
    ssids: SSIDConfig[];
    vpnInterfaces: VPNInterface[];
    credentials?: { username: string; password: string };
  }>({
    info: null,
    resources: null,
    ssids: [],
    vpnInterfaces: []
  });
  
  const showAuthModal = useSignal(false);
  const authCredentials = useStore<RouterCredentials>({
    username: "",
    password: ""
  });
  
  const activeTab = useSignal<"overview" | "ssid" | "vpn">("overview");
  const isConnecting = useSignal(false);
  const connectionError = useSignal("");
  const scanProgress = useSignal(0);

  // Scan network for routers
  const handleScanNetwork$ = $(async () => {
    console.log("Starting network scan...");
    scanningState.value = "scanning";
    foundRouters.value = [];
    scanProgress.value = 0;
    connectionError.value = "";
    
    try {
      // Use the scanNetwork function from api-client
      const routers = await scanNetwork((progress) => {
        scanProgress.value = progress;
      });
      
      foundRouters.value = routers;
      scanningState.value = "completed";
      
      if (routers.length === 0) {
        connectionError.value = "No routers found. Make sure your router has HTTP API enabled and CORS is configured.";
      }
    } catch (error) {
      console.error("Scan error:", error);
      scanningState.value = "error";
      connectionError.value = error instanceof Error ? error.message : 'Failed to scan network';
    }
  });

  // Connect to selected router
  const handleConnect$ = $(async () => {
    if (!selectedRouter.value || !authCredentials.username || !authCredentials.password) {
      return;
    }
    
    isConnecting.value = true;
    connectionError.value = "";
    
    try {
      // Store credentials for later use
      const { username, password } = authCredentials;
      const routerIp = selectedRouter.value.ip;
      
      // Test connection and get system resources
      const resources = await getSystemResources(routerIp, username, password);
      
      // Get SSIDs and VPN interfaces
      const [ssids, vpnInterfaces] = await Promise.all([
        getSSIDs(routerIp, username, password),
        getVPNInterfaces(routerIp, username, password)
      ]);
      
      connectedRouter.info = selectedRouter.value;
      connectedRouter.resources = resources;
      connectedRouter.ssids = ssids;
      connectedRouter.vpnInterfaces = vpnInterfaces;
      
      // Store credentials for updates (in memory only)
      connectedRouter.credentials = { username, password };
      
      showAuthModal.value = false;
      authCredentials.username = "";
      authCredentials.password = "";
    } catch (error) {
      console.error("Connection error:", error);
      connectionError.value = error instanceof Error ? error.message : "Failed to connect. Please check your credentials.";
    } finally {
      isConnecting.value = false;
    }
  });

  // Handle SSID update
  const handleSSIDUpdate$ = $(async (ssid: SSIDConfig) => {
    if (!connectedRouter.info || !connectedRouter.credentials) return;
    
    try {
      const { username, password } = connectedRouter.credentials;
      const routerIp = connectedRouter.info.ip;
      
      await updateSSID(routerIp, username, password, ssid);
      
      // Refresh SSID list
      const ssids = await getSSIDs(routerIp, username, password);
      connectedRouter.ssids = ssids;
    } catch (error) {
      console.error("SSID update error:", error);
      connectionError.value = error instanceof Error ? error.message : "Failed to update SSID configuration.";
    }
  });

  // Handle VPN update
  const handleVPNUpdate$ = $(async (vpn: VPNInterface) => {
    if (!connectedRouter.info || !connectedRouter.credentials) return;
    
    try {
      const { username, password } = connectedRouter.credentials;
      const routerIp = connectedRouter.info.ip;
      
      await updateVPNInterface(routerIp, username, password, vpn);
      
      // Refresh VPN list
      const vpnInterfaces = await getVPNInterfaces(routerIp, username, password);
      connectedRouter.vpnInterfaces = vpnInterfaces;
    } catch (error) {
      console.error("VPN update error:", error);
      connectionError.value = error instanceof Error ? error.message : "Failed to update VPN configuration.";
    }
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-yellow-500/5 dark:to-blue-500/5" />
        <div class="container mx-auto px-4 py-16 relative">
          <div class="text-center max-w-4xl mx-auto">
            <div class="inline-flex items-center justify-center mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-yellow-500/20 dark:to-blue-500/20">
              <LuRouter class="w-10 h-10 text-primary-500 dark:text-yellow-400" />
            </div>
            
            <Heading level={1} class="mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-yellow-400 dark:to-blue-400 bg-clip-text text-transparent">
              {$localize`Router Management`}
            </Heading>
            
            <Text size="lg" class="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              {$localize`Connect to your MikroTik routers and manage Wi-Fi SSIDs and VPN interfaces remotely`}
            </Text>
          </div>
        </div>
      </div>

      <Container class="pb-16 pt-8">
        {/* Error Alert */}
        {connectionError.value && (
          <Alert 
            status="error" 
            variant="solid"
            dismissible={true}
            onDismiss$={() => { connectionError.value = "" }}
            class="mb-6"
          >
            {connectionError.value}
          </Alert>
        )}

        {/* Main Content */}
        {!connectedRouter.info ? (
          <>
            {/* CORS Help Alert */}
            <Alert 
              status="info" 
              variant="subtle"
              class="mb-6"
            >
              <div class="space-y-2">
                <div class="font-semibold">Direct Router Communication Requirements</div>
                <p class="text-sm">
                  This application communicates directly with your MikroTik router. You need to:
                </p>
                <ol class="list-decimal list-inside text-sm space-y-1">
                  <li>Enable HTTP API on your router: <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">/ip service enable www</code></li>
                  <li>Configure CORS: <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">/ip service set www cors-allowed-origin="*"</code></li>
                  <li>Use router credentials (username/password) for authentication</li>
                </ol>
                <p class="text-xs opacity-80">
                  For development, you can also use a CORS browser extension.
                </p>
              </div>
            </Alert>

            {/* Scanner Section */}
            <Card class="mb-8">
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                      <LuSearch class="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <Heading level={3}>{$localize`Network Scanner`}</Heading>
                      <Text size="sm" class="text-gray-600 dark:text-slate-400">
                        {$localize`Scan your network to find available MikroTik routers`}
                      </Text>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    onClick$={handleScanNetwork$}
                    disabled={scanningState.value === "scanning"}
                  >
                    {scanningState.value === "scanning" ? (
                      <>
                        <Spinner size="sm" class="mr-2" />
                        {$localize`Scanning...`} ({scanProgress.value}%)
                      </>
                    ) : (
                      <>
                        <LuSearch class="w-5 h-5 mr-2" />
                        {$localize`Scan Network`}
                      </>
                    )}
                  </Button>
                </div>

                {/* Scan Progress */}
                {scanningState.value === "scanning" && (
                  <div class="mt-4">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        class="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress.value}%` }}
                      />
                    </div>
                    <Text size="sm" class="mt-2 text-gray-600 dark:text-slate-400">
                      {$localize`Scanning IP range: 192.168.0.1 - 192.168.255.1`}
                    </Text>
                  </div>
                )}
              </div>
            </Card>

            {/* Found Routers List */}
            {foundRouters.value.length > 0 && (
              <Card>
                <div class="p-6">
                  <Heading level={3} class="mb-4">
                    {`${$localize`Found Routers`} (${foundRouters.value.length})`}
                  </Heading>
                  
                  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {foundRouters.value.map((router) => (
                      <div
                        key={router.ip}
                        class="p-4 border rounded-lg hover:border-primary-500 cursor-pointer transition-all dark:border-slate-700 dark:hover:border-yellow-500"
                        onClick$={() => {
                          selectedRouter.value = router;
                          showAuthModal.value = true;
                        }}
                      >
                        <div class="flex items-center justify-between mb-2">
                          <LuRouter class="w-5 h-5 text-primary-500 dark:text-yellow-400" />
                          <Badge color="success" size="sm">
                            {$localize`Available`}
                          </Badge>
                        </div>
                        
                        <Text class="font-semibold">{router.ip}</Text>
                        {router.hostname && (
                          <Text size="sm" class="text-gray-600 dark:text-slate-400">
                            {router.hostname}
                          </Text>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          class="mt-3 w-full"
                        >
                          <LuKey class="w-4 h-4 mr-2" />
                          {$localize`Connect`}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </>
        ) : (
          /* Connected Router Management */
          <div class="space-y-6">
            {/* Router Info Header */}
            <Card>
              <div class="p-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg bg-success-500/10 flex items-center justify-center">
                      <LuCheck class="w-6 h-6 text-success-500" />
                    </div>
                    <div>
                      <Heading level={3}>{connectedRouter.info.ip}</Heading>
                      <div class="flex items-center gap-2 mt-1">
                        <Badge color="success" size="sm">Connected</Badge>
                        {connectedRouter.resources && (
                          <Text size="sm" class="text-gray-600 dark:text-slate-400">
                            {connectedRouter.resources.platform} • {connectedRouter.resources.version}
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick$={() => {
                      connectedRouter.info = null;
                      connectedRouter.resources = null;
                      connectedRouter.ssids = [];
                      connectedRouter.vpnInterfaces = [];
                      connectedRouter.credentials = undefined;
                      activeTab.value = "overview";
                    }}
                  >
                    <LuX class="w-4 h-4 mr-2" />
                    {$localize`Disconnect`}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tab Navigation */}
            <TabNavigation
              tabs={[
                { id: "overview", label: $localize`Overview`, icon: <LuActivity class="w-4 h-4" /> },
                { id: "ssid", label: $localize`Wi-Fi SSIDs`, icon: <LuWifi class="w-4 h-4" /> },
                { id: "vpn", label: $localize`VPN Interfaces`, icon: <LuShield class="w-4 h-4" /> }
              ]}
              activeTab={activeTab.value}
              onSelect$={(tabId: string) => { activeTab.value = tabId as "overview" | "ssid" | "vpn" }}
            />

            {/* Tab Content */}
            <Card>
              <div class="p-6">
                {activeTab.value === "overview" && connectedRouter.resources && (
                  <div class="space-y-4">
                    <Heading level={3} class="mb-4">System Resources</Heading>
                    
                    <div class="grid gap-4 md:grid-cols-2">
                      <div class="space-y-2">
                        <Text size="sm" class="text-gray-600 dark:text-slate-400">
                          {$localize`Board Name`}
                        </Text>
                        <Text class="font-medium">{connectedRouter.resources["board-name"]}</Text>
                      </div>
                      
                      <div class="space-y-2">
                        <Text size="sm" class="text-gray-600 dark:text-slate-400">
                          {$localize`CPU`}
                        </Text>
                        <Text class="font-medium">{connectedRouter.resources.cpu}</Text>
                      </div>
                      
                      <div class="space-y-2">
                        <Text size="sm" class="text-gray-600 dark:text-slate-400">
                          {$localize`CPU Load`}
                        </Text>
                        <Text class="font-medium">{connectedRouter.resources["cpu-load"]}%</Text>
                      </div>
                      
                      <div class="space-y-2">
                        <Text size="sm" class="text-gray-600 dark:text-slate-400">
                          {$localize`Memory`}
                        </Text>
                        <Text class="font-medium">
                          {Math.round((parseInt(connectedRouter.resources["free-memory"]) / parseInt(connectedRouter.resources["total-memory"])) * 100)}% Free
                        </Text>
                      </div>
                      
                      <div class="space-y-2">
                        <Text size="sm" class="text-gray-600 dark:text-slate-400">
                          {$localize`Uptime`}
                        </Text>
                        <Text class="font-medium">{connectedRouter.resources.uptime}</Text>
                      </div>
                      
                      <div class="space-y-2">
                        <Text size="sm" class="text-gray-600 dark:text-slate-400">
                          {$localize`Architecture`}
                        </Text>
                        <Text class="font-medium">{connectedRouter.resources["architecture-name"]}</Text>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.value === "ssid" && (
                  <div class="space-y-4">
                    <Heading level={3} class="mb-4">Wi-Fi SSIDs</Heading>
                    
                    {connectedRouter.ssids.length > 0 ? (
                      <div class="space-y-4">
                        {connectedRouter.ssids.map((ssid) => (
                          <SSIDEditor
                            key={ssid.id}
                            ssid={ssid}
                            onUpdate$={handleSSIDUpdate$}
                          />
                        ))}
                      </div>
                    ) : (
                      <Text class="text-gray-600 dark:text-slate-400">
                        {$localize`No Wi-Fi SSIDs found on this router.`}
                      </Text>
                    )}
                  </div>
                )}

                {activeTab.value === "vpn" && (
                  <div class="space-y-4">
                    <Heading level={3} class="mb-4">VPN Interfaces</Heading>
                    
                    {connectedRouter.vpnInterfaces.length > 0 ? (
                      <div class="space-y-4">
                        {connectedRouter.vpnInterfaces.map((vpn) => (
                          <VPNEditor
                            key={vpn.id}
                            vpn={vpn}
                            onUpdate$={handleVPNUpdate$}
                          />
                        ))}
                      </div>
                    ) : (
                      <Text class="text-gray-600 dark:text-slate-400">
                        {$localize`No VPN interfaces found on this router.`}
                      </Text>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </Container>

      {/* Authentication Modal */}
      <Dialog
        isOpen={showAuthModal.value}
        onClose$={() => { showAuthModal.value = false }}
        title={$localize`Router Authentication`}
      >
        <div class="space-y-4">
          <Text class="text-gray-600 dark:text-slate-400">
            {$localize`Enter your router credentials to connect to`} {selectedRouter.value?.ip}
          </Text>
          
          <Input
            label={$localize`Username`}
            value={authCredentials.username}
            onInput$={(e: any) => { authCredentials.username = e.target.value }}
            placeholder="admin"
          />
          
          <PasswordField
            label={$localize`Password`}
            value={authCredentials.password}
            onInput$={(e: any) => { authCredentials.password = e.target.value }}
          />
          
          <div class="flex gap-3 justify-end pt-4">
            <Button
              variant="ghost"
              onClick$={() => { showAuthModal.value = false }}
            >
              {$localize`Cancel`}
            </Button>
            
            <Button
              variant="primary"
              onClick$={handleConnect$}
              disabled={isConnecting.value || !authCredentials.username || !authCredentials.password}
            >
              {isConnecting.value ? (
                <>
                  <Spinner size="sm" class="mr-2" />
                  {$localize`Connecting...`}
                </>
              ) : (
                <>
                  <LuKey class="w-4 h-4 mr-2" />
                  {$localize`Connect`}
                </>
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
});

// SSID Editor Component
export const SSIDEditor = component$<{
  ssid: SSIDConfig;
  onUpdate$: PropFunction<(ssid: SSIDConfig) => Promise<void>>;
}>(({ ssid, onUpdate$ }) => {
  const isEditing = useSignal(false);
  const editedSSID = useStore({ ...ssid });
  const isSaving = useSignal(false);

  const handleSave$ = $(async () => {
    isSaving.value = true;
    await onUpdate$(editedSSID);
    isSaving.value = false;
    isEditing.value = false;
  });

  return (
    <div class="p-4 border rounded-lg dark:border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <LuWifi class="w-5 h-5 text-primary-500 dark:text-yellow-400" />
          <Text class="font-medium">{ssid.name}</Text>
          <Badge color={ssid.disabled ? "error" : "success"} size="sm">
            {ssid.disabled ? $localize`Disabled` : $localize`Enabled`}
          </Badge>
        </div>
        
        {!isEditing.value ? (
          <Button
            variant="ghost"
            size="sm"
            onClick$={() => { isEditing.value = true }}
          >
            <LuSettings class="w-4 h-4 mr-2" />
            {$localize`Edit`}
          </Button>
        ) : (
          <div class="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick$={() => { 
                isEditing.value = false;
                Object.assign(editedSSID, ssid);
              }}
            >
              {$localize`Cancel`}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick$={handleSave$}
              disabled={isSaving.value}
            >
              {isSaving.value ? (
                <Spinner size="xs" />
              ) : (
                $localize`Save`
              )}
            </Button>
          </div>
        )}
      </div>
      
      {isEditing.value && (
        <div class="space-y-3 mt-4">
          <Input
            label={$localize`SSID Name`}
            value={editedSSID.name}
            onInput$={(e: any) => { editedSSID.name = e.target.value }}
          />
          
          <PasswordField
            label={$localize`Password`}
            value={editedSSID.password || ""}
            onInput$={(e: any) => { editedSSID.password = e.target.value }}
            helperText={$localize`Leave empty for open network`}
          />
        </div>
      )}
    </div>
  );
});

// VPN Editor Component
export const VPNEditor = component$<{
  vpn: VPNInterface;
  onUpdate$: PropFunction<(vpn: VPNInterface) => Promise<void>>;
}>(({ vpn, onUpdate$ }) => {
  const isEditing = useSignal(false);
  const editedVPN = useStore({ ...vpn });
  const isSaving = useSignal(false);

  const handleSave$ = $(async () => {
    isSaving.value = true;
    await onUpdate$(editedVPN);
    isSaving.value = false;
    isEditing.value = false;
  });

  return (
    <div class="p-4 border rounded-lg dark:border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <LuShield class="w-5 h-5 text-primary-500 dark:text-yellow-400" />
          <Text class="font-medium">{vpn.name}</Text>
          <Badge color="info" size="sm">{vpn.type}</Badge>
          <Badge color={vpn.disabled ? "error" : "success"} size="sm">
            {vpn.disabled ? $localize`Disabled` : $localize`Enabled`}
          </Badge>
        </div>
        
        {!isEditing.value ? (
          <Button
            variant="ghost"
            size="sm"
            onClick$={() => { isEditing.value = true }}
          >
            <LuSettings class="w-4 h-4 mr-2" />
            {$localize`Edit`}
          </Button>
        ) : (
          <div class="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick$={() => { 
                isEditing.value = false;
                Object.assign(editedVPN, vpn);
              }}
            >
              {$localize`Cancel`}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick$={handleSave$}
              disabled={isSaving.value}
            >
              {isSaving.value ? (
                <Spinner size="xs" />
              ) : (
                $localize`Save`
              )}
            </Button>
          </div>
        )}
      </div>
      
      {isEditing.value && (
        <div class="space-y-3 mt-4">
          <Input
            label={$localize`Interface Name`}
            value={editedVPN.name}
            onInput$={(e: any) => { editedVPN.name = e.target.value }}
          />
          
          {vpn.type === "l2tp" && (
            <>
              <Input
                label={$localize`Server Address`}
                value={editedVPN.server || ""}
                onInput$={(e: any) => { editedVPN.server = e.target.value }}
              />
              
              <Input
                label={$localize`Username`}
                value={editedVPN.user || ""}
                onInput$={(e: any) => { editedVPN.user = e.target.value }}
              />
              
              <PasswordField
                label={$localize`Password`}
                value={editedVPN.password || ""}
                onInput$={(e: any) => { editedVPN.password = e.target.value }}
              />
            </>
          )}
          
          {vpn.type === "wireguard" && (
            <>
              <Input
                label={$localize`Listen Port`}
                value={editedVPN.listenPort || ""}
                onInput$={(e: any) => { editedVPN.listenPort = e.target.value }}
                type="number"
              />
              
              <PasswordField
                label={$localize`Private Key`}
                value={editedVPN.privateKey || ""}
                onInput$={(e: any) => { editedVPN.privateKey = e.target.value }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
});