# YouTube API データ取得計画

## 1. この資料の目的

現在の提出用デモは、`04_src/frontend/script.js` に書かれている固定データを画面に表示している。

今後、実データに近づける場合は、YouTube Data API を使って動画情報やコメント情報を取得し、現在の画面に入っている固定値を置き換える。

この資料では、フロント画面のどこにデータが表示されているかを整理し、それぞれに対してどのようなデータを取得すべきかを計画する。

## 2. 現在のフロント側データ出力箇所

対象ファイル:

- `04_src/frontend/index.html`
- `04_src/frontend/script.js`

現在は、主に `script.js` 内の以下の固定データを使っている。

| 固定データ | 用途 |
|---|---|
| `iseData` | 伊勢志摩側の動画数、好意的反応、注目テーマ、キーワード、観光テーマ |
| `miyajimaData` | 宮島側の比較用データ |
| `targetMarkets` | 中国・台湾・韓国・米国・香港の対象市場と言語。ここは分析前提として固定値で扱う |
| `ideas` | 現在は固定値。今後はユーザー入力で追加・編集し、YAMLファイルに保存する |
| `renderCompare()` 内の `rows` | 伊勢志摩と宮島の比較表 |

画面への出力箇所は以下。

| 画面 | HTML側の表示ID / 領域 | JS側の処理 | 現在表示している内容 |
|---|---|---|---|
| 概況 | `#videoCount` | `renderDashboard()` | 分析対象動画数 |
| 概況 | `#targetMarketCount` | `renderDashboard()` | 対象市場数 |
| 概況 | `#positiveRate` | `renderDashboard()` | 好意的な反応の割合 |
| 概況 | `#growthTopic` | `renderDashboard()` | 伸びているテーマ |
| 概況 | `#marketList` | `renderMarkets()` | 対象市場と言語 |
| 概況 | `#keywordList` | `renderDashboard()` | 人気キーワード |
| 概況 | `#themeBars` | `renderDashboard()` | 文化・自然・食などのテーマ別スコア |
| キーワード | `#keywordDetailList` | `renderKeywordDetails()` | キーワードごとの説明 |
| キーワード | `#languageList` | `renderMarkets()` | 対象市場ごとの分析対象言語 |
| 地域比較 | `#compareTable` | `renderCompare()` | 伊勢志摩と宮島の比較表 |
| 発信案 | `#recommendTitle`, `#recommendText` | `renderIdea()` | おすすめ発信案 |
| 発信案 | `#ideaCards` | `renderIdeaCards()` | 発信案カード一覧 |

## 3. YouTube API で取得すべきデータ

### 3.1 動画検索データ

目的:

伊勢志摩、宮島に関する観光動画を集める。

使用候補:

- `search.list`

取得したい主な項目:

| 項目 | 用途 |
|---|---|
| `videoId` | 後続の動画詳細取得に使う |
| `title` | キーワード分析に使う |
| `description` | 観光テーマ、言語判定、訴求内容の分析に使う |
| `channelId` | 投稿者・チャンネル情報の取得に使う |
| `channelTitle` | 人気アカウント候補の把握に使う |
| `publishedAt` | 投稿時期、最近の傾向を見るために使う |
| `thumbnails` | 将来、動画カードを表示する場合に使う |

検索条件の例:

| 地域 | 検索語の例 |
|---|---|
| 伊勢志摩 | `Ise Shima travel`, `Ise Jingu travel`, `伊勢志摩 観光`, `伊勢神宮 travel`, `Ama divers Ise` |
| 宮島 | `Miyajima travel`, `Itsukushima Shrine travel`, `宮島 観光`, `Hiroshima Miyajima travel` |

対象市場別の検索補助:

| 市場 | 検索・判定に使う言語 |
|---|---|
| 中国 | 中国語（簡体字） |
| 台湾 | 中国語（繁体字） |
| 韓国 | 韓国語 |
| 米国 | 英語 |
| 香港 | 中国語（繁体字）、広東語表現 |

注意点:

