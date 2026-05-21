// W — Wireframes: フレームワークレベルの画面設計 (参考画像のスタイル)
// 構造と情報の配置のみを示す。色・スタイルは後工程で。

// ───── 共通スタイル / ヘルパー ─────────────────────────────
const WF = {
  bg:      '#fcfbf6',           // 紙のような薄いベージュ
  grid:    '#e7e3d6',           // グリッド線
  ink:     '#1a1a1a',           // 主要文字
  line:    '#7d7d7d',           // 枠線 中
  line2:   '#bfbfbf',           // 枠線 細
  fillD:   '#9a9a9a',           // 濃いめのグレー (CTA/Header)
  fill:    '#cfcfcf',           // 標準のグレー (画像枠)
  fillL:   '#e6e6e6',           // 薄いグレー (背景セクション)
  fillXL:  '#f1f1f1',           // 最薄
  textBar: '#a8a8a8',           // テキストを模した bar
  sans: '"Noto Sans JP", "Hiragino Sans", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// グリッド付き紙の背景
function WFPaper({ children, w = 1440, h = 900, code }) {
  return (
    <div style={{
      width: w, height: h, background: WF.bg,
      backgroundImage: `linear-gradient(${WF.grid} 1px, transparent 1px), linear-gradient(90deg, ${WF.grid} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      position: 'relative', fontFamily: WF.sans, color: WF.ink,
      overflow: 'hidden',
    }}>
      {/* 紙の隅: ファイル名コーナーラベル */}
      <div style={{
        position: 'absolute', top: 8, right: 12,
        fontSize: 10, color: WF.line, fontFamily: WF.mono, letterSpacing: 1,
      }}>{code}</div>
      {/* マージン: 紙の周りに白い余白 */}
      <div style={{
        position: 'absolute', inset: 24, background: '#fff',
        border: `1px solid ${WF.line}`, display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}

// 画像プレースホルダ (×印付き)
function WFImage({ label = 'イメージ画像', height, style }) {
  return (
    <div style={{
      background: WF.fill, border: `1px solid ${WF.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', height, color: '#fff', fontSize: 13,
      ...style,
    }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55,
      }}>
        <line x1="0" y1="0" x2="100" y2="100" stroke="#fff" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#fff" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span style={{ position: 'relative', letterSpacing: 1 }}>{label}</span>
    </div>
  );
}

// テキストを模した灰色のバー
function WFBars({ lines = 3, width = '100%', last = '70%', size = 8, gap = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap, width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{
          height: size, background: WF.textBar, borderRadius: 1,
          width: i === lines - 1 ? last : '100%',
        }} />
      ))}
    </div>
  );
}

// セクション見出し (中央)
function WFSectionTitle({ en, ja }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 14 }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1, color: WF.ink }}>{en}</div>
      <div style={{ fontSize: 11, color: WF.line, marginTop: 2, letterSpacing: 2 }}>{ja}</div>
    </div>
  );
}

// 注釈ラベル (壊さない範囲で、設計意図を書き入れる)
function WFNote({ children, style }) {
  return (
    <div style={{
      position: 'absolute', fontFamily: WF.mono, fontSize: 9.5, color: WF.line,
      letterSpacing: 0.5, ...style,
    }}>{children}</div>
  );
}

// 共通: ヘッダー (ロゴ + ナビ)
function WFHeader({ title = '企業ロゴ', nav = ['会社概要','事業内容','ニュース','お問い合わせ'] }) {
  return (
    <div style={{
      borderBottom: `1px solid ${WF.line}`, padding: '12px 22px',
      display: 'flex', alignItems: 'center', gap: 14, background: '#fff',
    }}>
      <div style={{
        padding: '5px 12px', border: `1px solid ${WF.line2}`, background: WF.fillXL,
        fontSize: 11, color: WF.line,
      }}>{title}</div>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', gap: 18, fontSize: 11, color: WF.line }}>
        {nav.map(n => <span key={n}>{n}</span>)}
      </div>
    </div>
  );
}

