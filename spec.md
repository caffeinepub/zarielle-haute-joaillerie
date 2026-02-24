# Zarielle Haute Joaillerie - Ultra-Premium Luxury Jewellery E-Commerce

## Current State

New project with default scaffolding. No existing product catalog, user system, or custom UI.

## Requested Changes (Diff)

### Add

**Brand Identity & Design System:**
- Brand: Zarielle Haute Joaillerie
- Tagline: "Eternal Brilliance. Timeless Power."
- Color palette: Deep Matte Black (primary), Metallic Champagne Gold (secondary), Soft Ivory (accent)
- Typography: High-end serif for headings, thin modern sans-serif for body
- Currency: INR (₹)

**Homepage Experience:**
- Transparent luxury navigation bar
- Fullscreen cinematic hero video (bridal gold slow-motion)
- Haute Collections section: Royal Bridal, Temple Grandeur, Diamond Couture, Limited Editions
- High Jewellery Lookbook (magazine-style layout)
- Craftsmanship Story section
- Gold Purity & Ethical Sourcing section
- Press & Awards showcase
- Private Appointment Booking section
- Premium client testimonials
- Elegant minimal footer

**Product Catalog System:**
- Product browsing by collection (Royal Bridal, Temple Grandeur, Diamond Couture, Limited Editions)
- Price range: ₹50,000 – ₹25,00,000+
- Product attributes: metal type (18K/22K/24K gold), weight, diamond specs, gold purity
- 4K product images with zoom capability
- 360° product spin views
- Gold purity badges (BIS Hallmark)
- Diamond certification badges (GIA)
- Limited stock indicators
- Live gold rate integration

**Product Detail Page:**
- Luxury slow reveal animation
- 4K zoom on product images
- 360° spin viewer
- Metal customization selector (18K / 22K / 24K)
- Weight customization preview
- Price breakdown display: base price, live gold rate, making charges, GST
- EMI calculator
- Private concierge contact CTA
- Appointment booking CTA
- Limited stock indicator
- Delivery insurance information
- Trust badges: BIS Hallmark, GIA Certification, Insured Shipping, Lifetime Exchange Promise, White-glove delivery

**Exclusive Premium Features:**
- Private appointment booking system (video consultation, in-person viewing)
- Gift concierge service
- Engraving customization options
- Premium gift wrapping preview
- High Jewellery Catalogue PDF download

**Shopping Experience:**
- Shopping cart with luxury presentation
- Guest checkout flow
- Payment integration (Stripe for premium cards)
- EMI calculator

**User Management:**
- Admin authentication system
- Role-based access (admin vs. customer)
- Client database for appointments

**Admin Panel:**
- Product management (add/edit/delete products)
- Dynamic gold rate update system
- Limited edition toggle
- Appointment management dashboard
- Client database viewer
- Order management
- Luxury analytics dashboard (sales, popular products, appointment bookings)
- Collection management
- Coupon/offer management

**Trust & Certification Display:**
- BIS Hallmark badge system
- GIA Certification badge system
- Insured Shipping guarantee
- Lifetime Exchange Promise
- White-glove delivery information

### Modify

- Replace default homepage with luxury editorial design
- Replace default color scheme with black/champagne gold/ivory luxury palette
- Replace default typography with high-end serif + thin sans-serif combination

### Remove

- Default placeholder content
- Generic UI components

## Implementation Plan

**Backend Implementation:**

1. **Product Catalog System:**
   - Product entity: name, description, collection type (Royal Bridal, Temple Grandeur, Diamond Couture, Limited Editions), base price, metal type options (18K/22K/24K), weight range, diamond specifications, gold purity, certification details, image URLs, stock status, limited edition flag
   - Collection browsing endpoints
   - Product detail retrieval with full customization options
   - Price calculation API: factor in live gold rate, metal type, weight, making charges, GST

2. **Gold Rate Management:**
   - Live gold rate storage (per gram for 18K/22K/24K)
   - Admin endpoint to update gold rates
   - Price calculation service

3. **Appointment Booking System:**
   - Appointment entity: client name, contact, preferred date/time, appointment type (video consultation, private viewing), product interest, status
   - Booking creation endpoint
   - Admin appointment management (view all, update status, cancel)

4. **Shopping Cart & Checkout:**
   - Cart management: add/remove products with customization selections
   - Cart price calculation with GST breakdown
   - Order creation with payment intent

5. **Admin Product Management:**
   - CRUD operations for products
   - Image upload via blob storage
   - Limited edition toggle
   - Stock management

6. **Client Database:**
   - Store client information from appointments and orders
   - Admin-only client list retrieval

