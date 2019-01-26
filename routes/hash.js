const bcrypt = require('bcrypt');
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

async function run(){
    p = '123456';
    const salt = await bcrypt.genSalt(10);
    const hashed = "$2a$07$k3NeP7/gn4kfJ6OH6MZB9u8ynjRgTSIXFE8pxuJezaIB1nYZB7H9e"; //await bcrypt.hash(p, salt);
    console.log(hashed);
    const v = await bcrypt.compare(p, hashed);
    console.log(v);
}
run();
