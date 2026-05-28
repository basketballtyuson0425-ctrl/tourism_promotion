# 伊勢観光分析

伊勢志摩のインバウンド観光促進を目的とした、観光UGC分析プロトタイプです。

本プロジェクトでは、YouTube上の旅行・観光コンテンツを分析対象とし、海外旅行者が伊勢志摩のどの観光資源に関心を持っているかを整理します。分析結果をもとに、自治体や観光担当者が次の情報発信を考えるための支援ツールとして企画しました。

## 課題テーマ

UGC分析とマーケティング戦略立案

## 企画の要点

- 対象地域は伊勢志摩
- 比較対象は広島県（宮島）
- 分析対象SNSはYouTube
- 対象ターゲットは米国
- 分析対象言語は英語
- 保存済みYouTube実データと最小バックエンドを用いたデモとして作成

## 伊勢志摩を選定した理由

伊勢志摩には、伊勢神宮、英虞湾、海産物など、海外旅行者にも訴求しやすい観光資源があります。

一方で、三重県全体のインバウンド回復は全国と比べて遅れが見られます。三重県資料では、2024年の外国人延べ宿泊者数は24.1万人、2019年比の回復率は62％、全国47位とされています。

そのため、観光資源は豊富だが、海外向けの発信やUGC拡散に改善余地がある地域として伊勢志摩を選びました。

## 比較対象を宮島にした理由

広島県（宮島）は、伊勢志摩と観光資源の性質が近い地域です。

- 神社を中心とした文化観光
- 海に面した景観
- 海鮮を含む食文化
- 目的地までのアクセスに手間がかかる点

リゾート型観光地よりも、宮島の方が伊勢志摩との比較対象として近いと考えました。

## デモの見方

提出用デモは以下のファイルから確認できます。

```text
04_src/frontend/index.html
```

ブラウザで `04_src/frontend/index.html` を開いてください。

デモには以下の4ページがあります。

- 概況
- キーワード
- 地域比較
- 発信案

## バックエンドの起動方法

発信案データとYouTube検索条件をJSONで返す、最小構成のバックエンドを用意しています。

初回のみ、以下のコマンドでライブラリをインストールします。

```bash
cd 04_src/backend
npm install
```

起動する場合は、以下を実行します。

```bash
npm start
```

起動後、以下のURLで確認できます。

```text
http://localhost:3001/health
http://localhost:3001/api/youtube/status
http://localhost:3001/api/ideas
http://localhost:3001/api/ideas/csv
http://localhost:3001/api/youtube/search-terms?area=ise
http://localhost:3001/api/youtube/search-terms?area=miyajima
http://localhost:3001/api/youtube/videos?area=ise&maxResults=5
http://localhost:3001/api/youtube/videos?area=ise&allTerms=true&maxResults=5&save=true
http://localhost:3001/api/youtube/videos/saved?area=ise
http://localhost:3001/api/youtube/videos/summary?area=ise
http://localhost:3001/api/youtube/videos/engagement?area=ise
```

3001番ポートがすでに使われている場合は、既にバックエンドが起動している可能性があります。

詳しい確認手順は `04_src/backend/README.md` にまとめています。

## 主なファイル構成

```text
01_要件定義/       要件定義関連の資料
02_基本設計/       基本設計関連の資料
03_詳細設計/       詳細設計関連の資料
04_src/frontend/   提出用デモ
04_src/backend/    最小構成のAPIサーバー
04_src/data/       発信案と保存済みYouTube実データ
05_テスト/         テスト関連資料
06_その他/         参考資料など
screens/           参考画面モック
uploads/           画面モック用の画像素材
design-canvas.jsx  画面モック確認用ファイル
theme.jsx          画面モック用テーマ設定
tweaks-panel.jsx   画面モック調整用ファイル
.design-canvas.state.json  画面モック確認用の状態ファイル
企画書.md          企画内容の説明資料
AGENT.md           AI作業用の公開ガイド
```

## 使用技術

- HTML
- CSS
- JavaScript
- Node.js
- Express

画面側は、基本的なHTML・CSS・JavaScriptで構成しています。
バックエンド側は、Node.js と Express を使った最小構成です。

## 今回の実装範囲

今回の提出では、以下を実装しています。

- 観光UGC分析ダッシュボードの画面
- 対象市場と言語の表示
- 伊勢志摩と宮島の比較表示
- 人気キーワードの表示
- 観光テーマ別の傾向表示
- 分析結果からの発信案表示
- 発信案データのバックエンドAPI化
- YouTube検索条件のAPI化
- YouTube APIによる動画検索、保存、集計
- 画面からのYouTubeデータ取得

## 今回は未実装の内容

以下は今後の改善案として扱います。

- コメント本文を使った詳細な感情・意見分析
- 定期実行による自動収集
- AIによる自動分析
- ログイン機能

今回のデモでは、YouTube APIで取得した保存済みデータを使い、どのデータを見て、どのように観光プロモーション施策につなげるかを示すことを優先しました。

## 参考資料

- JNTO「訪日外客数（2025年12月推計値）」  
  https://www.jnto.go.jp/news/press/20260121_monthly.html
- JNTO「訪日外客統計」  
  https://www.jnto.go.jp/statistics/data/visitors-statistics/
- 観光庁「インバウンド消費動向調査2025年暦年（速報）」  
  https://www.mlit.go.jp/kankocho/news02_00071.html
- 三重県「みえインバウンド誘客計画（仮称）中間案」  
  https://www.pref.mie.lg.jp/common/content/001253133.pdf
  
