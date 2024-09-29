export type Deposit = {
  Amount: number;
  ClientLogin: string;
  CreatedLocal: string;
  ClientId: number;
  Id: number;
};

export type GetAllDepositsData = {
  FromCreatedDateLocal: string;
  ToCreatedDateLocal: string;
  AmountFrom?: string;
};

export type GetAllDepositsResponse = {
  Data: {
    Documents: {
      Objects: Deposit[];
    };
  };
};

export type Player = {
  Login: string;
  Id: number;
  Phone: string;
  DocNumber: string;
  Email: string;
  CreatedLocalDate: string;
  IsTwoFactorAuthenticationEnabled: boolean;
  Excluded: null | boolean;
  Balance: number;
  FirstDepositDateLocal: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  ExcludeTypeId: null | number;
};

export type GetAllPlayersData = Partial<{
  Login: string;
  Phone: string;
  DocumentNumber: string;
  Email: string;
}>;

export type GetAllPlayersResponse = {
  Data: {
    Objects: Player[];
  };
};

export type GetPlayerKpiResponse = {
  Data: {
    DepositAmount: number;
  };
};
