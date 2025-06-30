import { useState, useEffect } from 'react';

interface BiometricData {
  heartRate: number;
  hrv: number;
  stressLevel: number;
  gsr: number;
  movement: number;
  sleep: number;
}

export function useBiometricData(): BiometricData {
  const [data, setData] = useState<BiometricData>({
    heartRate: 72,
    hrv: 45,
    stressLevel: 4.2,
    gsr: 8.5,
    movement: 1200,
    sleep: 7.5,
  });

  useEffect(() => {
    // Simulate real-time biometric data updates
    const interval = setInterval(() => {
      setData(prevData => ({
        heartRate: Math.max(60, Math.min(100, prevData.heartRate + (Math.random() - 0.5) * 4)),
        hrv: Math.max(20, Math.min(80, prevData.hrv + (Math.random() - 0.5) * 6)),
        stressLevel: Math.max(0, Math.min(10, prevData.stressLevel + (Math.random() - 0.5) * 0.8)),
        gsr: Math.max(5, Math.min(15, prevData.gsr + (Math.random() - 0.5) * 1.2)),
        movement: Math.max(0, Math.min(3000, prevData.movement + (Math.random() - 0.5) * 200)),
        sleep: Math.max(4, Math.min(10, prevData.sleep + (Math.random() - 0.5) * 0.2)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
}