# KARTIFY — Full E-Commerce Website Clone

A complete online-shopping storefront UI — home page, category browsing with
filters and sorting, product detail pages, a cart drawer, checkout, and an
order confirmation screen. Original branding, fictional product catalog.

## Important — what this is (and isn't)
This is a **frontend UI/UX clone** of a shopping website. It has **no
backend, no payment gateway, no database, and no real inventory** — "Place
Order" saves an order record to `localStorage` and shows a confirmation
screen, it does not charge anyone or ship anything. All 21 products,
prices, and reviews are fictional. There are no real product photos —
each item uses a gradient "swatch" in place of a photograph (see
Customizing below for how to swap in real images).

## Files
- `index.html`
- `style.css`
- `script.js` — 21 fictional products across 6 categories, plus all
  browsing/filtering/cart/checkout logic

## How to use it
1. Keep all three files in the same folder.
2. Open `index.html` in a browser to preview, or upload all 3 files to any
   static host (GitHub Pages, Netlify, Vercel) — no backend required.

## What works
- **Home** — hero banner, category tiles, "Trending Now" and "Deals of the
  Day" rows
- **Shop / category browsing** — filter by category, price range, and
  minimum rating; sort by popularity, price, rating, or discount
- **Search** — filters products live by name or category
- **Product detail page** — quantity selector, Add to Cart / Buy Now,
  related products from the same category
- **Wishlist** — heart icon on every card, dedicated wishlist page
- **Cart drawer** — quantity +/-, remove item, subtotal, free-shipping
  threshold (₹999+)
- **Checkout** — shipping form with validation (10-digit phone, 6-digit
  pincode) and an order summary
- **Order confirmation** — generates an order ID, clears the cart

All cart, wishlist, and order-history data is saved in the browser's
`localStorage`, so it survives a page refresh but is local to that browser.

## Making it a real store
To actually sell through this, you'd need to add:
- A backend + database for real inventory and order storage
- A payment gateway (Razorpay, Stripe, etc.) at the checkout step
- Real product photography in place of the gradient swatches
- Authentication if you want real user accounts / order history

## Customizing the catalog
Open `script.js` and edit the `PRODUCTS` array near the top:
```js
{ id:22, name:'Your Product', category:'Fashion', price:999, mrp:1299,
  rating:4.5, reviews:50, hue:210, badge:'New', inStock:true,
  desc:'Product description here.' }
```
`hue` (0–360) controls that product's gradient color. To use a real photo
instead of a gradient, replace the `.p-image` / `.detail-image` background
style with an `<img>` tag pointing at your image file.

## Customizing the look
Colors and fonts are CSS variables at the top of `style.css`:
```css
:root{
  --brand:#2b3a67;   /* header, primary buttons */
  --accent:#ff6a4d;  /* Add to Cart, CTAs */
  --gold:#f5b942;    /* star ratings */
}
```

## Notes
- Fully responsive — filters stack above the grid and the search bar
  collapses on small screens.
- No frameworks or build tools required.
