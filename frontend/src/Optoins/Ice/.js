const a = ["lk", "jk"];

const b = ["1", Array.isArray(a) && ...a.map((n) => ({ name: n }))];
console.log(b);
