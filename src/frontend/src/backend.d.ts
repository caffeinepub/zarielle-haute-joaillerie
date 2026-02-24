import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export type AppointmentId = bigint;
export interface GoldRates {
    lastUpdated: Time;
    rate18K: bigint;
    rate22K: bigint;
    rate24K: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface PriceBreakdown {
    gst: bigint;
    weight: number;
    finalPrice: bigint;
    goldRate: bigint;
    metalType: MetalType;
    makingCharges: bigint;
    basePrice: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface Client {
    id: ClientId;
    name: string;
    createdAt: Time;
    purchaseHistory: Array<OrderId>;
    email: string;
    address: string;
    phone: string;
}
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ClientId = bigint;
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    giftWrapping: boolean;
    paymentStatus: string;
    engravingText: string;
    createdAt: Time;
    createdBy: Principal;
    email: string;
    updatedAt: Time;
    address: string;
    phone: string;
    items: Array<CartItem>;
    totalPrice?: PriceBreakdown;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CartItem {
    id: bigint;
    weight: number;
    productId: ProductId;
    customizations: string;
    metalType: MetalType;
    quantity: bigint;
}
export type ProductId = bigint;
export interface Appointment {
    id: AppointmentId;
    status: AppointmentStatus;
    clientName: string;
    createdAt: Time;
    createdBy: Principal;
    productId?: ProductId;
    email: string;
    appointmentType: AppointmentType;
    updatedAt: Time;
    preferredDate: Time;
    notes: string;
    phone: string;
}
export interface Product {
    id: ProductId;
    diamondClarity?: string;
    weightMax: number;
    weightMin: number;
    stockQuantity: bigint;
    collection: ProductCollection;
    limitedEdition: boolean;
    name: string;
    createdAt: Time;
    description: string;
    updatedAt: Time;
    diamondCarat?: number;
    metalOptions: Array<MetalType>;
    diamondColor?: string;
    goldCertification: string;
    giaCertification: string;
    basePrice: bigint;
    diamondCut?: string;
    images: Array<ExternalBlob>;
}
export type OrderId = bigint;
export enum AppointmentStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum AppointmentType {
    video = "video",
    inPerson = "inPerson"
}
export enum MetalType {
    gold18K = "gold18K",
    gold22K = "gold22K",
    gold24K = "gold24K"
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed",
    processing = "processing"
}
export enum ProductCollection {
    templeGrandeur = "templeGrandeur",
    diamondCouture = "diamondCouture",
    limitedEditions = "limitedEditions",
    royalBridal = "royalBridal"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculatePrice(productId: ProductId, metalType: MetalType, weight: number, makingCharges: bigint, gst: bigint): Promise<PriceBreakdown | null>;
    cancelAppointment(id: AppointmentId): Promise<void>;
    createAppointment(appointment: Appointment): Promise<AppointmentId>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createOrder(order: Order): Promise<OrderId>;
    createProduct(product: Product): Promise<ProductId>;
    deleteProduct(id: ProductId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClientById(id: ClientId): Promise<Client | null>;
    getCraftsmanshipStory(): Promise<string>;
    getEthicalSourcingInfo(): Promise<string>;
    getGoldRates(): Promise<GoldRates | null>;
    getOrderById(id: OrderId): Promise<Order | null>;
    getProductById(id: ProductId): Promise<Product | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    listAppointments(status: AppointmentStatus | null): Promise<Array<Appointment>>;
    listClients(): Promise<Array<Client>>;
    listOrders(status: OrderStatus | null): Promise<Array<Order>>;
    listProducts(collection: ProductCollection | null): Promise<Array<Product>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    toggleLimitedEdition(productId: ProductId): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAppointmentStatus(id: AppointmentId, status: AppointmentStatus): Promise<void>;
    updateCraftsmanshipStory(story: string): Promise<void>;
    updateEthicalSourcingInfo(info: string): Promise<void>;
    updateGoldRates(newRates: GoldRates): Promise<void>;
    updateOrderStatus(id: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(updatedProduct: Product): Promise<void>;
    updateProductStock(productId: ProductId, quantity: bigint): Promise<void>;
}
