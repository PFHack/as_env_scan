/*
 * ==================================
 * @Author: PFinal南丞
 * @Date: 2021-09-17 13:33:00
 * @Description:  高山仰止,景行行制,虽不能至,心向往之
 * ==================================
 */
'use strict';

const SCANNER = require('./libs/scanner');

class Plugin {
    constructor(opt) {
      new SCANNER(opt)
    }
}

module.exports = Plugin;