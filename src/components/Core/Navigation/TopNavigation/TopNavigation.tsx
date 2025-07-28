import { component$, $ } from "@builder.io/qwik";
import type { TopNavigationProps } from "./TopNavigation.types";
import { useMobileMenuState } from "./hooks/useMobileMenuState";
import { useTopNavigationContainerStyles } from "./hooks/useTopNavigationContainerStyles";
import { TopNavigationHeader } from "./TopNavigationHeader";
import { TopNavigationMobileMenu } from "./TopNavigationMobileMenu";

/**
 * TopNavigation component provides a horizontal navigation bar with support for
 * dropdown menus, mobile responsiveness, and various styling options.
 */
export const TopNavigation = component$<TopNavigationProps>((props) => {
  const {
    items,
    logo,
    logoHref,
    rightContent,
    size = "md",
    variant = "default",
    position = "static",
    mobileMenuEnabled = true,
    isMobileMenuOpen: initialMobileMenuOpen = false,
    class: className = "",
    id,
  } = props;

  // Extract onNavItemClick$ to a local variable for serialization safety
  const onNavItemClick$ = props.onNavItemClick$;
  const userOnMobileMenuToggle$ = props.onMobileMenuToggle$;

  // State management for mobile menu
  const { isMobileMenuOpen, toggleMobileMenu$ } = useMobileMenuState({
    isMobileMenuOpen: initialMobileMenuOpen,
  });

  // Create a wrapper for toggleMobileMenu$ that calls the user-provided onMobileMenuToggle$ if it exists
  const handleToggleMobileMenu$ = $(() => {
    toggleMobileMenu$();
    if (userOnMobileMenuToggle$) {
      userOnMobileMenuToggle$(isMobileMenuOpen.value);
    }
  });

  // Use the container styles hook
  const { containerClass } = useTopNavigationContainerStyles({
    position,
    variant,
    size,
    className,
  });

  // Logo presentation
  const logoContent = logoHref ? (
    <a href={logoHref} class="flex items-center">
      {logo}
    </a>
  ) : (
    logo
  );

  return (
    <nav class={containerClass.value} id={id} aria-label="Main navigation">
      <div class="container mx-auto">
        {/* Header section with logo and menu items */}
        <TopNavigationHeader
          logo={logoContent}
          items={items}
          rightContent={rightContent}
          isMobileMenuOpen={isMobileMenuOpen.value}
          size={size}
          variant={variant}
          mobileMenuEnabled={mobileMenuEnabled}
          onItemClick$={onNavItemClick$}
          toggleMobileMenu$={handleToggleMobileMenu$}
        />

        {/* Mobile menu */}
        {mobileMenuEnabled && (
          <TopNavigationMobileMenu
            items={items}
            isMobileMenuOpen={isMobileMenuOpen.value}
            rightContent={rightContent}
            onItemClick$={onNavItemClick$}
          />
        )}
      </div>
    </nav>
  );
});
