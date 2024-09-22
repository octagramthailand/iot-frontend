type GaugeData = {
  min: number;
  max: number;
};

export const gaugeData: { [key: string]: GaugeData } = {
  voltageDC: {
    min: 180,
    max: 190,
  },
  voltageL1: {
    min: 0,
    max: 0,
  },
  voltageL2: {
    min: 0,
    max: 0,
  },
  voltageL3: {
    min: 0,
    max: 0,
  },
  currentDC: {
    min: 6,
    max: 7,
  },
  currentL1: {
    min: 0,
    max: 0,
  },
  currentL2: {
    min: 0,
    max: 0,
  },
  currentL3: {
    min: 0,
    max: 0,
  },
  tempInverter: {
    min: 48,
    max: 52,
  },
  powerInverter: {
    min: 3100,
    max: 3200,
  },
};
