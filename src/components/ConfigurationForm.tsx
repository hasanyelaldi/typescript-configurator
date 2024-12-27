import React, { useState } from 'react';
import exportConfig from '../util/export';

const ConfigurationForm = () => {
  const [config, setConfig] = useState({
    target: 'ES5',
    module: 'ESNext',
    strict: true, // Enable strict type-checking
    moduleResolution: 'node', // Module resolution strategy
    include: [], // Files to be included
    exclude: [], // Files to be excluded
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    exportConfig(config);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label>
        Target:
        <select name="target" value={config.target} onChange={handleChange}>
          <option value="ES3">ES3</option>
          <option value="ES5">ES5</option>
          <option value="ES6">ES6</option>
          <option value="ESNext">ESNext</option>
        </select>
      </label>

      <label>
        Module:
        <select name="module" value={config.module} onChange={handleChange}>
          <option value="CommonJS">CommonJS</option>
          <option value="ESNext">ESNext</option>
          <option value="UMD">UMD</option>
        </select>
      </label>

      <label>
        Strict:
        <input 
          type="checkbox" 
          name="strict" 
          checked={config.strict} 
          onChange={handleChange} />
      </label>

      <label>
        Module Resolution:
        <select name="moduleResolution" value={config.moduleResolution} onChange={handleChange}>
          <option value="node">Node</option>
          <option value="classic">Classic</option>
        </select>
      </label>

      <label>
        Include Files (comma-separated):
        <input
          type="text"
          name="include"
          value={config.include.join(', ')}
          onChange={(e) => handleArrayChange(e, 'include')} />
      </label>

      <label>
        Exclude Files (comma-separated):
        <input
          type="text"
          name="exclude"
          value={config.exclude.join(', ')}
          onChange={(e) => handleArrayChange(e, 'exclude')} />
      </label>

      <button type="submit">Export Config</button>
    </form>
  );
};

export default ConfigurationForm;