`search.list` は動画IDを探す入口として使う。検索結果そのものは詳細な動画データではないため、動画数・再生数・コメント数などは次の `videos.list` で取得する。

### 3.2 動画詳細データ

目的:

動画ごとの再生数、いいね数、コメント数などを取得し、画面の数値に使う。

使用候補:

- `videos.list`

取得したい主な項目:

| 項目 | 用途 |
|---|---|
| `id` | 動画ID |
| `snippet.title` | キーワード分析 |
| `snippet.description` | 観光テーマ分析 |
| `snippet.tags` | キーワード分析 |
| `snippet.channelId` | チャンネル情報とのひも付け |
| `snippet.channelTitle` | 投稿者名の表示候補 |
| `snippet.publishedAt` | 投稿時期の分析 |
| `statistics.viewCount` | 人気度の判定 |
| `statistics.likeCount` | 好意的反応の推定 |
| `statistics.commentCount` | コメント分析対象の優先順位づけ |
| `contentDetails.duration` | 長尺・短尺の分類 |
| `topicDetails.topicCategories` | 動画テーマの補助判定 |

画面への対応:

| 画面表示 | 作り方 |
|---|---|
| 分析対象動画数 | 条件に合う動画ID数を集計 |
| 好意的な反応 | `likeCount / viewCount` やコメントの感情分類から算出 |
| 伸びているテーマ | 一定期間で増えているキーワード・タグを集計 |
| テーマ別スコア | タイトル、説明文、タグを文化・自然・食・交通などに分類 |
| 海外向け動画発信数 | 対象言語で書かれた動画、または海外向け検索語で取得された動画数を集計 |

### 3.3 コメントデータ

目的:

旅行者が何に反応しているかを把握する。

使用候補:

- `commentThreads.list`

取得したい主な項目:

| 項目 | 用途 |
|---|---|
| `videoId` | どの動画へのコメントかを判定 |
| `topLevelComment.snippet.textOriginal` | キーワード分析、感情分析 |
| `topLevelComment.snippet.likeCount` | 反応の強いコメントの把握 |
| `topLevelComment.snippet.publishedAt` | 最近の反応かどうかを見る |
| `totalReplyCount` | 議論が起きているコメントの把握 |

保存しない方がよい項目:

- 投稿者名
- 投稿者のチャンネルID
- 個人を特定できる情報

理由:

今回の目的は個人分析ではなく、観光プロモーションの傾向分析であるため。コメント本文も、最終的には集計結果や代表的な傾向として扱う。

画面への対応:

| 画面表示 | 作り方 |
|---|---|
| 人気キーワード | コメント本文から頻出語を抽出 |
| キーワード詳細 | 頻出語と一緒に出る言葉を整理 |
| 好意的な反応 | コメント本文をポジティブ・中立・ネガティブに分類 |
| 発信案 | 多く反応されているテーマから作成 |

### 3.4 チャンネルデータ

目的:

人気観光系アカウントや、影響力のある投稿者を把握する。

使用候補:

- `channels.list`

取得したい主な項目:

| 項目 | 用途 |
|---|---|
| `id` | チャンネルID |
| `snippet.title` | チャンネル名 |
| `snippet.country` | 投稿者地域の参考情報 |
| `statistics.subscriberCount` | 影響力の参考値 |
| `statistics.videoCount` | 投稿量の参考値 |
| `statistics.viewCount` | 累計視聴規模の参考値 |

注意点:

チャンネル情報は補助データとして扱う。今回のデモでは、まず動画単位・コメント単位の分析を優先する。

## 4. 画面ごとのデータ取得・加工プラン

### 4.1 概況ページ

必要なデータ:

- 対象地域に関する動画ID一覧
- 各動画の再生数、いいね数、コメント数
- タイトル、説明文、タグ
- コメント本文

加工方法:

1. `search.list` で地域名・観光地名・英語名などから動画IDを取得する
2. `videos.list` で動画詳細を取得する
3. 対象言語に合う動画を判定する
4. 動画数、好意的反応、伸びているテーマを集計する