// 共通: フッター
function WFFooter() {
  return (
    <div style={{
      borderTop: `1px solid ${WF.line2}`, padding: '12px 22px',
      display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, color: WF.line, background: '#fff',
    }}>
      <div style={{
        padding: '4px 10px', border: `1px solid ${WF.line2}`, background: WF.fillXL,
      }}>企業ロゴ</div>
      <div>会社概要 · 事業内容 · ニュース · お問い合わせ · プライバシーポリシー</div>
      <div style={{ flex: 1 }} />
      <span>コピーライト</span>
    </div>
  );
}

// アプリ画面用: 左サイドバー (グレーボックスのリスト)
function WFSidebar({ active = 0 }) {
  const items = [
    '今週のあらまし', '旅行者の動画', '動画の中身', '他観光地と比べる', '地図で見る',
    null, // separator
    '使い方を学ぶ', '資料をつくる', '動画の取り込み', '設定',
  ];
  return (
    <div style={{
      width: 188, background: WF.fillXL, borderRight: `1px solid ${WF.line2}`,
      padding: '14px 0', display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{
        margin: '0 14px 16px', padding: '8px 10px', border: `1px solid ${WF.line2}`,
        background: '#fff', fontSize: 11, color: WF.line, textAlign: 'center',
      }}>サービスロゴ</div>
      {items.map((it, i) => it === null ? (
        <div key={i} style={{ height: 1, margin: '8px 14px', background: WF.line2 }} />
      ) : (
        <div key={i} style={{
          margin: '0 8px', padding: '7px 10px',
          background: i === active ? WF.fillD : 'transparent',
          color: i === active ? '#fff' : WF.line,
          fontSize: 11.5, letterSpacing: 0.5,
        }}>{it}</div>
      ))}
    </div>
  );
}

// アプリ画面用: トップバー
function WFAppTopbar({ title, crumbs, actions = ['絞り込み','資料に出す'] }) {
  return (
    <div style={{
      borderBottom: `1px solid ${WF.line2}`, padding: '10px 18px',
      display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
    }}>
      <div>
        {crumbs && <div style={{ fontSize: 10, color: WF.line, marginBottom: 1 }}>{crumbs}</div>}
        <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        height: 28, padding: '0 10px', border: `1px solid ${WF.line2}`, background: WF.fillXL,
        display: 'flex', alignItems: 'center', fontSize: 10.5, color: WF.line, gap: 6, width: 200,
      }}>🔍 検索</div>
      {actions.map(a => (
        <div key={a} style={{
          padding: '6px 12px', border: `1px solid ${WF.line2}`, background: '#fff',
          fontSize: 11, color: WF.line,
        }}>{a}</div>
      ))}
      <div style={{
        padding: '6px 14px', background: WF.fillD, color: '#fff', fontSize: 11,
      }}>資料を出す</div>
    </div>
  );
}

// 単純なボックス (ラベル付き)
function WFBox({ label, height, children, style }) {
  return (
    <div style={{
      border: `1px solid ${WF.line2}`, background: '#fff', position: 'relative',
      height, padding: 10, display: 'flex', flexDirection: 'column', ...style,
    }}>
      {label && <div style={{ fontSize: 10, color: WF.line, marginBottom: 6, letterSpacing: 0.5 }}>{label}</div>}
      {children}
    </div>
  );
}

Object.assign(window, { WF, WFPaper, WFImage, WFBars, WFSectionTitle, WFNote, WFHeader, WFFooter, WFSidebar, WFAppTopbar, WFBox });

