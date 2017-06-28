'use strict';

class User {

    constructor (email, password, name) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.currentToken = '';
        this.active = false;
    }

}
module.exports = User;