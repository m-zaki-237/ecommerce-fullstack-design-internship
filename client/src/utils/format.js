export const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

export const formatPriceShort = (price) => `$${Number(price).toFixed(2)}`;

export const clsx = (...classes) => classes.filter(Boolean).join(" ");
