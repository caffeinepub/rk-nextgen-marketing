import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    name: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    submitContactForm(name: string, phone: string, message: string): Promise<void>;
}
