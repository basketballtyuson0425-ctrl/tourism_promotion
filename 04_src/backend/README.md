# backend

提出用デモの裏側で使う、最小構成のAPIサーバーです。

現時点では、APIキー未設定の場合は次の2種類のデータをJSONで返します。

- YouTube APIで使う予定の検索語
- `04_src/data/ideas.yaml` に保存している発信案

APIキーを設定した場合は、YouTube Data API から動画検索結果も取得できます。

## 起動方法

```bash
npm install
npm start
```

起動後、以下のURLで確認できます。

```text
http://localhost:3001/health
http://localhost:3001/api/youtube/status
http://localhost:3001/api/youtube/search-terms?area=ise
http://localhost:3001/api/youtube/search-terms?area=miyajima
http://localhost:3001/api/youtube/videos?area=ise&maxResults=5
http://localhost:3001/api/youtube/videos?area=ise&maxResults=5&save=true
http://localhost:3001/api/youtube/videos?area=ise&maxResults=5&allTerms=true&termLimit=6&save=true
http://localhost:3001/api/youtube/videos/saved?area=ise
http://localhost:3001/api/youtube/videos/summary?area=ise
http://localhost:3001/api/ideas
http://localhost:3001/api/ideas/csv
```

## 動作確認手順

バックエンドを起動したあと、ブラウザで以下を順番に開きます。

| 確認URL | 確認すること |
|---|---|
| `http://localhost:3001/health` | サーバーが起動していること |
| `http://localhost:3001/api/youtube/status` | YouTube APIキーの設定状態を確認できること |
| `http://localhost:3001/api/youtube/search-terms?area=ise` | 伊勢志摩の検索語をJSONで取得できること |
| `http://localhost:3001/api/youtube/search-terms?area=miyajima` | 宮島の検索語をJSONで取得できること |
| `http://localhost:3001/api/youtube/videos?area=ise&maxResults=5` | APIキー設定時にYouTube動画検索結果を取得できること |
| `http://localhost:3001/api/youtube/videos?area=ise&maxResults=5&save=true` | 取得した動画データをJSONファイルに保存できること |
| `http://localhost:3001/api/youtube/videos?area=ise&maxResults=5&allTerms=true&termLimit=6&save=true` | 複数検索語で取得した動画データを保存できること |
| `http://localhost:3001/api/youtube/videos/saved?area=ise` | 保存済み動画データを取得できること |
| `http://localhost:3001/api/youtube/videos/summary?area=ise` | 保存済み動画データの集計を取得できること |
| `http://localhost:3001/api/ideas` | 発信案データをJSONで取得できること |
| `http://localhost:3001/api/ideas/csv` | 発信案データをCSVで取得できること |

コードの文法だけ確認する場合は、以下を実行します。

```bash
npm run check
```

URLを開いてJSONが表示され、`npm run check` でエラーが出なければ、最小構成のバックエンドは確認済みとします。

`/api/youtube/videos` は、`YOUTUBE_API_KEY` が未設定の場合は 503 を返します。これは、APIキーなしで外部接続しないための想定どおりの動きです。

`save=true` を付けて取得した動画データは、`04_src/data/youtube/` にJSONファイルとして保存します。

`allTerms=true` を付けると、地域ごとの検索語を複数使って取得します。`termLimit` で使う検索語数を調整できます。

## 環境変数

`.env.example` を参考に `.env` を作成します。

```env
PORT=3001
YOUTUBE_API_KEY=your_youtube_api_key_here
```

`.env` はローカル専用で、GitHubには公開しません。

## 今後の予定

次の段階で、取得した動画情報を画面表示や集計処理につなげます。
