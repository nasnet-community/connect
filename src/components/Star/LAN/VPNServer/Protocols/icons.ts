/**
 * This file exports icons for use in VPN server components
 * We're exporting the icon components directly instead of serialized QRLs
 * to avoid issues with JSX rendering
 */
import {
  HiServerOutline,
  HiLockClosedOutline,
  HiDocumentOutline,
  HiPlusCircleOutline,
  HiUserGroupOutline,
  HiTrashOutline,
  HiDocumentDuplicateOutline,
  HiCheckCircleOutline,
  HiXCircleOutline,
  HiInformationCircleOutline,
  HiGlobeAltOutline,
  HiShieldCheckOutline,
  HiLockOpenOutline,
  HiKeyOutline,
  HiCubeOutline,
  HiWifiOutline,
} from "@qwikest/icons/heroicons";

// Export icons directly - use with <ServerIcon class="h-5 w-5" /> pattern
export {
  HiServerOutline as ServerIcon,
  HiLockClosedOutline as LockIcon,
  HiDocumentOutline as DocumentIcon,
  HiPlusCircleOutline as PlusIcon,
  HiUserGroupOutline as UsersIcon,
  HiTrashOutline as TrashIcon,
  HiDocumentDuplicateOutline as CloneIcon,
  HiCheckCircleOutline as CheckCircleIcon,
  HiXCircleOutline as XCircleIcon,
  HiInformationCircleOutline as InfoIcon,

  // VPN Protocol specific icons
  HiShieldCheckOutline as WireguardIcon,
  HiGlobeAltOutline as OpenVPNIcon,
  HiLockOpenOutline as PPTPIcon,
  HiKeyOutline as L2TPIcon,
  HiCubeOutline as SSTPIcon,
  HiWifiOutline as IKEv2Icon,
};
