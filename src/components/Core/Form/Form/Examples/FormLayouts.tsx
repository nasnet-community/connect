import { component$ } from '@builder.io/qwik';
import { Form } from '../index';
import { Field } from '../../Field';
import { Checkbox } from '../../Checkbox';
import { Button } from '../../../button';

export default component$(() => {
  return (
    <div class="space-y-12">
      {/* Standard Column Layout */}
      <div>
        <h3 class="font-medium mb-4">Standard Column Layout</h3>
        <Form class="max-w-md">
          <Field id="firstName" label="First Name" placeholder="Enter first name" />
          <Field id="lastName" label="Last Name" placeholder="Enter last name" />
          <Field id="email" type="email" label="Email" placeholder="Enter email address" />
          <Field id="phone" type="tel" label="Phone" placeholder="Enter phone number" />
          
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </div>
      
      {/* Two Column Layout */}
      <div>
        <h3 class="font-medium mb-4">Two Column Layout</h3>
        <Form class="max-w-2xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field id="firstName" label="First Name" placeholder="Enter first name" />
            <Field id="lastName" label="Last Name" placeholder="Enter last name" />
            <Field id="email" type="email" label="Email" placeholder="Enter email address" />
            <Field id="phone" type="tel" label="Phone" placeholder="Enter phone number" />
            <div class="md:col-span-2">
              <Field 
                name="address" 
                label="Address" 
                placeholder="Enter full address" 
                component="textarea" 
                rows={3}
              />
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <Button type="submit" variant="primary">Submit</Button>
          </div>
        </Form>
      </div>
      
      {/* Sections and Groups */}
      <div>
        <h3 class="font-medium mb-4">Sections and Groups</h3>
        <Form class="max-w-2xl">
          <div class="mb-6">
            <h4 class="text-md font-medium mb-3 pb-2 border-b dark:border-gray-700">Personal Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field id="firstname" label="First Name" required />
              <Field id="lastname" label="Last Name" required />
              <div class="md:col-span-2">
                <Field id="bio" label="Bio" component="textarea" rows={3} />
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h4 class="text-md font-medium mb-3 pb-2 border-b dark:border-gray-700">Contact Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field id="email" type="email" label="Email Address" required />
              <Field id="phone" type="tel" label="Phone Number" />
              <Field id="address1" label="Address Line 1" />
              <Field id="address2" label="Address Line 2" />
              <Field id="city" label="City" />
              <Field id="state" label="State/Province" />
              <Field id="zipcode" label="Zip/Postal Code" />
              <Field 
                id="country" 
                label="Country"
                type="select"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'au', label: 'Australia' }
                ]}
              />
            </div>
          </div>
          
          <div class="mb-6">
            <h4 class="text-md font-medium mb-3 pb-2 border-b dark:border-gray-700">Preferences</h4>
            <div class="space-y-3">
              <div class="mb-4">
                <div class="text-sm font-medium mb-2">Theme Preference</div>
                <div class="space-y-2">
                  <Field id="theme_light" type="radio" label="Light Mode" value="light" />
                  <Field id="theme_dark" type="radio" label="Dark Mode" value="dark" />
                  <Field id="theme_system" type="radio" label="System Default" value="system" />
                </div>
              </div>
              
              <Checkbox id="newsletter" label="Subscribe to newsletter" checked={false} />
              <Checkbox id="terms" label="I agree to the terms and conditions" checked={false} required />
            </div>
          </div>
          
          <div class="flex justify-between mt-6 pt-4 border-t dark:border-gray-700">
            <Button type="reset" variant="outline">Reset</Button>
            <Button type="submit" variant="primary">Save Profile</Button>
          </div>
        </Form>
      </div>
    </div>
  );
});
