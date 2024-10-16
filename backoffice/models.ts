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

export type GetTransactionsData = {
  StartTimeLocal: string;
  EndTimeLocal: string;
  ClientId: number;
  CurrencyId: string;
  SkeepRows: number;
  MaxRows: number;
  PaymentSystemId: number | null;
  GameId: number | null;
  DocumentTypeIds: number[];
  ByPassTotals: boolean;
};

export type Transaction = {
  Amount: number;
  Balance: number;
  ClientId: number;
  CreatedLocal: string;
  DocumentId: number;
  DocumentTypeId: number;
  GameId: number | null;
  Game: string | null;
  Note: string | null;
  PaymentSystemName: string | null;
  PaymentSystemId: number | null;
  CurrencyId: string;
};

export type GetTransactionsResponse = {
  Data: {
    Objects: Transaction[];
  };
};

export type PlayerRestrictions = {
  CanLogin: boolean;
  CanBet: boolean;
  CanDeposit: boolean;
  CanWithdraw: boolean;
  CanIncreaseLimit: boolean;
  CanClaimBonus: boolean;
  CanCasinoLogin: boolean;
};

export type UpdatePlayerRestrictionsData = Partial<PlayerRestrictions>;

export type UpdatePlayerRestrictionsResponse = {
  HasError: boolean;
  AlertMessage: string;
};

export type GetPlayerRestrictionsResponse = {
  Data: PlayerRestrictions & {
    ClientId: Player["Id"];
    UserName: string;
    ModifedLocal: string;
    Modified: string;
  };
};

export type PlayerBonus = {
  Id: number;
  AcceptanceType: number;
  AcceptanceDateLocal: string;
  ClientId: number;
  PartnerBonusId: number;
  ResultType: number;
  ResultDateLocal: string;
  Amount: number;
  CreatedLocal: string;
};

export type GetPlayerBonusesResponse = {
  Data: PlayerBonus[];
};

export type AddPlayerBonusResponse = {
  HasError: boolean;
  AlertMessage: string;
};
