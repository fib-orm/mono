## Fibjs SQL DDL Synchronization

[![NPM version](https://img.shields.io/npm/v/@fib-orm/sql-ddl-sync.svg)](https://www.npmjs.org/package/@fib-orm/sql-ddl-sync)
[![Build Status](https://travis-ci.org/fxjs-modules/sql-ddl-sync.svg)](https://travis-ci.org/fxjs-modules/sql-ddl-sync)
[![Build status](https://ci.appveyor.com/api/projects/status/plarvl262d7279c3?svg=true)](https://ci.appveyor.com/project/richardo2016/sql-ddl-sync)

**NOTICE**: This is [node-sql-ddl-sync]'s fibjs version, thx a lot to [node-sql-ddl-sync]'s author : )

## Install

```sh
npm install @fib-orm/sql-ddl-sync
```

## Dialects

- MySQL
- SQLite

## About

Originally, this module is part of [fib-orm]. It's used synchronize model tables in supported dialects.

But now, it could run without [fib-orm], just install [@fib-orm/db-driver] instead 🚀
Sorry there is no API documentation for now but there are a couple of tests you can read and find out how to use it if you want.

**Version Match**

`sql-ddl-sync` Version | required `orm` Version |
:-----------|:--------|
sql-ddl-sync <= 0.3.x  |  orm < 1.10.3	|
sql-ddl-sync = 0.4.x  |  orm >= 1.10.3	|
sql-ddl-sync >= 0.5.x  |  **don't need!**	|


## Example

Install [@fib-orm/db-driver]. Create a file with the contents below and change insert your database credentials.
Run once and you'll see table `ddl_sync_test` appear in your database. Then make some changes to it (add/drop/change columns)
and run the code again. Your table should always return to the same structure.

```js
const DBDriver   = require("@fib-orm/db-driver");
const mysql = require("mysql");
const Sync  = require("@fib-orm/sql-ddl-sync").Sync;

const dbdriver = DBDriver.create("mysql://username:password@localhost/database");

const sync = new Sync({
	dbdriver: dbdriver,
	debug   : function (text) {
		console.log("> %s", text);
	}
});

sync.defineCollection("ddl_sync_test", {
	id     : { type: "serial", key: true, serial: true },
	name   : { type: "text", required: true },
	age    : { type: "integer" },
	male   : { type: "boolean" },
	born   : { type: "date", time: true },
	born2  : { type: "date" },
	int2   : { type: "integer", size: 2 },
	int4   : { type: "integer", size: 4 },
	int8   : { type: "integer", size: 8 },
	float4 : { type: "number",  size: 4 },
	float8 : { type: "number",  size: 8 },
	photo  : { type: "binary" }
});

try {
	sync.sync()
	console.log("> Sync Done");
} catch (err) {
	if (err) {
		console.log("> Sync Error");
		console.log(err);
	}
}

process.exit(0);
```
## Test

To test, first make sure you have development dependencies installed. Go to the root folder and do:

```sh
npm install
```

Then, just run the tests.

```sh
npm test
```

If you have a supported database server and want to test against it, first install the module:

And then run:

```sh
URI=mysql://username:password@localhost/database fibjs test/run-db
```

## Credits

This repo is checked out from [Diogo Resende]'s [node-sql-ddl-sync], which is one part of `orm`, and orm is the original source of `fib-orm`. Thx a lot to him and his partner.


[Diogo Resende]:dresende@thinkdigital.pt
[node-sql-ddl-sync]:./README_orig.md
[@fib-orm/db-driver]:https://npmjs.org/@fib-orm/db-driver
[fib-orm]:https://github.com/fxjs-modules/orm