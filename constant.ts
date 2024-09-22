type GaugeData = {
  min: number;
  max: number;
};

export const gaugeData: { [key: string]: GaugeData } = {
  voltageDC: {
    min: 200,
    max: 400,
  },
  voltageL1: {
    min: 110,
    max: 130,
  },
  voltageL2: {
    min: 110,
    max: 130,
  },
  voltageL3: {
    min: 110,
    max: 130,
  },
  currentDC: {
    min: 0,
    max: 10,
  },
  currentL1: {
    min: 0,
    max: 15,
  },
  currentL2: {
    min: 0,
    max: 15,
  },
  currentL3: {
    min: 0,
    max: 15,
  },
  tempInverter: {
    min: 25,
    max: 60,
  },
  tempLogger: {
    min: 25,
    max: 50,
  },
  powerInverter: {
    min: 0,
    max: 2000,
  },
};
