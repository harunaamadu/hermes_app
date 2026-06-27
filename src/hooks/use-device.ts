import { useSyncExternalStore } from "react";
import { DeviceType, getDeviceType } from "@/lib/constants";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getServerSnapshot(): DeviceType {
  return "desktop";
}

export const useDeviceType = () => {
  return useSyncExternalStore(subscribe, getDeviceType, getServerSnapshot);
};