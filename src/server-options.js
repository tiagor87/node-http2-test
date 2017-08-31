const fs = require('fs');
const path = require('path');

return (module.exports = {
  key: fs.readFileSync(path.resolve('./cert/key.key')),
  cert: fs.readFileSync(path.resolve('./cert/cert.crt'))
});