// ═══════════════════════════════════════════════════════════════════
// W1 — ログイン  (参考画像の "コーポレートサイト" スタイルに最も近い)
// ═══════════════════════════════════════════════════════════════════
function WireLogin() {
  return (
    <WFPaper code="W-01 / LOGIN">
      <WFHeader />
      {/* Hero */}
      <div style={{ padding: '32px 60px 24px', borderBottom: `1px solid ${WF.line2}`, background: WF.fillXL }}>
        <WFSectionTitle en="キャッチコピー" ja="サブテキスト" />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
          <div style={{
            padding: '12px 40px', background: WF.fillD, color: '#fff', fontSize: 13, letterSpacing: 1,
          }}>ログイン</div>
        </div>
      </div>

      {/* About: 2カラム */}
      <div style={{ padding: '24px 60px' }}>
        <WFSectionTitle en="About" ja="サービス紹介" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 28, marginTop: 16 }}>
          <WFBox style={{ background: WF.fillL, padding: 18 }}>
            <div style={{ fontSize: 11, color: WF.ink, marginBottom: 10, fontWeight: 600 }}>テキストが入ります</div>
            <WFBars lines={6} size={6} last="60%" />
            <div style={{ flex: 1 }} />
            <div style={{
              marginTop: 14, alignSelf: 'flex-end',
              padding: '6px 16px', background: WF.fillD, color: '#fff', fontSize: 10.5,
            }}>ボタン</div>
          </WFBox>
          <WFImage height={170} />
        </div>
      </div>

      {/* Login form: フォーム + 補足 (2カラム) */}
      <div style={{ padding: '8px 60px 24px', flex: 1 }}>
        <WFSectionTitle en="Sign In" ja="ログイン" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, marginTop: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <WFBox label="メールアドレス" height={40} />
            <WFBox label="パスワード" height={40} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: WF.line }}>
              <span>□ このパソコンを覚えておく</span>
              <span>パスワードを忘れた</span>
            </div>
            <div style={{ padding: '12px 0', background: WF.fillD, color: '#fff', textAlign: 'center', fontSize: 12, marginTop: 6 }}>
              ログイン
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, color: WF.line, margin: '6px 0',
            }}>
              <span style={{ flex: 1, height: 1, background: WF.line2 }} />または<span style={{ flex: 1, height: 1, background: WF.line2 }} />
            </div>
            <WFBox height={36}><div style={{ fontSize: 11, color: WF.line }}>Google でサインイン</div></WFBox>
            <WFBox height={36}><div style={{ fontSize: 11, color: WF.line }}>Microsoft 365 でサインイン</div></WFBox>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <WFBox label="セキュリティの説明" height={88}>
              <WFBars lines={4} size={5} last="50%" />
            </WFBox>
            <WFBox label="二段階認証について" height={70}>
              <WFBars lines={3} size={5} last="40%" />
            </WFBox>
            <WFBox label="サポート / お問い合わせ" height={50}>
              <WFBars lines={2} size={5} last="60%" />
            </WFBox>
          </div>
        </div>
      </div>

      <WFFooter />

      {/* 設計注釈 */}
      <WFNote style={{ top: 60, left: 38 }}>※ ヘッダーは全画面共通</WFNote>
      <WFNote style={{ bottom: 60, right: 38 }}>※ SSO 優先、メール/パスワードは下位</WFNote>
    </WFPaper>
  );
}

