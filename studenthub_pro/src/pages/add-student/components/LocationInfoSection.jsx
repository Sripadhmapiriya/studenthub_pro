import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationInfoSection = ({ formData, errors, onChange }) => {
  const countryOptions = [
    { value: 'in', label: 'India' }
  ];

  const stateOptions = [
    { value: 'ap', label: 'Andhra Pradesh' },
    { value: 'ar', label: 'Arunachal Pradesh' },
    { value: 'as', label: 'Assam' },
    { value: 'br', label: 'Bihar' },
    { value: 'ct', label: 'Chhattisgarh' },
    { value: 'ga', label: 'Goa' },
    { value: 'gj', label: 'Gujarat' },
    { value: 'hr', label: 'Haryana' },
    { value: 'hp', label: 'Himachal Pradesh' },
    { value: 'jh', label: 'Jharkhand' },
    { value: 'ka', label: 'Karnataka' },
    { value: 'kl', label: 'Kerala' },
    { value: 'mp', label: 'Madhya Pradesh' },
    { value: 'mh', label: 'Maharashtra' },
    { value: 'mn', label: 'Manipur' },
    { value: 'ml', label: 'Meghalaya' },
    { value: 'mz', label: 'Mizoram' },
    { value: 'nl', label: 'Nagaland' },
    { value: 'or', label: 'Odisha' },
    { value: 'pb', label: 'Punjab' },
    { value: 'rj', label: 'Rajasthan' },
    { value: 'sk', label: 'Sikkim' },
    { value: 'tn', label: 'Tamil Nadu' },
    { value: 'tg', label: 'Telangana' },
    { value: 'tr', label: 'Tripura' },
    { value: 'up', label: 'Uttar Pradesh' },
    { value: 'ut', label: 'Uttarakhand' },
    { value: 'wb', label: 'West Bengal' },
    { value: 'an', label: 'Andaman and Nicobar Islands' },
    { value: 'ch', label: 'Chandigarh' },
    { value: 'dh', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'dl', label: 'Delhi' },
    { value: 'jk', label: 'Jammu and Kashmir' },
    { value: 'la', label: 'Ladakh' },
    { value: 'ld', label: 'Lakshadweep' },
    { value: 'py', label: 'Puducherry' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-6 bg-success rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">Location Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Street Address"
          type="text"
          placeholder="123 MG Road"
          value={formData?.address}
          onChange={(e) => onChange('address', e?.target?.value)}
          error={errors?.address}
          required
          className="col-span-1 md:col-span-2"
        />
        
        <Input
          label="City"
          type="text"
          placeholder="Mumbai"
          value={formData?.city}
          onChange={(e) => onChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />
        
        <Select
          label="State/Province"
          placeholder="Select state"
          options={stateOptions}
          value={formData?.state}
          onChange={(value) => onChange('state', value)}
          error={errors?.state}
          searchable
          required
        />
        
        <Input
          label="PIN Code"
          type="text"
          placeholder="110001"
          value={formData?.zipCode}
          onChange={(e) => onChange('zipCode', e?.target?.value)}
          error={errors?.zipCode}
          required
        />
        
        <Select
          label="Country"
          placeholder="Select country"
          options={countryOptions}
          value={formData?.country}
          onChange={(value) => onChange('country', value)}
          error={errors?.country}
          searchable
          required
        />
      </div>
    </div>
  );
};

export default LocationInfoSection;