import { $ } from "@builder.io/qwik";
import {
  // Interface & User Icons
  HiUserOutline,
  HiUserSolid,
  HiUserGroupOutline,
  HiUserGroupSolid,
  HiCogOutline,
  HiCogSolid,
  HiAdjustmentsHorizontalOutline,
  HiAdjustmentsHorizontalSolid,
  HiBellOutline,
  HiBellSolid,

  // Navigation Icons
  HiHomeOutline,
  HiHomeSolid,
  HiArrowRightOutline,
  HiArrowLeftOutline,
  HiArrowUpOutline,
  HiArrowDownOutline,
  HiChevronRightOutline,
  HiChevronLeftOutline,
  HiChevronUpOutline,
  HiChevronDownOutline,

  // Action Icons
  HiPlusOutline,
  HiPlusSolid,
  HiMinusOutline,
  HiMinusSolid,
  HiXMarkOutline,
  HiXMarkSolid,
  HiCheckOutline,
  HiCheckSolid,
  HiTrashOutline,
  HiTrashSolid,
  HiPencilOutline,
  HiPencilSolid,

  // Status Icons
  HiCheckCircleOutline,
  HiCheckCircleSolid,
  HiExclamationCircleOutline,
  HiExclamationCircleSolid,
  HiXCircleOutline,
  HiXCircleSolid,
  HiInformationCircleOutline,
  HiInformationCircleSolid,

  // Communication Icons
  HiEnvelopeOutline,
  HiEnvelopeSolid,
  HiChatBubbleLeftOutline,
  HiChatBubbleLeftSolid,
  HiPhoneOutline,
  HiPhoneSolid,

  // Data & Document Icons
  HiDocumentOutline,
  HiDocumentSolid,
  HiDocumentDuplicateOutline,
  HiDocumentDuplicateSolid,
  HiClipboardDocumentOutline,
  HiClipboardDocumentSolid,
  HiCloudOutline,
  HiCloudSolid,
  HiServerOutline,
  HiServerSolid,

  // Security Icons
  HiLockClosedOutline,
  HiLockClosedSolid,
  HiLockOpenOutline,
  HiLockOpenSolid,
  HiShieldCheckOutline,
  HiShieldCheckSolid,
  HiKeyOutline,
  HiKeySolid,

  // Miscellaneous Icons
  HiGlobeAltOutline,
  HiGlobeAltSolid,
  HiQuestionMarkCircleOutline,
  HiQuestionMarkCircleSolid,
  HiEyeOutline,
  HiEyeSolid,
  HiEyeSlashOutline,
  HiEyeSlashSolid,
  HiCalendarOutline,
  HiCalendarSolid,
  HiCubeOutline,
  HiCubeSolid,
  HiWifiOutline,
  HiWifiSolid,
  HiPlusCircleOutline,
  HiPlusCircleSolid,
  HiMinusCircleOutline,
  HiMinusCircleSolid,
  
  // Additional Icons for Examples
  HiMagnifyingGlassOutline,
  HiStarOutline,
  HiStarSolid,
  HiHeartOutline,
  HiHeartSolid,
  HiMapPinOutline,
  HiClockOutline,
  HiShareOutline,
  HiArrowDownTrayOutline,
  HiPlayOutline,
  HiPauseOutline,
  HiStopOutline,
  HiBars3Outline,
  HiSunOutline,
  HiMoonOutline,
} from "@qwikest/icons/heroicons";

// Interface & User Icons
export const UserIcon = $(HiUserOutline);
export const UserSolidIcon = $(HiUserSolid);
export const UsersIcon = $(HiUserGroupOutline);
export const UsersSolidIcon = $(HiUserGroupSolid);
export const SettingsIcon = $(HiCogOutline);
export const SettingsSolidIcon = $(HiCogSolid);
export const AdjustmentsIcon = $(HiAdjustmentsHorizontalOutline);
export const AdjustmentsSolidIcon = $(HiAdjustmentsHorizontalSolid);
export const NotificationIcon = $(HiBellOutline);
export const NotificationSolidIcon = $(HiBellSolid);

// Navigation Icons
export const HomeIcon = $(HiHomeOutline);
export const HomeSolidIcon = $(HiHomeSolid);
export const ArrowRightIcon = $(HiArrowRightOutline);
export const ArrowLeftIcon = $(HiArrowLeftOutline);
export const ArrowUpIcon = $(HiArrowUpOutline);
export const ArrowDownIcon = $(HiArrowDownOutline);
export const ChevronRightIcon = $(HiChevronRightOutline);
export const ChevronLeftIcon = $(HiChevronLeftOutline);
export const ChevronUpIcon = $(HiChevronUpOutline);
export const ChevronDownIcon = $(HiChevronDownOutline);

