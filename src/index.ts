/**
 * Task Manager CLI
 */

async function main() {
  console.log("Welcome to Task Manager CLI!");
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: task-manager [command]");
    console.log("Commands: list, add, remove");
    return;
  }

  const command = args[0];
  switch (command) {
    case 'list':
      console.log("Listing tasks...");
      break;
    case 'add':
      console.log("Adding task...");
      break;
    case 'remove':
      console.log("Removing task...");
      break;
    default:
      console.log(`Unknown command: ${command}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
