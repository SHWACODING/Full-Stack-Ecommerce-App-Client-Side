export interface IProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    stock: number;
    categories: {
      data: [
        {
          id: number;
          attributes: {
            title: string;
          };
        },
        {
          id: number;
          attributes: {
            title: string;
          };
        }
      ];
    };
    thumbnail: {
      data: {
        id: number;
        attributes: {
          name: string;
          formats: {
            thumbnail: {
              name: string;
              url: string;
            };
            small: {
              name: string;
              url: string;
            };
          };
          url: string;
        };
      };
    };
  };
  quantity: number;
}

export interface IPayloadAction {
  error: {
    message: string;
  };
  meta: {
    aborted: boolean;
    arg: {
      identifier: string;
      password: string;
    };
    condition: boolean;
    rejectedWithValue: boolean;
    requestId: string;
    requestStatus: string;
  };
  payload: {
    code: string;
    message: string;
    name: string;
    request: {
      status: number;
      statusText: string;
    };
    response: {
      data: {
        error: {
          message: string;
          name: string;
          status: number;
        };
      };
    };
  };
}

export interface IUserData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
  };
  email: string;
  id: number;
  provider: string;
  username: string;
}

export interface IActions {
  loading: boolean;
  data: IUserData | null | string[];
  error: string | null;
  jwt?: string;
}
