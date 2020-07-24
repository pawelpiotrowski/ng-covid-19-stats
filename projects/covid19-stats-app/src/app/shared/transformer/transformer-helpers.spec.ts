import { reduceGlobalStatsPayloadToLatestNumberOf } from './transformer-helpers';

describe('TransformerHelpers', () => {
  describe('reduceGlobalStatsPayloadToLatestNumberOf', () => {
    describe('when data is empty', () => {
      it('should return -1', () => {
        const expected = reduceGlobalStatsPayloadToLatestNumberOf([], 'confirmed');

        expect(expected).toEqual(-1);
      });
    });

    describe('when data is NOT empty', () => {
      it('should return sum of all requested properties', () => {
        const mockData: any = [
          {
            latest_data: {
              confirmed: 1,
              deaths: 10,
              recovered: 100,
            },
          },
          {
            latest_data: {
              confirmed: 2,
              deaths: 20,
              recovered: 200,
            },
          },
          {
            latest_data: {
              confirmed: 3,
              deaths: 30,
              recovered: 300,
            },
          },
        ];
        const expected1 = reduceGlobalStatsPayloadToLatestNumberOf(mockData, 'confirmed');
        const expected2 = reduceGlobalStatsPayloadToLatestNumberOf(mockData, 'deaths');
        const expected3 = reduceGlobalStatsPayloadToLatestNumberOf(mockData, 'recovered');

        expect(expected1).toEqual(6);
        expect(expected2).toEqual(60);
        expect(expected3).toEqual(600);
      });
    });
  });
});

