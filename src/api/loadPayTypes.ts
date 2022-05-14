import axios from 'axios';

import { AdsFiat } from '../common/types';
import { payTypesURL } from '../common/vars';

export type PayType = {
  identifier: string;
  name: string;
};

type PayTypesResponse = {
  data: {
    tradeMethods: {
      identifier: string;
      tradeMethodName: string;
    }[];
  };
};

export const loadPayTypes = async (
  fiat: AdsFiat,
): Promise<PayType[] | null> => {
  const response = await axios.post<PayTypesResponse>(payTypesURL, {
    fiat,
  });

  if (response.status === 200) {
    return response.data.data.tradeMethods.map(
      ({ identifier, tradeMethodName }) => ({
        identifier,
        name: tradeMethodName,
      }),
    );
  }

  return null;
};
