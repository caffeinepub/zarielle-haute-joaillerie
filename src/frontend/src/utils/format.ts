// Format price in INR with proper thousand separators
export function formatINR(amountInPaisa: bigint | number): string {
  const amount = typeof amountInPaisa === 'bigint' ? Number(amountInPaisa) : amountInPaisa;
  const rupees = amount / 100;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}

// Format price for display with "From ₹X,XX,XXX" format
export function formatPriceFrom(amountInPaisa: bigint | number): string {
  return `From ${formatINR(amountInPaisa)}`;
}

// Format timestamp (bigint nanoseconds) to readable date
export function formatDate(timestamp: bigint): string {
  const milliseconds = Number(timestamp) / 1_000_000;
  return new Date(milliseconds).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format timestamp to date and time
export function formatDateTime(timestamp: bigint): string {
  const milliseconds = Number(timestamp) / 1_000_000;
  return new Date(milliseconds).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Format weight in grams
export function formatWeight(grams: number): string {
  return `${grams.toFixed(2)}g`;
}

// Get metal type display name
export function getMetalTypeName(metalType: string): string {
  switch (metalType) {
    case 'gold18K':
      return '18K Gold';
    case 'gold22K':
      return '22K Gold';
    case 'gold24K':
      return '24K Gold';
    default:
      return metalType;
  }
}

// Get collection display name
export function getCollectionName(collection: string): string {
  switch (collection) {
    case 'royalBridal':
      return 'Royal Bridal';
    case 'templeGrandeur':
      return 'Temple Grandeur';
    case 'diamondCouture':
      return 'Diamond Couture';
    case 'limitedEditions':
      return 'Limited Editions';
    default:
      return collection;
  }
}

// Get collection route
export function getCollectionRoute(collection: string): string {
  return `/collections/${collection}`;
}

// Get product route
export function getProductRoute(productId: bigint | number): string {
  return `/product/${productId}`;
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
