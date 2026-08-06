export interface ValidationError {
    field: string;
    message: string;
}

export interface ApiErrorResponse {
    message: string;
    code: string;
    errors?: ValidationError[];
}