### 4.2 キーワードページ

必要なデータ:

- 動画タイトル
- 動画説明文
- タグ
- コメント本文

加工方法:

1. テキストを言語別に分ける
2. 観光に関係する語を抽出する
3. 頻出語を集計する
4. 文化、自然、食、アクセスなどのテーマに分類する

### 4.3 地域比較ページ

必要なデータ:

- 伊勢志摩の動画データ
- 宮島の動画データ
- 両地域の動画数
- 両地域の海外向け動画数
- 両地域の好意的反応
- 両地域のアクセス関連コメント

加工方法:

1. 伊勢志摩と宮島で同じ条件の検索語を用意する
2. 同じ期間で動画を取得する
3. 同じ集計方法で数値化する
4. 差が出ている項目を比較表に表示する

### 4.4 発信案ページ

必要なデータ:

- 伸びているキーワード
- 好意的なコメントが多いテーマ
- 宮島と比べて弱い項目
- アクセス面の不安や質問
- ユーザーが入力した発信案
- 発信案の状態、優先度、対象市場

加工方法:

1. 反応が良いテーマを抽出する
2. 伊勢志摩で発信量が足りないテーマを抽出する
3. 「神社・海景観・食文化・アクセス」の組み合わせで発信案を生成する
4. 生成された発信案を、ユーザーが修正・追加できるようにする
5. 入力された発信案をYAMLファイルに保存する
6. 画面上では、発信案のタイトル、説明文、対象市場、優先度として表示する

### 4.5 発信案の入力・保存・出力

`targetMarkets` は固定値でよい。理由は、中国・台湾・韓国・米国・香港という対象市場は、今回の企画書内で選定済みの前提条件だからである。

一方で、`ideas` は固定値のままではなく、ユーザーが画面から入力・編集できるデータとして扱う。

想定する入力項目:

| 入力項目 | 内容 | 必須 |
|---|---|---|
| `title` | 発信案のタイトル | 必須 |
| `summary` | 発信案の説明 | 必須 |
| `targetMarket` | 対象市場。中国、台湾、韓国、米国、香港から選ぶ | 必須 |
| `theme` | 文化、自然、食、アクセスなどのテーマ | 必須 |
| `priority` | 優先度。高・中・低 | 必須 |
| `status` | 状態。案、検討中、採用、保留 | 必須 |
| `reason` | なぜこの案を出すのか | 任意 |
| `sourceKeywords` | 元になったキーワード | 任意 |
| `createdAt` | 作成日時 | 自動 |
| `updatedAt` | 更新日時 | 自動 |

保存形式:

- 優先度A: YAMLファイルに保存する
- 優先度B: JSONファイルでも読み込める構造にしておく
- 優先度C: CSV出力を追加する

YAMLを優先する理由:

- 人間が読んでも内容を確認しやすい
- ユーザーが考えた発信案を裏側で保存できる設計意図が伝わりやすい
- Gitで差分を見たときに、どの案が追加・変更されたか分かりやすい

CSV出力は、表計算ソフトで開いて確認したい場合に便利。ただし、発信案入力とYAML保存よりは優先度を下げる。

CSV出力で含める項目:

| CSV列 | 内容 |
|---|---|
| `title` | 発信案タイトル |
| `summary` | 説明 |
| `targetMarket` | 対象市場 |
| `theme` | テーマ |
| `priority` | 優先度 |
| `status` | 状態 |
| `reason` | 理由 |
| `sourceKeywords` | 元キーワード |
| `updatedAt` | 最終更新日時 |

## 5. 想定するデータ構造

フロントに渡すデータは、現在の `iseData` に近い形にまとめる。

```js
const areaAnalysis = {
  name: "伊勢志摩",
  videoCount: 1284,
  targetMarketCount: 5,
  positiveRate: 71,
  growthTopic: "海女体験",
  keywords: [
    {
      label: "伊勢神宮",
      sub: "日本文化・早朝参拝",
      score: "+24%",
      hint: "文化体験の入口として見せやすい"
    }
  ],
  themes: [
    { label: "文化", value: 78 },
    { label: "自然", value: 71 },
    { label: "食", value: 76 },
    { label: "交通・移動", value: 42 }
  ]
};
```