// Action Icons
export const PlusIcon = $(HiPlusOutline);
export const PlusSolidIcon = $(HiPlusSolid);
export const MinusIcon = $(HiMinusOutline);
export const MinusSolidIcon = $(HiMinusSolid);
export const CloseIcon = $(HiXMarkOutline);
export const CloseSolidIcon = $(HiXMarkSolid);
export const CheckIcon = $(HiCheckOutline);
export const CheckSolidIcon = $(HiCheckSolid);
export const TrashIcon = $(HiTrashOutline);
export const TrashSolidIcon = $(HiTrashSolid);
export const EditIcon = $(HiPencilOutline);
export const EditSolidIcon = $(HiPencilSolid);

// Status Icons
export const SuccessIcon = $(HiCheckCircleOutline);
export const SuccessSolidIcon = $(HiCheckCircleSolid);
export const WarningIcon = $(HiExclamationCircleOutline);
export const WarningSolidIcon = $(HiExclamationCircleSolid);
export const ErrorIcon = $(HiXCircleOutline);
export const ErrorSolidIcon = $(HiXCircleSolid);
export const InfoIcon = $(HiInformationCircleOutline);
export const InfoSolidIcon = $(HiInformationCircleSolid);

// Communication Icons
export const EmailIcon = $(HiEnvelopeOutline);
export const EmailSolidIcon = $(HiEnvelopeSolid);
export const ChatIcon = $(HiChatBubbleLeftOutline);
export const ChatSolidIcon = $(HiChatBubbleLeftSolid);
export const PhoneIcon = $(HiPhoneOutline);
export const PhoneSolidIcon = $(HiPhoneSolid);

// Data & Document Icons
export const DocumentIcon = $(HiDocumentOutline);
export const DocumentSolidIcon = $(HiDocumentSolid);
export const CloneIcon = $(HiDocumentDuplicateOutline);
export const CloneSolidIcon = $(HiDocumentDuplicateSolid);
export const ClipboardIcon = $(HiClipboardDocumentOutline);
export const ClipboardSolidIcon = $(HiClipboardDocumentSolid);
export const CloudIcon = $(HiCloudOutline);
export const CloudSolidIcon = $(HiCloudSolid);
export const ServerIcon = $(HiServerOutline);
export const ServerSolidIcon = $(HiServerSolid);

// Security Icons
export const LockIcon = $(HiLockClosedOutline);
export const LockSolidIcon = $(HiLockClosedSolid);
export const UnlockIcon = $(HiLockOpenOutline);
export const UnlockSolidIcon = $(HiLockOpenSolid);
export const ShieldIcon = $(HiShieldCheckOutline);
export const ShieldSolidIcon = $(HiShieldCheckSolid);
export const KeyIcon = $(HiKeyOutline);
export const KeySolidIcon = $(HiKeySolid);

// Miscellaneous Icons
export const GlobeIcon = $(HiGlobeAltOutline);
export const GlobeSolidIcon = $(HiGlobeAltSolid);
export const QuestionIcon = $(HiQuestionMarkCircleOutline);
export const QuestionSolidIcon = $(HiQuestionMarkCircleSolid);
export const ShowIcon = $(HiEyeOutline);
export const ShowSolidIcon = $(HiEyeSolid);
export const HideIcon = $(HiEyeSlashOutline);
export const HideSolidIcon = $(HiEyeSlashSolid);
export const CalendarIcon = $(HiCalendarOutline);
export const CalendarSolidIcon = $(HiCalendarSolid);
export const CubeIcon = $(HiCubeOutline);
export const CubeSolidIcon = $(HiCubeSolid);
export const WifiIcon = $(HiWifiOutline);
export const WifiSolidIcon = $(HiWifiSolid);
export const AddCircleIcon = $(HiPlusCircleOutline);
export const AddCircleSolidIcon = $(HiPlusCircleSolid);
export const RemoveCircleIcon = $(HiMinusCircleOutline);
export const RemoveCircleSolidIcon = $(HiMinusCircleSolid);

// Additional Icons for Examples
export const SearchIcon = $(HiMagnifyingGlassOutline);
export const StarIcon = $(HiStarOutline);
export const StarSolidIcon = $(HiStarSolid);
export const HeartIcon = $(HiHeartOutline);
export const HeartSolidIcon = $(HiHeartSolid);
export const LocationIcon = $(HiMapPinOutline);
export const ClockIcon = $(HiClockOutline);
export const ShareIcon = $(HiShareOutline);
export const DownloadIcon = $(HiArrowDownTrayOutline);
export const PlayIcon = $(HiPlayOutline);
export const PauseIcon = $(HiPauseOutline);
export const StopIcon = $(HiStopOutline);
export const MenuIcon = $(HiBars3Outline);
export const SunIcon = $(HiSunOutline);
export const MoonIcon = $(HiMoonOutline);

// Aliases for compatibility
export const CheckCircleIcon = SuccessIcon;
export const XCircleIcon = ErrorIcon;
export const ExclamationCircleIcon = WarningIcon;
export const BellIcon = NotificationIcon;
export const EyeIcon = ShowIcon;
export const EyeSlashIcon = HideIcon;
