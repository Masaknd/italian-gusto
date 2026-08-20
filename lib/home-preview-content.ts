import type { FeaturedMenu } from "./microcms/types";

export const homePreviewFeatured: FeaturedMenu[] = [
  { id: "preview-pasta", name: "グストのパスタ", description: "当店のパスタの麺は、淡路麺業様のパスタを使用しております。\nテレビでもたびたび紹介をされている好評パスタです！\n他のパスタとは一味違った当店自慢のパスタをぜひご堪能ください！\nクリームパスタとお召し上がりいただくと特に『もちもち』です！", image: { url: "/images/pasta1.png", width: 1692, height: 1685 }, sortOrder: 1, isAvailable: true },
  { id: "preview-pizza", name: "ピザ・マルゲリータ", description: "香ばしく焼き上げた生地に、トマトとモッツァレラ、バジルをのせたシンプルな一枚です。\n素材それぞれの味わいと、もちっとした生地の食感をお楽しみください。", image: { url: "/images/pizza1.png", width: 1692, height: 1856 }, sortOrder: 2, isAvailable: true },
  { id: "preview-sausage", name: "海老のソーセージ", description: "海老の旨みをぎゅっと閉じ込め、香ばしく焼き上げた自家製ソーセージです。\n熱々のスキレットで、ぷりっとした食感と豊かな香りをお楽しみください。", image: { url: "/images/sausages.png", width: 1448, height: 1855 }, sortOrder: 3, isAvailable: true },
];
