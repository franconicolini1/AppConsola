'use strict';

const {v4: uuidv4} = require('uuid');

class Task {

    constructor(description = '') {
        this.id = uuidv4();
        this.description = description;
        this.completeIn = null;
    }
}

module.exports = Task;