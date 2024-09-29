import { DateTime } from "luxon";
import { BackofficeError } from "./error";
import type {
  GetAllDepositsData,
  GetAllDepositsResponse,
  GetAllPlayersData,
  GetAllPlayersResponse,
  GetPlayerKpiResponse,
  GetTransactionsData,
  GetTransactionsResponse,
  Player,
} from "./models";

export class BackofficeClient {
  private readonly url = "https://backofficewebadmin.betconstruct.com/api/en";
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(
    method: "GET" | "POST",
    path: string,
    data?: Record<string, unknown>,
    token = this.token
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(`${this.url}${path}`, options);
    if (!response.ok)
      throw new BackofficeError(response.status, response.statusText);

    return response.json();
  }

  get<T>(path: string, token?: string): Promise<T> {
    return this.request("GET", path, undefined, token);
  }

  post<T>(
    path: string,
    data: Record<string, unknown>,
    token?: string
  ): Promise<T> {
    return this.request("POST", path, data, token);
  }

  readonly players = {
    getAll: (data: GetAllPlayersData, token?: string): Promise<Player[]> =>
      this.post<GetAllPlayersResponse>("/Client/GetClients", data, token).then(
        ({ Data }) => Data.Objects
      ),
    getPlayerKpi: (playerId: Player["Id"], token?: string) =>
      this.get<GetPlayerKpiResponse>(
        "/Client/GetClientKpi?id=" + playerId,
        token
      ).then(({ Data }) => Data),
    getTransactions: (
      playerId: Player["Id"],
      start: Date,
      end: Date,
      data: Partial<
        Omit<
          GetTransactionsData,
          "StartTimeLocal" | "EndTimeLocal" | "ClientId"
        >
      > = { MaxRows: 0, CurrencyId: "TRY" },
      token?: string
    ) =>
      this.post<GetTransactionsResponse>(
        "/Client/GetClientTransactionsV1",
        {
          StartTimeLocal: DateTime.fromJSDate(start).toFormat("dd-MM-yy"),
          EndTimeLocal: DateTime.fromJSDate(end).toFormat("dd-MM-yy"),
          ClientId: playerId,
          ...data,
          CurrencyId: data.CurrencyId || "TRY",
          MaxRows: data.MaxRows || 0,
        },
        token
      ).then(({ Data }) => Data.Objects),
  };

  readonly deposits = {
    getAll: (
      start: Date,
      end: Date,
      data: Partial<
        Omit<GetAllDepositsData, "FromCreatedDateLocal" | "ToCreatedDateLocal">
      >
    ) =>
      this.post<GetAllDepositsResponse>(
        "/Financial/GetDepositsWithdrawalsWithPaging",
        {
          FromCreatedDateLocal: DateTime.fromJSDate(start).toFormat(
            "dd-MM-yy - HH:mm:ss"
          ),
          ToCreatedDateLocal: DateTime.fromJSDate(end).toFormat(
            "dd-MM-yy - HH:mm:ss"
          ),
          ...data,
        }
      ).then(({ Data }) => Data.Documents.Objects),
  };
}