// ═══════════════════════════════════════════════════════════════════
// W2 — 今週のあらまし (Dashboard)
// ═══════════════════════════════════════════════════════════════════
function WireDashboard() {
  return (
    <WFPaper code="W-02 / DASHBOARD">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <WFSidebar active={0} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: WF.fillXL }}>
          <WFAppTopbar title="今週のあらまし" crumbs="見る › ダッシュボード" />
          <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
            {/* 期間セレクタ */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 10.5, color: WF.line }}>期間:</span>
              {['1週','1月','3月','1年','カスタム'].map((p, i) => (
                <div key={i} style={{
                  padding: '4px 10px', fontSize: 11,
                  background: i === 3 ? WF.fillD : '#fff', color: i === 3 ? '#fff' : WF.line,
                  border: `1px solid ${WF.line2}`,
                }}>{p}</div>
              ))}
            </div>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {['投稿動画数','視聴回数','コメント数','ポジ率'].map((k, i) => (
                <WFBox key={k} label={k} height={86}>
                  <div style={{
                    fontSize: 28, fontWeight: 700, color: WF.ink, fontFamily: WF.mono, lineHeight: 1, marginTop: 4,
                  }}>XX,XXX</div>
                  <WFBars lines={1} size={4} width="60%" last="60%" />
                </WFBox>
              ))}
            </div>
            {/* チャート + センチメント */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, flex: 1, minHeight: 0 }}>
              <WFBox label="動画数 × 視聴回数の推移 (LINE CHART)">
                <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%', flex: 1 }}>
                  {[0,1,2,3].map(i => (
                    <line key={i} x1="0" x2="400" y1={20 + i*40} y2={20 + i*40} stroke={WF.line2} strokeDasharray="2 3" />
                  ))}
                  <polyline points="10,120 50,108 90,112 130,90 170,80 210,72 250,55 290,60 330,40 370,30"
                    stroke={WF.fillD} strokeWidth="2" fill="none" />
                  <polyline points="10,140 50,135 90,128 130,125 170,118 210,108 250,95 290,86 330,72 370,58"
                    stroke={WF.line} strokeWidth="1.4" fill="none" strokeDasharray="4 3" />
                </svg>
              </WFBox>
              <WFBox label="トピック別の評価 (積層バー)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                  {['神域体験','英虞湾','海女体験','食事','交通','宿泊'].map((t, i) => (
                    <div key={t}>
                      <div style={{ fontSize: 10.5, color: WF.line, marginBottom: 2 }}>{t}</div>
                      <div style={{ display: 'flex', height: 8 }}>
                        <div style={{ width: [70,60,80,75,30,45][i] + '%', background: WF.fillD }} />
                        <div style={{ width: '15%', background: WF.fill }} />
                        <div style={{ flex: 1, background: WF.fillL }} />
                      </div>
                    </div>
                  ))}
                </div>
              </WFBox>
            </div>
            {/* テーブル + キーワード */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 10, height: 200 }}>
              <WFBox label="人気動画 TOP (TABLE)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2 }}>
                  {[0,1,2,3,4].map(i => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0',
                      borderTop: i ? `1px solid ${WF.fillL}` : 'none',
                    }}>
                      <div style={{ width: 32, height: 20, background: WF.fill }} />
                      <div style={{ flex: 1 }}><WFBars lines={1} size={5} last="70%" /></div>
                      <div style={{ width: 30, height: 8, background: WF.textBar }} />
                      <div style={{ width: 50, height: 8, background: WF.textBar }} />
                    </div>
                  ))}
                </div>
              </WFBox>
              <WFBox label="話題のキーワード (BAR LIST)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[0,1,2,3,4,5,6].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 70, height: 6, background: WF.textBar }} />
                      <div style={{ flex: 1, height: 5, background: WF.fillL }}>
                        <div style={{ width: [90,75,68,55,45,38,30][i] + '%', height: '100%', background: WF.fillD }} />
                      </div>
                    </div>
                  ))}
                </div>
              </WFBox>
            </div>
          </div>
        </div>
      </div>
      <WFNote style={{ top: 60, left: 220 }}>※ サイドバーは全画面共通</WFNote>
      <WFNote style={{ bottom: 28, left: 220 }}>※ KPI → トレンド → 詳細 の F 字配置で視線誘導</WFNote>
    </WFPaper>
  );
}

