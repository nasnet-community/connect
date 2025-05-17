import { component$, useSignal, $ } from '@builder.io/qwik';
import { FormErrorMessage } from '../index';
import { Button } from '../../../button';

export default component$(() => {
  const showAnimatedError = useSignal(true);
  const showStaticError = useSignal(true);
  
  const toggleAnimatedError$ = $(() => {
    showAnimatedError.value = !showAnimatedError.value;
  });
  
  const toggleStaticError$ = $(() => {
    showStaticError.value = !showStaticError.value;
  });
  
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-sm font-semibold mb-2">Animated Error Message (Default)</h3>
        <div class="mb-2">
          <Button type="button" onClick$={toggleAnimatedError$}>
            {showAnimatedError.value ? 'Hide' : 'Show'} Error
          </Button>
        </div>
        
        {showAnimatedError.value && (
          <FormErrorMessage 
            message="This error message animates when it appears and disappears"
            animate={true}
          />
        )}
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Static Error Message (No Animation)</h3>
        <div class="mb-2">
          <Button type="button" onClick$={toggleStaticError$}>
            {showStaticError.value ? 'Hide' : 'Show'} Error
          </Button>
        </div>
        
        {showStaticError.value && (
          <FormErrorMessage 
            message="This error message appears instantly without animation"
            animate={false}
          />
        )}
      </div>
    </div>
  );
});
