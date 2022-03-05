import { BehaviorSubject } from "rxjs";

// @ts-ignore
const stats = new BehaviorSubject();

export const statService = {
  storeAction: (message) => stats.next({ stats: message }),
  getStats: () => stats.asObservable(),
};