7. **Analytics:**
   - Track sales data, popular products, appointment bookings
   - Admin analytics dashboard endpoints

8. **Authorization System:**
   - Admin role management
   - Protected admin endpoints
   - Customer authentication (optional for guest checkout)

**Frontend Implementation:**

1. **Design System Setup:**
   - Custom Tailwind config: black/champagne gold/ivory palette
   - High-end serif font (Playfair Display or Bodoni Moda)
   - Thin sans-serif (Inter Thin or Raleway Light)
   - Gold glow hover animations
   - Smooth fade transitions

2. **Homepage:**
   - Transparent luxury navigation (logo, Collections, Lookbook, Story, Appointments, Admin)
   - Fullscreen hero with video background (fallback to high-res image)
   - "Haute Collections" grid: 4 collection cards (Royal Bridal, Temple Grandeur, Diamond Couture, Limited Editions)
   - Lookbook section: magazine-style image grid
   - Craftsmanship Story: editorial text + imagery
   - Gold Purity & Ethical Sourcing: trust content
   - Press & Awards: logo grid or quotes
   - Appointment Booking CTA
   - Client testimonials carousel
   - Elegant footer: contact, policies, social

3. **Collection Pages:**
   - Filter by collection type
   - Product grid with hover effects (gold glow)
   - Product card: hero image, name, starting price, "Discover" CTA

4. **Product Detail Page:**
   - Image gallery: main image with 4K zoom, thumbnail strip, 360° spin button
   - Product info: name, collection, price breakdown
   - Customization panel: metal type selector, weight display
   - Price calculator: live updates based on selections
   - CTAs: "Request Private Viewing", "Book Consultation", "Add to Cart"
   - Trust badges row
   - Specifications accordion: dimensions, gold purity, diamond details, certifications
   - Engraving & gift options toggle
   - EMI calculator

5. **Shopping Cart:**
   - Luxury cart UI with product summary
   - Customization details per item
   - Price breakdown: subtotal, GST, total
   - Checkout CTA

6. **Checkout Flow:**
   - Guest checkout: name, email, phone, address
   - Payment integration (Stripe)
   - EMI option selector
   - Order confirmation with concierge contact info

7. **Appointment Booking:**
   - Booking form: name, email, phone, preferred date/time, appointment type (video/in-person), product interest (optional)
   - Confirmation message

8. **Admin Panel:**
   - Login page
   - Dashboard: analytics overview (total sales, orders, appointments, popular products)
   - Product Management: list all products, add new product form, edit/delete actions, image upload
   - Gold Rate Manager: input fields for 18K/22K/24K rates, update button
   - Appointment Manager: list all appointments with status filter, update status
   - Client Database: searchable client list
   - Order Management: order list with status updates

9. **Animations & Interactions:**
   - Page transitions: smooth fade-in
   - Scroll-triggered animations: fade-up for sections
   - Hover effects: gold glow on cards and buttons
   - Product reveal: slow fade + scale animation
   - Navigation: transparent on scroll-top, solid on scroll-down

10. **Responsive Design:**
    - Mobile-optimized luxury experience
    - Touch-friendly interactions
    - Adaptive typography scaling

## UX Notes

**Luxury Experience Principles:**
- Prioritize white space and breathing room over density
- Use slow, elegant animations (0.6s–1s transitions)
- Limit visual noise: no banners, pop-ups, or urgency tactics
- Present pricing with dignity: "From ₹2,50,000" rather than "₹2,50,000/-"
- Use editorial photography: high-contrast, dramatic lighting
- Maintain editorial tone: sophisticated, confident, understated

**Navigation Philosophy:**
- Minimal top-level categories (Collections, Lookbook, Story, Appointments)
- No mega-menus or dropdowns; keep it clean
- Sticky navigation with transparency on hero, solid on scroll

**Product Discovery:**
- Lead with imagery, not filters
- Show 6–8 products per row (desktop) for generous spacing
- Hover states should be subtle gold glow, not jarring transforms

**Trust Building:**
- Display certifications prominently but elegantly (small badge icons, not loud banners)
- Emphasize white-glove service, lifetime exchange, insured delivery
- Private appointments position the brand as exclusive, personal

**Conversion Path:**
- Primary CTA: "Request Private Viewing" (builds relationship)
- Secondary CTA: "Add to Cart" (for direct buyers)
- No aggressive urgency (e.g., "Only 2 left!"), use "Limited availability" instead

**Admin UX:**
- Clean dashboard with key metrics
- Quick actions for gold rate updates (luxury buyers are sensitive to daily gold fluctuations)
- Appointment management prioritized (high-touch sales model)
- Product management with drag-and-drop image reordering
