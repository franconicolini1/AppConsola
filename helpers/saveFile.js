'use strict';

const fs = require('fs');
const DATA_FILE = './db/data.json';

const saveDB = data => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));    
}

const readDB = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return null;
    }

    const info = fs.readFileSync(DATA_FILE, {encoding: 'utf-8'});
    const data = info ? JSON.parse(info) : null;

    return data;
}

module.exports = {
    saveDB,
    readDB
}