// ═══════════════════════════════════════════════════════════════════
// W3 — 動画一覧
// ═══════════════════════════════════════════════════════════════════
function WireVideos() {
  return (
    <WFPaper code="W-03 / VIDEOS LIST">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <WFSidebar active={1} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: WF.fillXL }}>
          <WFAppTopbar title="旅行者の動画一覧" crumbs="見る › 動画" />
          <div style={{ flex: 1, padding: 16, display: 'flex', gap: 12, overflow: 'hidden' }}>
            {/* フィルター列 */}
            <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['言語','期間','評価','視聴回数','話題','地域'].map(f => (
                <WFBox key={f} label={f} height={70}>
                  <WFBars lines={2} size={5} last="50%" />
                </WFBox>
              ))}
            </div>
            {/* グリッド */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{
                display: 'flex', gap: 8, alignItems: 'center', fontSize: 10.5, color: WF.line,
              }}>
                <span>1,284 件中 1–24 件を表示</span>
                <div style={{ flex: 1 }} />
                {['新着順','人気順','評価順'].map((s, i) => (
                  <div key={s} style={{
                    padding: '4px 10px', fontSize: 10.5,
                    background: i === 1 ? WF.fillD : '#fff', color: i === 1 ? '#fff' : WF.line,
                    border: `1px solid ${WF.line2}`,
                  }}>{s}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, flex: 1 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ background: '#fff', border: `1px solid ${WF.line2}`, display: 'flex', flexDirection: 'column' }}>
                    <WFImage height={92} label="サムネイル" />
                    <div style={{ padding: 8 }}>
                      <WFBars lines={2} size={5} last="60%" />
                      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                        <div style={{ height: 10, width: 22, background: WF.fillL, border: `1px solid ${WF.line2}` }} />
                        <div style={{ height: 10, width: 36, background: WF.fillL, border: `1px solid ${WF.line2}` }} />
                        <div style={{ flex: 1 }} />
                        <div style={{ height: 10, width: 28, background: WF.textBar }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* ページネーション */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontSize: 11, color: WF.line }}>
                {['‹','1','2','3','…','54','›'].map((p, i) => (
                  <div key={i} style={{
                    minWidth: 22, padding: '4px 6px', textAlign: 'center',
                    background: p === '2' ? WF.fillD : '#fff', color: p === '2' ? '#fff' : WF.line,
                    border: `1px solid ${WF.line2}`,
                  }}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <WFNote style={{ top: 60, left: 220 }}>※ 左フィルター固定 / 右グリッド可変</WFNote>
    </WFPaper>
  );
}

// ═══════════════════════════════════════════════════════════════════
// W4 — 動画の中身を見る (詳細)
// ═══════════════════════════════════════════════════════════════════
function WireVideoDetail() {
  return (
    <WFPaper code="W-04 / VIDEO DETAIL">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <WFSidebar active={2} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: WF.fillXL }}>
          <WFAppTopbar title="動画の中身を見る" crumbs="見る › 動画 › 詳細" actions={['保存','原文を見る']} />
          <div style={{ flex: 1, padding: 16, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, overflow: 'hidden' }}>
            {/* 左: プレーヤー + AI要約 + チャプター */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <WFImage height={280} label="動画プレーヤー (16:9)" />
              <WFBox label="評価ヒートマップ (再生位置 × 評価)" height={60}>
                <div style={{ display: 'flex', gap: 2, height: 16, marginTop: 4 }}>
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} style={{
                      flex: 1, background: i % 6 === 4 ? WF.fillD : i % 3 === 0 ? WF.line : WF.fill,
                    }} />
                  ))}
                </div>
              </WFBox>
              <WFBox label="チャプター一覧">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2 }}>
                  {[0,1,2,3,4,5].map(i => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px',
                      background: i === 2 ? WF.fillL : 'transparent',
                    }}>
                      <span style={{ fontSize: 10.5, color: WF.line, fontFamily: WF.mono, width: 38 }}>00:00</span>
                      <WFBars lines={1} size={5} last="60%" />
                    </div>
                  ))}
                </div>
              </WFBox>
            </div>
            {/* 右: トピック + コメント + 地名 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
              <WFBox label="話題のトピック (CLUSTERS)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 18, height: 18, background: WF.fill }} />
                      <div style={{ flex: 1 }}><WFBars lines={1} size={5} last="65%" /></div>
                      <div style={{ width: 40, height: 6, background: WF.textBar }} />
                    </div>
                  ))}
                </div>
              </WFBox>
              <WFBox label="コメント一覧 (自動翻訳)" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{
                      borderTop: i ? `1px solid ${WF.fillL}` : 'none', paddingTop: i ? 8 : 0,
                      display: 'flex', gap: 8,
                    }}>
                      <div style={{ width: 18, height: 18, background: WF.fill, borderRadius: 999 }} />
                      <div style={{ flex: 1 }}>
                        <WFBars lines={2} size={5} last="40%" />
                      </div>
                    </div>
                  ))}
                </div>
              </WFBox>
              <WFBox label="動画中で名前が出た場所" height={92}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 2 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: WF.line }}>📍</span>
                      <div style={{ flex: 1, height: 5, background: WF.textBar, width: ['80%','60%','45%'][i] }} />
                      <div style={{ width: 24, height: 5, background: WF.textBar }} />
                    </div>
                  ))}
                </div>
              </WFBox>
            </div>
          </div>
        </div>
      </div>
      <WFNote style={{ top: 60, right: 38 }}>※ 左=プレーヤー / 右=分析パネル</WFNote>
    </WFPaper>
  );
}

// ═══════════════════════════════════════════════════════════════════
// W5 — 他観光地と比べる (Compare)
// ═══════════════════════════════════════════════════════════════════
function WireCompare() {
  return (
    <WFPaper code="W-05 / COMPARE">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <WFSidebar active={3} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: WF.fillXL }}>
          <WFAppTopbar title="他の観光地と比べる" crumbs="見る › 比較" />
          <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
            {/* 比較対象セレクタ (3つ並列) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {['伊勢志摩 (自分)', '比較対象 A: 白馬', '比較対象 B: ニセコ'].map((t, i) => (
                <div key={t} style={{
                  background: i === 0 ? WF.fillD : '#fff', color: i === 0 ? '#fff' : WF.ink,
                  border: `1px solid ${i === 0 ? WF.fillD : WF.line2}`, padding: 14,
                }}>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{i === 0 ? '主役' : 'COMPARE'}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{t}</div>
                  <div style={{ fontSize: 10.5, opacity: 0.7, marginTop: 4 }}>＋ 別の地域に変更</div>
                </div>
              ))}
            </div>
            {/* レーダー + 表 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 10, flex: 1, minHeight: 0 }}>
              <WFBox label="6軸スコア (RADAR CHART)">
                <svg viewBox="0 0 300 280" style={{ width: '100%', height: '100%' }}>
                  {[1,2,3,4].map(r => (
                    <polygon key={r} points={hexagon(150, 140, 25 * r).join(' ')}
                      fill="none" stroke={WF.line2} />
                  ))}
                  <polygon points={hexagon(150, 140, 100, [0.9,0.75,0.85,0.7,0.4,0.5]).join(' ')}
                    fill={WF.fillD} fillOpacity="0.25" stroke={WF.fillD} strokeWidth="1.6" />
                  <polygon points={hexagon(150, 140, 100, [0.6,0.5,0.55,0.85,0.7,0.65]).join(' ')}
                    fill="none" stroke={WF.line} strokeWidth="1.4" strokeDasharray="4 3" />
                  {['神域','食','体験','自然','交通','価格'].map((lbl, i) => {
                    const a = -Math.PI/2 + i * Math.PI/3;
                    return <text key={lbl} x={150 + Math.cos(a) * 122} y={140 + Math.sin(a) * 122 + 4}
                      fontSize="10" fill={WF.line} textAnchor="middle">{lbl}</text>;
                  })}
                </svg>
              </WFBox>
              <WFBox label="指標比較表">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 2 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', fontSize: 10, color: WF.line, paddingBottom: 4, borderBottom: `1px solid ${WF.line2}` }}>
                    <span>指標</span><span>伊勢志摩</span><span>白馬</span><span>ニセコ</span>
                  </div>
                  {['動画数','視聴回数','ポジ率','英語率','再訪率','課題数'].map((k, i) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', alignItems: 'center', padding: '5px 0', borderBottom: `1px solid ${WF.fillL}` }}>
                      <span style={{ fontSize: 11, color: WF.ink }}>{k}</span>
                      {[0,1,2].map(c => (
                        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div style={{ fontFamily: WF.mono, fontSize: 11 }}>{['1.2k','864','512'][c]}</div>
                          <div style={{ flex: 1, height: 4, background: WF.fillL }}>
                            <div style={{ width: [80,60,45,75,50,30][i] - c * 10 + '%', height: '100%', background: c === 0 ? WF.fillD : WF.fill }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </WFBox>
            </div>
            {/* 強み / 弱み */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, height: 130 }}>
              <WFBox label="伊勢志摩の強み (差で勝っている軸)">
                <WFBars lines={3} size={5} last="60%" />
              </WFBox>
              <WFBox label="伊勢志摩の弱み / のびしろ">
                <WFBars lines={3} size={5} last="50%" />
              </WFBox>
            </div>
          </div>
        </div>
      </div>
      <WFNote style={{ top: 60, right: 38 }}>※ 自地域は常に左端固定</WFNote>
    </WFPaper>
  );
}

