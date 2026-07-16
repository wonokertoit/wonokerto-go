'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
}

export default function Select({ label, name, value, onChange, options, placeholder = 'Pilih...', error }: SelectProps) {
  const selected = options.find((o) => o.value === value);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#57534e] mb-1">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-pointer rounded-lg bg-[#fafaf9] py-2 pl-3 pr-10 text-left text-sm text-[#1c1917] border transition-all outline-none focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] ${
              error ? 'border-[#fca5a5]' : 'border-[#e7e5e4]'
            }`}
          >
            <span className={`block truncate ${!selected ? 'text-[#a8a29e]' : ''}`}>
              {selected?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-4 w-4 text-[#a8a29e]" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-[#e7e5e4] focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-[#fafaf9] text-[#1c1917]' : 'text-[#1c1917]'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#78716c]">
                          <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && <p className="text-[#dc2626] text-xs mt-1">{error}</p>}
    </div>
  );
}
