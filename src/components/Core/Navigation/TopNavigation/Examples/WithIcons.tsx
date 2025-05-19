import { component$ } from '@builder.io/qwik';
import { TopNavigation, TopNavItem } from '../../TopNavigation';
import { HomeIcon } from '~/components/Core/Iconography/Icons';
import { UserIcon } from '~/components/Core/Iconography/Icons';
import { GearIcon } from '~/components/Core/Iconography/Icons';
import { InfoIcon } from '~/components/Core/Iconography/Icons';
import { EnvelopeIcon } from '~/components/Core/Iconography/Icons';

export default component$(() => {
  return (
    <div class="p-4">
      <TopNavigation>
        <TopNavItem 
          href="#" 
          label="Home" 
          icon={<HomeIcon class="w-5 h-5" />}
          isActive={true} 
        />
        <TopNavItem 
          href="#" 
          label="Profile" 
          icon={<UserIcon class="w-5 h-5" />}
        />
        <TopNavItem 
          href="#" 
          label="Settings" 
          icon={<GearIcon class="w-5 h-5" />}
        />
        <TopNavItem 
          href="#" 
          label="About" 
          icon={<InfoIcon class="w-5 h-5" />}
        />
        <TopNavItem 
          href="#" 
          label="Contact" 
          icon={<EnvelopeIcon class="w-5 h-5" />}
        />
      </TopNavigation>
    </div>
  );
});
