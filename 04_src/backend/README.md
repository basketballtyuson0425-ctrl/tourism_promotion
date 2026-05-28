# backend

提出用デモの裏側で使う、最小構成のAPIサーバーです。

現時点では本物のYouTube APIには接続せず、次の2種類のデータをJSONで返します。

- YouTube APIで使う予定の検索語
- `04_src/data/ideas.yaml` に保存している発信案

## 起動方法

```bash
npm install
npm start
```

起動後、以下のURLで確認できます。

```text
http://localhost:3001/health
http://localhost:3001/api/youtube/search-terms?area=ise
http://localhost:3001/api/youtube/search-terms?area=miyajima
http://localhost:3001/api/ideas
```

## 動作確認手順

バックエンドを起動したあと、ブラウザで以下を順番に開きます。

| 確認URL | 確認すること |
|---|---|
| `http://localhost:3001/health` | サーバーが起動していること |
| `http://localhost:3001/api/youtube/status` | YouTube APIキーの設定状態を確認できること |
| `http://localhost:3001/api/youtube/search-terms?area=ise` | 伊勢志摩の検索語をJSONで取得できること |
| `http://localhost:3001/api/youtube/search-terms?area=miyajima` | 宮島の検索語をJSONで取得できること |
| `http://localhost:3001/api/ideas` | 発信案データをJSONで取得できること |

コードの文法だけ確認する場合は、以下を実行します。

```bash
npm run check
```

URLを開いてJSONが表示され、`npm run check` でエラーが出なければ、最小構成のバックエンドは確認済みとします。

## 環境変数

`.env.example` を参考に `.env` を作成します。

```env
PORT=3001
YOUTUBE_API_KEY=your_youtube_api_key_here
```

`.env` はローカル専用で、GitHubには公開しません。

## 今後の予定

次の段階で、`youtubeClient.js` に本物のYouTube Data API呼び出しを追加します。
