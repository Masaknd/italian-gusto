export const siteConfig = {
  name: "Gusto Italian Bar",
  address: "〒536-0007 大阪府大阪市城東区成育5丁目23-17 関目レジャービル1階",
  phone: "06-6180-6059",
  phoneHref: "tel:+81661806059",
  lunchHours: "12:00～15:00",
  dinnerHours: "17:00～23:00（L.O 22:30）",
  hours: "12:00～15:00 / 17:00～23:00（L.O 22:30）",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Gusto%20Italian%20Bar%20%E5%A4%A7%E9%98%AA%E5%B8%82%E5%9F%8E%E6%9D%B1%E5%8C%BA%E6%88%90%E8%82%B25%E4%B8%81%E7%9B%AE23-17",
  mapEmbedUrl: "https://www.google.com/maps?q=Gusto%20Italian%20Bar%20%E5%A4%A7%E9%98%AA%E5%B8%82%E5%9F%8E%E6%9D%B1%E5%8C%BA%E6%88%90%E8%82%B25%E4%B8%81%E7%9B%AE23-17&output=embed",
  reservationUrl: process.env.SELECTTYPE_RESERVATION_URL,
  socialUrl: "https://www.instagram.com/",
} as const;

export const taxConfig = {
  rate: 0.1,
  rounding: "round" as const,
} as const;

export function includingTax(priceExcludingTax: number) {
  const amount = priceExcludingTax * (1 + taxConfig.rate);
  return taxConfig.rounding === "round" ? Math.round(amount) : amount;
}
