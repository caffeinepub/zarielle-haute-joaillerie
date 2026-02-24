import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Blob "mo:core/Blob";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";

actor {
  include MixinStorage();

  type ProductCollection = {
    #royalBridal;
    #templeGrandeur;
    #diamondCouture;
    #limitedEditions;
  };

  type MetalType = { #gold18K; #gold22K; #gold24K };

  type ProductId = Nat;
  type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    collection : ProductCollection;
    basePrice : Nat;
    metalOptions : [MetalType];
    weightMin : Float;
    weightMax : Float;
    diamondCarat : ?Float;
    diamondClarity : ?Text;
    diamondColor : ?Text;
    diamondCut : ?Text;
    goldCertification : Text;
    giaCertification : Text;
    images : [Storage.ExternalBlob];
    stockQuantity : Nat;
    limitedEdition : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type GoldRates = {
    rate18K : Nat;
    rate22K : Nat;
    rate24K : Nat;
    lastUpdated : Time.Time;
  };

  type PriceBreakdown = {
    basePrice : Nat;
    metalType : MetalType;
    weight : Float;
    goldRate : Nat;
    makingCharges : Nat;
    gst : Nat;
    finalPrice : Nat;
  };

  type AppointmentId = Nat;
  type AppointmentStatus = { #pending; #confirmed; #completed; #cancelled };
  type AppointmentType = { #video; #inPerson };

  type Appointment = {
    id : AppointmentId;
    clientName : Text;
    email : Text;
    phone : Text;
    preferredDate : Time.Time;
    appointmentType : AppointmentType;
    productId : ?ProductId;
    status : AppointmentStatus;
    notes : Text;
    createdBy : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type CartItem = {
    id : Nat;
    productId : ProductId;
    metalType : MetalType;
    weight : Float;
    quantity : Nat;
    customizations : Text;
  };

  type OrderId = Nat;
  type OrderStatus = { #pending; #confirmed; #processing; #shipped; #delivered };

  type Order = {
    id : OrderId;
    customerName : Text;
    email : Text;
    phone : Text;
    address : Text;
    items : [CartItem];
    totalPrice : ?PriceBreakdown;
    paymentStatus : Text;
    status : OrderStatus;
    giftWrapping : Bool;
    engravingText : Text;
    createdBy : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type ClientId = Nat;
  type Client = {
    id : ClientId;
    name : Text;
    email : Text;
    phone : Text;
    address : Text;
    purchaseHistory : [OrderId];
    createdAt : Time.Time;
  };

  public type Testimonial = {
    id : Nat;
    clientName : Text;
    rating : Nat;
    comment : Text;
    createdAt : Time.Time;
  };

  public type LookbookImage = {
    id : Nat;
    image : Storage.ExternalBlob;
    caption : Text;
    createdAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  // Storage
  let products = Map.empty<ProductId, Product>();
  let appointments = Map.empty<AppointmentId, Appointment>();
  let orders = Map.empty<OrderId, Order>();
  let clients = Map.empty<ClientId, Client>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Persistent IDs
  var nextProductId : ProductId = 1;
  var nextAppointmentId : AppointmentId = 1;
  var nextOrderId : OrderId = 1;
  var nextClientId : ClientId = 1;

  // Pricing and content
  var goldRates : ?GoldRates = null;
  var craftsmanshipStory : Text = "";
  var ethicalSourcingInfo : Text = "";

  // Access Control State
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return null;
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      return null;
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return;
    };
    userProfiles.add(caller, profile);
  };

  // Product Catalog Functions
  public shared ({ caller }) func createProduct(product : Product) : async ProductId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return 0;
    };
    let newProduct = {
      product with
      id = nextProductId;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    products.add(newProduct.id, newProduct);
    nextProductId += 1;
    newProduct.id;
  };

  public query ({ caller }) func listProducts(collection : ?ProductCollection) : async [Product] {
    let result = products.values().toArray();
    switch (collection) {
      case (?value) { result.filter(func(p) { p.collection == value }) };
      case (null) { result };
    };
  };

  public query ({ caller }) func getProductById(id : ProductId) : async ?Product {
    products.get(id);
  };

  public shared ({ caller }) func updateProduct(updatedProduct : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    switch (products.get(updatedProduct.id)) {
      case (null) { () };
      case (?_existingProduct) {
        let product = {
          updatedProduct with
          updatedAt = Time.now();
        };
        products.add(product.id, product);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    switch (products.get(id)) {
      case (null) { () };
      case (?_product) {
        products.remove(id);
      };
    };
  };

  public shared ({ caller }) func toggleLimitedEdition(productId : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    switch (products.get(productId)) {
      case (null) { () };
      case (?product) {
        let updated = {
          product with
          limitedEdition = not product.limitedEdition;
          updatedAt = Time.now();
        };
        products.add(productId, updated);
      };
    };
  };

  public shared ({ caller }) func updateProductStock(productId : ProductId, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    switch (products.get(productId)) {
      case (null) { () };
      case (?product) {
        let updated = {
          product with
          stockQuantity = quantity;
          updatedAt = Time.now();
        };
        products.add(productId, updated);
      };
    };
  };

  // Gold Rate Management
  public shared ({ caller }) func updateGoldRates(newRates : GoldRates) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    goldRates := ?{
      newRates with
      lastUpdated = Time.now();
    };
  };

  public query ({ caller }) func getGoldRates() : async ?GoldRates {
    goldRates;
  };

  // Price Calculator
  public query ({ caller }) func calculatePrice(productId : ProductId, metalType : MetalType, weight : Float, makingCharges : Nat, gst : Nat) : async ?PriceBreakdown {
    let product = switch (products.get(productId)) {
      case (null) { return null };
      case (?value) { value };
    };

    let currentRates = switch (goldRates) {
      case (null) { return null };
      case (?rates) { rates };
    };

    let goldRate = switch (metalType) {
      case (#gold18K) { currentRates.rate18K };
      case (#gold22K) { currentRates.rate22K };
      case (#gold24K) { currentRates.rate24K };
    };

    let weightInt : Int = Float.toInt(weight);

    let goldPrice = goldRate * Int.abs(weightInt);

    let finalPrice = product.basePrice + goldPrice + makingCharges + gst;
    ?{
      basePrice = product.basePrice;
      metalType;
      weight;
      goldRate;
      makingCharges;
      gst;
      finalPrice;
    };
  };

  // Appointments
  public shared ({ caller }) func createAppointment(appointment : Appointment) : async AppointmentId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return 0;
    };
    let newAppointment = {
      appointment with
      id = nextAppointmentId;
      createdBy = caller;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    appointments.add(newAppointment.id, newAppointment);
    nextAppointmentId += 1;
    newAppointment.id;
  };

  public query ({ caller }) func listAppointments(status : ?AppointmentStatus) : async [Appointment] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let array = appointments.values().toArray();

    let filtered = if (isAdmin) {
      array
    } else {
      array.filter(func(a) { a.createdBy == caller })
    };

    switch (status) {
      case (?value) { filtered.filter(func(a) { a.status == value }) };
      case (null) { filtered };
    };
  };

  public shared ({ caller }) func updateAppointmentStatus(id : AppointmentId, status : AppointmentStatus) : async () {
    switch (appointments.get(id)) {
      case (null) { () };
      case (?appointment) {
        if (caller != appointment.createdBy and not AccessControl.isAdmin(accessControlState, caller)) {
          return;
        };
        let updated = {
          appointment with
          status;
          updatedAt = Time.now();
        };
        appointments.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func cancelAppointment(id : AppointmentId) : async () {
    switch (appointments.get(id)) {
      case (null) { () };
      case (?appointment) {
        if (caller != appointment.createdBy and not AccessControl.isAdmin(accessControlState, caller)) {
          return;
        };
        await updateAppointmentStatus(id, #cancelled);
      };
    };
  };

  // Orders
  public shared ({ caller }) func createOrder(order : Order) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return 0;
    };
    let newOrder = {
      order with
      id = nextOrderId;
      createdBy = caller;
      createdAt = Time.now();
      updatedAt = Time.now();
    };
    orders.add(newOrder.id, newOrder);
    nextOrderId += 1;
    newOrder.id;
  };

  public query ({ caller }) func listOrders(status : ?OrderStatus) : async [Order] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let array = orders.values().toArray();

    let filtered = if (isAdmin) {
      array
    } else {
      array.filter(func(o) { o.createdBy == caller })
    };

    switch (status) {
      case (?value) { filtered.filter(func(o) { o.status == value }) };
      case (null) { filtered };
    };
  };

  public query ({ caller }) func getOrderById(id : OrderId) : async ?Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        if (caller != order.createdBy and not AccessControl.isAdmin(accessControlState, caller)) {
          return null;
        };
        ?order;
      };
    };
  };

  public shared ({ caller }) func updateOrderStatus(id : OrderId, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    switch (orders.get(id)) {
      case (null) { () };
      case (?order) {
        let updated = {
          order with
          status;
          updatedAt = Time.now();
        };
        orders.add(id, updated);
      };
    };
  };

  // Clients
  public query ({ caller }) func listClients() : async [Client] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return [];
    };
    clients.values().toArray();
  };

  public query ({ caller }) func getClientById(id : ClientId) : async ?Client {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return null;
    };
    clients.get(id);
  };

  // Content
  public shared ({ caller }) func updateCraftsmanshipStory(story : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    craftsmanshipStory := story;
  };

  public query ({ caller }) func getCraftsmanshipStory() : async Text {
    craftsmanshipStory;
  };

  public shared ({ caller }) func updateEthicalSourcingInfo(info : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    ethicalSourcingInfo := info;
  };

  public query ({ caller }) func getEthicalSourcingInfo() : async Text {
    ethicalSourcingInfo;
  };

  // Stripe integration
  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  var configuration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      return;
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { { secretKey = ""; allowedCountries = [] } };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      return "";
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };
};
