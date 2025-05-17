import { $ } from "@builder.io/qwik";
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
  HiWifiOutline
} from "@qwikest/icons/heroicons";

// Create serialized versions of icons for use in VPN server components
export const ServerIcon = $(HiServerOutline);
export const LockIcon = $(HiLockClosedOutline);
export const DocumentIcon = $(HiDocumentOutline);
export const PlusIcon = $(HiPlusCircleOutline);
export const UsersIcon = $(HiUserGroupOutline);
export const TrashIcon = $(HiTrashOutline);
export const CloneIcon = $(HiDocumentDuplicateOutline);
export const CheckCircleIcon = $(HiCheckCircleOutline);
export const XCircleIcon = $(HiXCircleOutline);
export const InfoIcon = $(HiInformationCircleOutline);

// VPN Protocol specific icons
export const WireguardIcon = $(HiShieldCheckOutline);
export const OpenVPNIcon = $(HiGlobeAltOutline);
export const PPTPIcon = $(HiLockOpenOutline);
export const L2TPIcon = $(HiKeyOutline);
export const SSTPIcon = $(HiCubeOutline);
export const IKEv2Icon = $(HiWifiOutline);