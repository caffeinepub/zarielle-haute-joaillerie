import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import {
  Product,
  ProductCollection,
  ProductId,
  GoldRates,
  MetalType,
  PriceBreakdown,
  Appointment,
  AppointmentId,
  AppointmentStatus,
  Order,
  OrderId,
  OrderStatus,
  Client,
  ClientId,
  UserProfile,
} from '../backend';

// Products
export function useListProducts(collection: ProductCollection | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products', collection],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts(collection);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductById(productId: ProductId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Product | null>({
    queryKey: ['product', productId?.toString()],
    queryFn: async () => {
      if (!actor || productId === null) return null;
      return actor.getProductById(productId);
    },
    enabled: !!actor && !isFetching && productId !== null,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateProduct(product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: ProductId) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useToggleLimitedEdition() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: ProductId) => {
      if (!actor) throw new Error('Actor not available');
      await actor.toggleLimitedEdition(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Gold Rates
export function useGetGoldRates() {
  const { actor, isFetching } = useActor();
  return useQuery<GoldRates | null>({
    queryKey: ['goldRates'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getGoldRates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateGoldRates() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRates: GoldRates) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateGoldRates(newRates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goldRates'] });
    },
  });
}

export function useCalculatePrice() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      productId,
      metalType,
      weight,
      makingCharges,
      gst,
    }: {
      productId: ProductId;
      metalType: MetalType;
      weight: number;
      makingCharges: bigint;
      gst: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.calculatePrice(productId, metalType, weight, makingCharges, gst);
    },
  });
}

// Appointments
export function useListAppointments(status: AppointmentStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<Appointment[]>({
    queryKey: ['appointments', status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAppointments(status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (appointment: Appointment) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createAppointment(appointment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: AppointmentId; status: AppointmentStatus }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateAppointmentStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useCancelAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: AppointmentId) => {
      if (!actor) throw new Error('Actor not available');
      await actor.cancelAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

// Orders
export function useListOrders(status: OrderStatus | null = null) {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ['orders', status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listOrders(status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOrderById(orderId: OrderId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Order | null>({
    queryKey: ['order', orderId?.toString()],
    queryFn: async () => {
      if (!actor || orderId === null) return null;
      return actor.getOrderById(orderId);
    },
    enabled: !!actor && !isFetching && orderId !== null,
  });
}

export function useCreateOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: Order) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createOrder(order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: OrderId; status: OrderStatus }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// Content
export function useGetCraftsmanshipStory() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ['craftsmanshipStory'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getCraftsmanshipStory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEthicalSourcingInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ['ethicalSourcingInfo'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getEthicalSourcingInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateCraftsmanshipStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (story: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateCraftsmanshipStory(story);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['craftsmanshipStory'] });
    },
  });
}

export function useUpdateEthicalSourcingInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (info: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateEthicalSourcingInfo(info);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ethicalSourcingInfo'] });
    },
  });
}

// Clients
export function useListClients() {
  const { actor, isFetching } = useActor();
  return useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listClients();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetClientById(clientId: ClientId | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Client | null>({
    queryKey: ['client', clientId?.toString()],
    queryFn: async () => {
      if (!actor || clientId === null) return null;
      return actor.getClientById(clientId);
    },
    enabled: !!actor && !isFetching && clientId !== null,
  });
}

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Authorization
export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['callerRole'],
    queryFn: async () => {
      if (!actor) return 'guest';
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Stripe
export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ['isStripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}
