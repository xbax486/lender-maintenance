export interface Lender {
    "type": string;
    "id": string;
    "attributes": {
        "code": string;
        "name": string;
        "type": string;
        "upfont_commission": number;
        "high_trail_commission": number;
        "low_trail_commission": number;
        "balance_multiplier": number;
        "is_active": boolean;
        "is_hidden": boolean
    }
}

export interface LenderJsonResult {
    data: Lender[];
    links: {
        "self": string;
    }
}