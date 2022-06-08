import store from "store2"

const allowLog = (label: string) => {
  const logStore = store.namespace('log');
  const allowed = logStore('allowed') || [];
  if (allowed.includes(label)) return;
  logStore('allowed', [...allowed, label]);
}

const clearAllowLog = () => {
  const logStore = store.namespace('log');
  logStore('allowed', []);
}

const log = (label: string, ...message: any[]) => {
  const logStore = store.namespace('log');

  const allowed = logStore('allowed');

  if (!allowed || !(allowed.includes(label) || allowed.includes('all'))) {
    return;
  }

  console.log(label, ...message)
}

if (typeof window !== "undefined") {
  (window as any).ethos = { 
    allowLog: allowLog,
    clearAllowLog: clearAllowLog
  }
}

export default log;