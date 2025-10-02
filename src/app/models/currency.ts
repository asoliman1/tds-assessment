
/**
 * Represents currency from currecubeacon api.
 */
export interface ICurrency {
    id: number;
    code: string;
    name: string;
    symbol: string;
    short_code: string;
}

/**
 * Represents the request response for a currency list operation.
 */
export interface ICurrencyResponse {
    response: ICurrency[];
}

/**
 * Represents the request parameters for a currency conversion operation.
 */
export interface ICurrencyConvertParams {
    /**
     * The source currency code in ISO 4217 format (e.g., "USD").
     */
    from: string;

    /**
     * The target currency code in ISO 4217 format (e.g., "EUR").
     */
    to: string;

    /**
     * The amount of money to convert from the source currency.
     */
    amount: number;
}

/**
 * Represents the request response for a currency conversion operation.
 */
export interface ICurrencyConvertResponse{
    timestamp?: number,
    date?: string,
    value: number
}