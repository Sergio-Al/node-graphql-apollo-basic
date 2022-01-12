console.log("hello from other!");

process.stdin.on("data", (data) => {
  const name = data.toString().trim().toUpperCase();
  process.stdout.write(`Result ${name}`);
});
