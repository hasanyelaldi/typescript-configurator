import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import exportConfig from '../util/export';

// Add this helper component for the tooltip
const LabelWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => (
  <div className="flex items-center gap-1">
    <span>{label}</span>
    <div className="group relative">
      <InformationCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help" />
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded bg-gray-900 p-2 text-xs text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 shadow-lg border border-gray-700">
        {tooltip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  </div>
);

const ConfigurationForm = () => {
  const [config, setConfig] = useState({
    target: 'ES5',
    module: 'ESNext',
    strict: true,
    moduleResolution: 'node',
    include: [],
    exclude: [],
    jsx: 'react',
    declaration: false,
    sourceMap: true,
    removeComments: false,
    noImplicitAny: true,
    strictNullChecks: true,
    esModuleInterop: true,
    allowJs: false,
    outDir: 'dist',
    rootDir: 'src',
  });
  const [exportStatus, setExportStatus] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConfig({
      ...config,
      [event.target.name]: value
    });
  };

  const handleArrayChange = (event: React.ChangeEvent<HTMLInputElement>, key: 'include' | 'exclude') => {
    const files = event.target.value.split(',').map(file => file.trim());
    setConfig({
      ...config,
      [key]: files,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await exportConfig(config);
      setExportStatus('Configuration exported successfully!');
      setTimeout(() => setExportStatus(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      setExportStatus('Failed to export configuration. Please try again.');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          TypeScript Configuration
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-10 shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="Target"
                  tooltip="Specify ECMAScript target version: ES3 (default), ES5, ES6/ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, or ESNext"
                />
                <select 
                  name="target"
                  value={config.target}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base"
                >
                  {['ES3', 'ES5', 'ES6', 'ESNext'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="Module"
                  tooltip="Specify module code generation: None, CommonJS, AMD, UMD, System, ES6/ES2015, ES2020, ESNext"
                />
                <select 
                  name="module"
                  value={config.module}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base"
                >
                  {['CommonJS', 'ESNext', 'UMD'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="JSX"
                  tooltip="Specify JSX code generation: 'react' (default), 'react-jsx', 'react-jsxdev', 'preserve', 'react-native'"
                />
                <select 
                  name="jsx"
                  value={config.jsx}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base"
                >
                  {['react', 'react-jsx', 'react-jsxdev', 'preserve', 'react-native'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="Output Directory"
                  tooltip="Redirect output structure to the directory. This is where your compiled files will be placed."
                />
                <input
                  type="text"
                  name="outDir"
                  value={config.outDir}
                  onChange={handleChange}
                  placeholder="e.g., dist"
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base placeholder-gray-500"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="Root Directory"
                  tooltip="Specify the root directory of input files. This is used to control the output directory structure with --outDir."
                />
                <input
                  type="text"
                  name="rootDir"
                  value={config.rootDir}
                  onChange={handleChange}
                  placeholder="e.g., src"
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base placeholder-gray-500"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="strict"
                  checked={config.strict}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="Strict Mode"
                  tooltip="Enable all strict type checking options. This enables strict null checks, strict function types, strict bind calls, and more."
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="declaration"
                  checked={config.declaration}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="Generate Declarations"
                  tooltip="Generates corresponding .d.ts file for each TypeScript or JavaScript file."
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="sourceMap"
                  checked={config.sourceMap}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="Source Maps"
                  tooltip="Generates corresponding .map file for debugging purposes."
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="removeComments"
                  checked={config.removeComments}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="Remove Comments"
                  tooltip="Remove all comments except copy-right header comments beginning with /*!"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="noImplicitAny"
                  checked={config.noImplicitAny}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="No Implicit Any"
                  tooltip="Raise error on expressions and declarations with an implied 'any' type."
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="strictNullChecks"
                  checked={config.strictNullChecks}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="Strict Null Checks"
                  tooltip="In strict null checking mode, null and undefined are not in the domain of every type."
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="esModuleInterop"
                  checked={config.esModuleInterop}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="ES Module Interop"
                  tooltip="Enables emit interoperability between CommonJS and ES Modules."
                />
              </label>
            </div>

            <div className="form-control">
              <label className="flex items-center space-x-3 text-base font-medium text-gray-300">
                <input 
                  type="checkbox"
                  name="allowJs"
                  checked={config.allowJs}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
                />
                <LabelWithTooltip 
                  label="Allow JavaScript"
                  tooltip="Allow JavaScript files to be compiled. Useful when migrating JS project to TS."
                />
              </label>
            </div>
          </div>

          <div className="form-control">
            <label className="block text-base font-medium text-gray-300 mb-3">
              Module Resolution
              <select 
                name="moduleResolution"
                value={config.moduleResolution}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base"
              >
                {['node', 'classic'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-6">
            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="Include Files"
                  tooltip="Specify files to be included in compilation. Supports glob patterns like src/**/*.ts"
                />
                <input
                  type="text"
                  name="include"
                  value={config.include.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'include')}
                  placeholder="e.g., src/**/*.ts, src/**/*.tsx"
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base placeholder-gray-500"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="block text-base font-medium text-gray-300 mb-3">
                <LabelWithTooltip 
                  label="Exclude Files"
                  tooltip="Specify files to be excluded from compilation. Supports glob patterns like node_modules, dist"
                />
                <input
                  type="text"
                  name="exclude"
                  value={config.exclude.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'exclude')}
                  placeholder="e.g., node_modules, dist"
                  className="mt-2 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white shadow-sm transition-colors py-2 px-3 text-base placeholder-gray-500"
                />
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Export Configuration
          </button>

          {exportStatus && (
            <div className={`mt-4 p-4 rounded-md text-base font-medium text-center transition-all duration-300 ${
              exportStatus.includes('Failed') 
                ? 'bg-red-500/20 text-red-200 border border-red-500/30' 
                : 'bg-green-500/20 text-green-200 border border-green-500/30'
            }`}>
              {exportStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ConfigurationForm;