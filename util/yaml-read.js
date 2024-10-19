const fs = require('fs');
const yaml = require('js-yaml');

function ymal() {

let cache = false

try {

    if(!cache) {
        const configFile = fs.readFileSync('./config.yaml', 'utf8'); 
        const config = yaml.load(configFile);
    
        cache = config

        return config // Output the configuration object
    } else {
        return cache
    }


} catch (e) {
    console.error(`Error reading config.yaml: ${e.message}`);
}
}


module.exports = {
    ymal
};