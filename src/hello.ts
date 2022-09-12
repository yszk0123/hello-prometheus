import client from 'prom-client';

async function main() {
  const registry = new client.Registry();
  const counter = new client.Counter({
    name: 'example_counter',
    help: 'example counter metrics',
    registers: [registry],
  });
  const gateway = new client.Pushgateway('http://localhost:9091', {}, registry);

  counter.inc();
  counter.inc();
  counter.inc();

  try {
    await gateway.pushAdd({ jobName: 'example-job' });
  } catch (error) {
    console.error(error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