地域比較用は以下の形にする。

```js
const areaCompare = {
  rows: [
    ["項目", "伊勢志摩", "宮島"],
    ["分析対象動画", "1,284本", "2,460本"],
    ["海外向け動画発信数", "486本", "1,380本"],
    ["対象市場", "5市場", "5市場"],
    ["好意的な反応", "71%", "79%"]
  ]
};
```

発信案は、画面内の固定配列ではなく、YAMLファイルから読み込む想定にする。

保存先の例:

- `04_src/data/ideas.yaml`

YAMLの例:

```yaml
ideas:
  - id: idea-001
    title: 早朝の伊勢神宮と食体験を組み合わせた動画企画
    summary: 早朝参拝、周辺散策、海産物の食体験を1本の動画で見せる。
    targetMarket: 米国
    theme: 文化
    priority: 高
    status: 案
    reason: 文化体験と食体験は、海外旅行者に説明しやすい組み合わせであるため。
    sourceKeywords:
      - 伊勢神宮
      - 早朝参拝
      - 海鮮
    createdAt: 2026-05-27T00:00:00+09:00
    updatedAt: 2026-05-27T00:00:00+09:00
```

画面で使うときは、YAMLを読み込んで現在の `ideas` と同じような配列に変換する。

```js
const ideas = [
  {
    title: "早朝の伊勢神宮と食体験を組み合わせた動画企画",
    text: "早朝参拝、周辺散策、海産物の食体験を1本の動画で見せる。",
    target: "米国",
    priority: "高",
    status: "案"
  }
];
```

CSV出力は、YAML保存までできた後の追加機能とする。

処理の流れ:

1. ユーザーが発信案を入力する
2. 入力内容を画面上の一覧に追加する
3. 裏側で `ideas.yaml` に保存する
4. 必要に応じて `ideas.csv` として出力する

## 6. API取得の優先順位

### 優先度A: 最初に取得する

- 動画ID
- 動画タイトル
- 動画説明文
- 投稿日時
- チャンネル名
- 再生数
- いいね数
- コメント数

理由:

この情報だけで、動画数、人気動画、キーワード、地域比較の大部分が作れるため。

### 優先度B: 次に取得する

- コメント本文
- コメントのいいね数
- コメント投稿日時

理由:

旅行者の反応を読み取るために必要。ただし取得量が増えるため、まずは上位動画だけに絞る。

### 優先度C: 余裕があれば取得する

- チャンネル登録者数
- チャンネル累計再生数
- チャンネル投稿本数
- 発信案のCSV出力

理由:

人気アカウント分析やCSV出力は役立つが、今回のプロトタイプでは必須ではない。

### 発信案機能の優先順位

| 優先度 | 機能 | 理由 |
|---|---|---|
| A | 発信案の入力フォーム | ユーザーが自分の考えを残せるようにするため |
| A | YAML保存 | 入力した発信案を裏側データとして残すため |
| B | 保存済み発信案の一覧表示 | 入力した内容を画面で確認するため |
| C | CSV出力 | 表計算ソフトで確認できると便利だが、必須ではないため |

## 7. 取得件数の目安

最初の実装では、API利用量を抑えるために以下の範囲に絞る。

| 対象 | 件数の目安 |
|---|---:|
| 地域 | 伊勢志摩、宮島 |
| 検索語 | 各地域5〜8語 |
| 取得動画 | 各検索語 最大50件 |
| 詳細取得 | 重複除外後の動画 最大300件程度 |
| コメント取得 | 再生数またはコメント数が多い上位50動画 |
| コメント件数 | 1動画あたり最大100件 |

## 8. 実装時の注意点

