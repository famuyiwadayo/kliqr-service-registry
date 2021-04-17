import consola from "consola";
import semver from "semver";

interface IService {
  name: string;
  version: string;
  ip: string;
  port: string | number;
  timestamp: number;
}

class ServiceRegistry {
  log: any;
  services: Record<string, Partial<IService>>;
  timeout: number;

  constructor() {
    // this.log = log;
    this.services = {};
    this.timeout = 30;
  }

  get(name: string, version: string) {
    this.cleanup();
    const candidates = Object.values(this.services).filter(
      (service) =>
        service.name === name && semver.satisfies(service.version!, version)
    );

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name: string, version: string, ip: string, port: string | number) {
    const key = name + version + ip + port;
    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].ip = ip;
      this.services[key].name = name;
      this.services[key].port = port;
      this.services[key].version = version;
      this.services[key].timestamp = Math.floor(Date.now() / 1000);
      consola.info(`Added service ${name} version ${version} at ${ip}:${port}`);
      return key;
    }

    this.services[key].timestamp = Math.floor(Date.now() / 1000);
    consola.info(`Updated service ${name} version ${version} at ${ip}:${port}`);
    return key;
  }

  unregister(name: string, version: string, ip: string, port: string | number) {
    const key = name + version + ip + port;
    delete this.services[key];
    consola.info(
      `Unregistered service ${name} version ${version} at ${ip}:${port}`
    );
    return key;
  }

  cleanup() {
    const now = Math.floor(Date.now() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp! + this.timeout < now)
        delete this.services[key];
      consola.info(`Removed service ${key}`);
    });
  }
}

export default ServiceRegistry;
