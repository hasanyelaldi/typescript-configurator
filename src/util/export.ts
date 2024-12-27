const exportConfig = (config: any) => {
    const fileName = "tsconfig.json";
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], {type : 'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default exportConfig;