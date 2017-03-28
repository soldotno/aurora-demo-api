Aurora Demo API
===============

Demo implementation of an API conforming to [aurora-core](https://github.com/soldotno/aurora-core) specifications.

#### Install dependencies (some might need to use `sudo` for various reasons):
* [Install node.js (5.x)](https://nodejs.org/)
* `npm install`

#### Development shellscript example:
```sh
#!/bin/sh
export PORT=3001
export DEBUG="*, -babel"
export NODE_ENV="development"

npm start
```