// hexagon helper
function hexagon(cx, cy, r, weights) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 3;
    const w = weights ? weights[i] : 1;
    pts.push(`${cx + Math.cos(a) * r * w},${cy + Math.sin(a) * r * w}`);
  }
  return pts;
}

// ═══════════════════════════════════════════════════════════════════
// W6 — 地図で見る
// ═══════════════════════════════════════════════════════════════════
function WireMap() {
  return (
    <WFPaper code="W-06 / MAP">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <WFSidebar active={4} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: WF.fillXL }}>
          <WFAppTopbar title="地図で見る" crumbs="見る › 地図" actions={['表示の凡例','期間で絞り込み']} />
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* 地図エリア */}
            <div style={{ flex: 1, position: 'relative', background: '#fff' }}>
              <svg viewBox="0 0 600 400" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
                {/* 海岸線風のシェイプ */}
                <path d="M 80 60 Q 160 40 240 80 T 420 100 Q 520 130 540 200 T 480 320 Q 360 360 240 320 T 80 280 Q 40 200 80 60 Z"
                  fill={WF.fillL} stroke={WF.line2} strokeWidth="1" />
                {/* グリッド */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <g key={i}>
                    <line x1={i * 50} x2={i * 50} y1="0" y2="400" stroke={WF.fillL} strokeDasharray="2 4" />
                    <line y1={i * 33} y2={i * 33} x1="0" x2="600" stroke={WF.fillL} strokeDasharray="2 4" />
                  </g>
                ))}
                {/* ピン */}
                {[[180,140,30],[260,180,18],[320,220,42],[380,160,12],[440,250,24],[220,270,8],[300,300,16]].map((p, i) => (
                  <g key={i}>
                    <circle cx={p[0]} cy={p[1]} r={p[2]} fill={WF.fillD} fillOpacity="0.18" stroke={WF.fillD} />
                    <circle cx={p[0]} cy={p[1]} r="3" fill={WF.fillD} />
                  </g>
                ))}
                <text x="180" y="135" fontSize="10" fill={WF.ink} textAnchor="middle">A</text>
                <text x="320" y="215" fontSize="10" fill={WF.ink} textAnchor="middle">B</text>
                <text x="440" y="245" fontSize="10" fill={WF.ink} textAnchor="middle">C</text>
              </svg>
              {/* ズーム / レイヤートグル */}
              <div style={{
                position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                {['＋','－','⌖'].map(b => (
                  <div key={b} style={{
                    width: 28, height: 28, background: '#fff', border: `1px solid ${WF.line2}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: WF.line,
                  }}>{b}</div>
                ))}
              </div>
              <div style={{
                position: 'absolute', bottom: 12, left: 12, background: '#fff', border: `1px solid ${WF.line2}`,
                padding: 8, fontSize: 10, color: WF.line, display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                <div style={{ fontWeight: 600, color: WF.ink, marginBottom: 2 }}>レイヤー</div>
                {['□ 言及回数 (ヒート)','□ ポジ/ネガ','□ 言語別','□ 動画密度'].map(l => <span key={l}>{l}</span>)}
              </div>
            </div>
            {/* 右側パネル */}
            <div style={{
              width: 280, borderLeft: `1px solid ${WF.line2}`, background: WF.fillXL, padding: 12,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <WFBox label="選択中のスポット">
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>スポット名</div>
                <WFBars lines={3} size={5} last="50%" />
              </WFBox>
              <WFBox label="トップ動画 (このスポット)" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ display: 'flex', gap: 8 }}>
                      <div style={{ width: 50, height: 32, background: WF.fill }} />
                      <div style={{ flex: 1 }}><WFBars lines={2} size={5} last="40%" /></div>
                    </div>
                  ))}
                </div>
              </WFBox>
              <WFBox label="近隣のスポット" height={80}>
                <WFBars lines={3} size={5} last="60%" />
              </WFBox>
            </div>
          </div>
        </div>
      </div>
      <WFNote style={{ top: 60, left: 220 }}>※ 地図メイン / 右にスポット詳細</WFNote>
    </WFPaper>
  );
}

// ═══════════════════════════════════════════════════════════════════
// W7 — 資料をつくる (Reports)
// ═══════════════════════════════════════════════════════════════════
function WireReports() {
  return (
    <WFPaper code="W-07 / REPORTS">
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <WFSidebar active={7} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: WF.fillXL }}>
          <WFAppTopbar title="資料をつくる" crumbs="つかう › 資料" actions={['プレビュー','PDF出力']} />
          <div style={{ flex: 1, padding: 16, display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 12, overflow: 'hidden' }}>
            {/* 左: ブロックパレット */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 10.5, color: WF.line, fontWeight: 600 }}>追加できる部品</div>
              {['表紙','KPIカード','折れ線グラフ','棒グラフ','レーダー','地図','動画埋め込み','コメント引用','テキスト','まとめ'].map(b => (
                <div key={b} style={{
                  border: `1px dashed ${WF.line2}`, background: '#fff',
                  padding: '7px 10px', fontSize: 11, color: WF.line, cursor: 'grab',
                }}>≡ {b}</div>
              ))}
            </div>
            {/* 中央: プレビュー (A4縦 を想定) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto' }}>
              <div style={{
                width: 420, minHeight: 560, background: '#fff', border: `1px solid ${WF.line}`,
                padding: 24, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '4px 4px 0 rgba(0,0,0,0.04)',
              }}>
                <div style={{ borderBottom: `2px solid ${WF.fillD}`, paddingBottom: 8 }}>
                  <div style={{ fontSize: 10, color: WF.line }}>議会向け資料 / 2026年5月期</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>伊勢志摩 観光UGC レポート</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {[0,1,2].map(i => (
                    <WFBox key={i} height={60} style={{ padding: 6 }}>
                      <div style={{ fontSize: 9, color: WF.line }}>KPI</div>
                      <div style={{ fontFamily: WF.mono, fontSize: 16, fontWeight: 700 }}>XX,XXX</div>
                    </WFBox>
                  ))}
                </div>
                <WFImage height={130} label="チャート" />
                <WFBars lines={4} size={5} last="60%" />
                <WFImage height={80} label="コメント引用" />
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 9, color: WF.line, textAlign: 'right' }}>1 / 6 ページ</div>
              </div>
            </div>
            {/* 右: 設定 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <WFBox label="出力形式">
                <div style={{ display: 'flex', gap: 4, marginTop: 4, fontSize: 10.5 }}>
                  {['PDF','PPTX','Web'].map((f, i) => (
                    <div key={f} style={{
                      padding: '4px 10px', border: `1px solid ${WF.line2}`,
                      background: i === 0 ? WF.fillD : '#fff', color: i === 0 ? '#fff' : WF.line,
                    }}>{f}</div>
                  ))}
                </div>
              </WFBox>
              <WFBox label="対象読者">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4, fontSize: 11, color: WF.line }}>
                  {['☒ 議会向け','□ 庁内向け','□ 業者向け','□ 一般公開'].map(t => <span key={t}>{t}</span>)}
                </div>
              </WFBox>
              <WFBox label="期間と地域" height={80}>
                <WFBars lines={3} size={5} last="50%" />
              </WFBox>
              <WFBox label="ページ構成" style={{ flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4, fontSize: 10.5 }}>
                  {['1. 表紙','2. KPI まとめ','3. 動画トレンド','4. 比較分析','5. スポット地図','6. 結論と提案'].map((p, i) => (
                    <div key={p} style={{
                      padding: '4px 6px',
                      background: i === 0 ? WF.fillL : 'transparent', color: WF.line,
                    }}>{p}</div>
                  ))}
                </div>
              </WFBox>
            </div>
          </div>
        </div>
      </div>
      <WFNote style={{ top: 60, right: 38 }}>※ 左パレット → 中央プレビュー → 右設定の3カラム</WFNote>
    </WFPaper>
  );
}

Object.assign(window, {
  WireLogin, WireDashboard, WireVideos, WireVideoDetail, WireCompare, WireMap, WireReports,
});
