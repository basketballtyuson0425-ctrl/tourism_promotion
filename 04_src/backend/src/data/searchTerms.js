export const searchTermsByArea = {
  ise: {
    area: "ise",
    label: "伊勢志摩",
    purpose: "分析対象の中心地域",
    terms: [
      { keyword: "Ise Shima travel", intent: "海外旅行者向けの全体的な旅行動画を拾う" },
      { keyword: "Ise Jingu travel", intent: "伊勢神宮を中心にした文化観光動画を拾う" },
      { keyword: "Ise Grand Shrine travel", intent: "英語圏で使われやすい表記を拾う" },
      { keyword: "Ise Shima food", intent: "食文化、海鮮、食べ歩き動画を拾う" },
      { keyword: "Ama divers Ise Shima", intent: "海女文化に関する動画を拾う" },
      { keyword: "Ago Bay cruise", intent: "英虞湾、海景観、クルーズ系の動画を拾う" },
      { keyword: "Ise Shima itinerary", intent: "旅行計画、周遊ルート系の動画を拾う" },
      { keyword: "Mie Japan travel Ise", intent: "三重県旅行の中で伊勢を扱う動画を拾う" },
      { keyword: "Ise Shima National Park", intent: "国立公園、自然景観系の動画を拾う" },
      { keyword: "Okage Yokocho food", intent: "おかげ横丁、食べ歩き、街歩き動画を拾う" },
      { keyword: "伊勢志摩 観光", intent: "日本語動画も参考として拾う" },
      { keyword: "伊勢神宮 外国人 観光", intent: "訪日客視点の動画を拾う" }
    ]
  },
  miyajima: {
    area: "miyajima",
    label: "広島県（宮島）",
    purpose: "比較対象地域",
    terms: [
      { keyword: "Miyajima travel", intent: "宮島全体の旅行動画を拾う" },
      { keyword: "Itsukushima Shrine travel", intent: "厳島神社を中心にした文化観光動画を拾う" },
      { keyword: "Miyajima torii gate", intent: "海上鳥居、海景観の動画を拾う" },
      { keyword: "Miyajima food", intent: "牡蠣、あなごめしなど食文化動画を拾う" },
      { keyword: "Hiroshima Miyajima travel", intent: "広島市内から宮島への周遊動画を拾う" },
      { keyword: "Miyajima ferry", intent: "アクセス、フェリー移動に関する動画を拾う" },
      { keyword: "Miyajima Island travel guide", intent: "宮島旅行ガイド系の動画を拾う" },
      { keyword: "Hiroshima Miyajima itinerary", intent: "広島と宮島の周遊ルート動画を拾う" },
      { keyword: "Itsukushima Shrine Japan travel", intent: "厳島神社を訪日旅行の文脈で扱う動画を拾う" },
      { keyword: "Miyajima day trip", intent: "日帰り観光、短時間滞在の動画を拾う" },
      { keyword: "宮島 観光", intent: "日本語動画も参考として拾う" },
      { keyword: "厳島神社 外国人 観光", intent: "訪日客視点の動画を拾う" }
    ]
  }
};