- APIキーはフロントに直接書かない
- APIキーは `.env` などのローカル設定で管理する
- 取得したデータは一度JSONファイルなどに保存し、画面は保存済みデータを読む形にする
- 毎回APIを叩くのではなく、手動更新または日次更新を想定する
- コメントは個人情報を保存しない
- コメント本文を画面にそのまま大量表示せず、集計結果として表示する
- 検索結果には観光と関係ない動画も混ざるため、タイトル・説明文・タグで絞り込む
- YouTube APIには1日の利用上限があるため、検索回数を増やしすぎない

## 9. 公式ドキュメントで確認した前提

- YouTube Data API にはクォータがあり、デフォルトでは1日10,000ユニットが割り当てられる。
- `search.list` は1回100ユニットを消費する。
- `videos.list` は1回1ユニットを消費する。
- `commentThreads.list` は1回1ユニットを消費する。
- `videos.list` は `snippet`、`statistics`、`contentDetails` などの `part` を指定して動画情報を取得できる。
- `commentThreads.list` は `videoId` を指定して動画に紐づくコメントスレッドを取得できる。

参考URL:

- YouTube Data API Overview: https://developers.google.com/youtube/v3/getting-started
- Search: list: https://developers.google.com/youtube/v3/docs/search/list
- Videos: list: https://developers.google.com/youtube/v3/docs/videos/list
- CommentThreads: list: https://developers.google.com/youtube/v3/docs/commentThreads/list
- Channels: list: https://developers.google.com/youtube/v3/docs/channels/list
- Quota costs: https://developers.google.com/youtube/v3/determine_quota_cost?hl=ja

## 10. まとめ

現在の画面は固定データのモックである。

実データ化する場合は、まず `search.list` で動画IDを集め、`videos.list` で動画詳細を取得し、必要に応じて `commentThreads.list` でコメントを取得する。

最初から全データを大量に集めるのではなく、伊勢志摩と宮島に対象を絞り、5市場の対象言語に関係する動画・コメントを少量から集計するのが現実的である。

## 11. 現在の実装状況

バックエンドに、YouTube Data API の動画検索を試すための最小APIを追加した。

```text
GET /api/youtube/videos?area=ise&maxResults=5
```

現在の実装では、`area` に `ise` または `miyajima` を指定する。

`keyword` を指定しない場合は、その地域の検索条件の先頭にある検索語を使う。任意の検索語を使いたい場合は、設計資料で管理している検索語を `keyword` に指定する。

```text
GET /api/youtube/videos?area=ise&keyword=Ise%20Shima%20travel&maxResults=5
```

`YOUTUBE_API_KEY` が未設定の場合は、外部接続せず 503 を返す。これは、APIキーをフロント側に持たせないための想定どおりの動きである。

次の段階では、取得した動画検索結果を保存し、画面表示や集計処理につなげる。

## 12. 取得結果の保存と集計

YouTube APIから取得した動画検索結果は、`save=true` を付けたときにJSONファイルへ保存する。

```text
GET /api/youtube/videos?area=ise&maxResults=5&save=true
```

対象動画数を増やしたい場合は、`allTerms=true` を付けて複数の検索語を使う。

```text
GET /api/youtube/videos?area=ise&maxResults=5&allTerms=true&termLimit=6&save=true
```

`termLimit` は、使う検索語の数を指定する。検索回数が増えすぎるとYouTube APIの利用制限に当たりやすいため、最初は6語程度に抑える。

保存先:

```text
04_src/data/youtube/ise_videos.json
04_src/data/youtube/miyajima_videos.json
```

保存した動画データは、以下のAPIで読み出す。

```text
GET /api/youtube/videos/saved?area=ise
GET /api/youtube/videos/summary?area=ise
```

`/api/youtube/videos/summary` では、保存済み動画データから動画数、合計再生数、合計いいね数、合計コメント数、再生数上位の動画を返す。

画面側では、保存済み集計がある場合に概況ページの分析対象動画数へ反映する。

概況ページでは、画面をシンプルに保つため、保存済み動画データの詳細な反応数は表示しない。
