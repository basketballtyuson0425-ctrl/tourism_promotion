// 07 — 使い方ガイド: システムの見方・運用フロー
function ScreenHelp() {
  const steps = [
    {
      n: '01', tag: 'まいにち',
      ttl: '「今週のあらまし」を1分で見る',
      d: '画面の上のほうに、いま伊勢志摩がどう見られているかが大きな数字で出ます。先週より上がった/下がったが矢印でわかります。',
      pts: [
        '緑の矢印は前より良くなった、赤の矢印は前より下がったを意味します',
        '「いま話題になっている言葉」の上位3つは、必ず実際の動画を確認しましょう',
        '「不満・課題」の色（赤系）が多いテーマは、関係課と相談が必要です',
      ],
    },
    {
      n: '02', tag: 'さがす',
      ttl: '気になる動画を、言語や評価で絞って探す',
      d: '左の絞り込みから、英語の動画だけ、ホメられている動画だけ…のように選べます。',
      pts: [
        '動画の左下の小さな丸の色で、ざっくり評価がわかります（緑＝好意的、赤＝不満）',
        '★が付いた動画は「あとで議会・関係者と共有予定」の印です',
        '複数のチェックを入れると、「すべて当てはまる動画」だけが出ます',
      ],
    },
    {
      n: '03', tag: 'くわしく',
      ttl: '1本の動画を開いて、何がホメられているか確かめる',
      d: '動画の下の色帯は、再生時刻ごとに「コメントの雰囲気」を色で表したものです。',
      pts: [
        '⚠マークのコメントは、不満や「予約しづらかった」などの改善要望です',
        '「よく話されている話題トップ」は、約700件のコメントを6つに自動でまとめたものです',
        '外国語のコメントは自動で日本語に翻訳されます（原文も小さく表示）',
      ],
    },
    {
      n: '04', tag: 'くらべる',
      ttl: '広島県（宮島）と比べて、伸びしろを見つける',
      d: '6つの視点でレーダーチャート表示。線が小さい項目が、伊勢志摩の弱点候補です。',
      pts: [
        '「ショート動画の多さ」が他より大きく低ければ、ショート動画作りを検討しましょう',
        '伸びている地域は何をやっているか、参考にできます',
      ],
    },
    {
      n: '05', tag: 'つたえる',
      ttl: '議会や関係者に渡せる資料を、ボタン1つで作る',
      d: 'PDFまたはPowerPointから選べます。テンプレートは決まったかたちで自動生成されます。',
      pts: [
        '「議会提出フォーマット」は表紙・要旨・グラフ・元データが入った完成形',
        '誰が・いつ・何を出したかは5年間記録されます',
      ],
    },
  ];

  const indicators = [
    { c: T.pine, l: 'ホメられている (好意度70%以上)',   d: '魅力・好意・共感のあるコメント' },
    { c: T.gold, l: 'ふつう (40〜70%)',                d: '事実を述べているだけのコメント' },
    { c: T.shu,  l: '不満・課題 (40%未満)',           d: '不満や、改善してほしい要望が含まれるコメント' },
    { c: T.faint,l: 'はんべつ保留',                    d: '皮肉・絵文字のみで自動では判断できないもの' },
  ];

  const faq = [
    { q: 'データはどのくらい新しいですか？',
      a: '30分ごとに自動で取り込んでいます。コメントの翻訳と評価は、取り込みから5分ほどで反映されます。' },
    { q: 'どの言語に対応していますか？',
      a: '中国語（簡体字・繁体字）・韓国語・英語・広東語表現を対象にしています。対象市場は中国・台湾・韓国・米国・香港です。' },
    { q: '翻訳された日本語は信用できますか？',
      a: '機械翻訳のため、元の言葉のニュアンスとずれることがあります。大事なコメントは「原文」をクリックして必ず確認してください。' },
    { q: '個人情報はどう扱われますか？',
      a: 'YouTubeに公開されているコメント本文のみを使い、誰が書いたかを特定する情報は保存しません。総務省のガイドラインに沿っています。' },
    { q: 'ITに不慣れですが大丈夫でしょうか？',
      a: 'はい。日々の業務でいちばん見るのは「今週のあらまし」画面1つだけで構いません。月末にレポート出力ボタンを押すだけで資料ができあがります。' },
    { q: '困ったときの連絡先は？',
      a: '画面右下のチャットマーク、またはメールでサポート窓口（株式会社KIYONO）にお問合せください。平日9:00〜18:00で対応しています。' },
  ];

  return (
    <AppFrame>
      <Sidebar active="help" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['つかう', '使い方を学ぶ']}
          title="使い方ガイド — 伊勢観光分析のかんたんな見方"
          subtitle="ITが苦手でも、毎日10分で観光動向を把握できます"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.ext} 操作の動画（8分）</button>
            <button style={btnDark()}>{Ico.download} このガイドをPDFで保存</button>
          </div>}
        />

        <div style={{ flex: 1, overflow: 'auto', background: T.paper, padding: 22 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Hero */}
            <div style={{
              background: T.ink, color: '#fff', borderRadius: 12, padding: '24px 26px',
              display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'center',
              backgroundImage: `linear-gradient(135deg, ${T.ink} 0%, ${T.navy} 100%)`,
            }}>
              <div>
                <div style={{ fontSize: 11, color: T.shu2, letterSpacing: 1, marginBottom: 6 }}>
                  伊勢観光分析 · 伊勢志摩 観光プロモーション支援システム
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0.5, lineHeight: 1.5 }}>
                  YouTubeに投稿された旅行者の動画から、<br />
                  伊勢志摩の魅力と課題をかんたんに見えるようにします
                </div>
                <div style={{ fontSize: 13, color: '#cfd3dc', marginTop: 12, lineHeight: 1.8 }}>
                  難しい操作は不要です。毎朝、画面を10分見るだけで「いま海外のお客さまに、伊勢志摩のどこがホメられて、どこに不満があるか」が一目でわかります。
                  会議や議会で使う資料も、ボタン1つで自動で作れます。
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: 16,
              }}>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>こんな順番で使ってください</div>
                {[
                  '毎朝 1分: 今週のあらまし',
                  '週に1度 5分: 気になる動画を1〜2本見る',
                  '月末 10分: 他地域と比べる + 資料出力',
                  '3ヶ月に1度: 議会向け資料を作る',
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 12 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 999, background: T.shu, color: '#fff',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: T.num, fontWeight: 700,
                    }}>{i + 1}</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 4, height: 14, background: T.shu, borderRadius: 2 }} />
                5つのステップで使いこなす
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                {steps.map(s => (
                  <div key={s.n} style={{
                    background: T.card, border: `1px solid ${T.line}`, borderRadius: 10,
                    padding: 14, display: 'flex', flexDirection: 'column', gap: 8,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: T.num, fontSize: 18, fontWeight: 700, color: T.shu }}>{s.n}</span>
                      <Chip tone="neutral">{s.tag}</Chip>
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: T.ink, lineHeight: 1.5 }}>{s.ttl}</div>
                    <div style={{ fontSize: 11, color: T.body, lineHeight: 1.65 }}>{s.d}</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {s.pts.map((p, i) => (
                        <li key={i} style={{ display: 'flex', gap: 6, fontSize: 11, color: T.body, lineHeight: 1.5 }}>
                          <span style={{ color: T.pine, flex: '0 0 auto', marginTop: 2 }}>{Ico.check}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators + glossary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14 }}>
              <Card title="評価の色の見方">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {indicators.map(ind => (
                    <div key={ind.l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 14, height: 14, borderRadius: 3, background: ind.c, flex: '0 0 auto' }} />
                      <div style={{ minWidth: 160 }}>
                        <div style={{ fontSize: 12, color: T.ink, fontWeight: 600 }}>{ind.l}</div>
                      </div>
                      <div style={{ fontSize: 11.5, color: T.body }}>{ind.d}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.line2}`, fontSize: 11, color: T.muted, lineHeight: 1.6 }}>
                  色わけは AI による自動推定です。施策の判断時には、必ず元のコメントも合わせて確認してください。
                </div>
              </Card>

              <Card title="この画面で使う言葉">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 11.5 }}>
                  {[
                    ['投稿動画',         '旅行者がYouTubeにアップロードしている動画。'],
                    ['よく話されている話題', 'コメントの主題を自動でまとめたグループ。'],
                    ['いい評価の割合',     'コメントのうちホメているものの比率。'],
                    ['話題になった回数',   'スポット名がコメントや動画でいくつ出てきたか。'],
                    ['ショート動画',       '60秒以下の縦型の短い動画。若い世代が多く見る。'],
                    ['⚠ 不満・課題',      'お客さまから不満や要望が出ているコメント。'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ borderLeft: `2px solid ${T.line}`, paddingLeft: 8 }}>
                      <div style={{ color: T.ink, fontWeight: 600, fontSize: 11.5 }}>{k}</div>
                      <div style={{ color: T.body, marginTop: 3, lineHeight: 1.5, fontSize: 11 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* FAQ + contacts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
              <Card title="よくある質問">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {faq.map((f, i) => (
                    <div key={i} style={{ paddingBottom: i < faq.length - 1 ? 12 : 0, borderBottom: i < faq.length - 1 ? `1px solid ${T.line2}` : 'none' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ color: T.shu, fontWeight: 700, fontFamily: T.num, fontSize: 13 }}>Q.</span>
                        <span style={{ fontSize: 12.5, color: T.ink, fontWeight: 600 }}>{f.q}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
                        <span style={{ color: T.body, fontWeight: 700, fontFamily: T.num, fontSize: 13 }}>A.</span>
                        <span style={{ fontSize: 12, color: T.body, lineHeight: 1.7 }}>{f.a}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Card title="困ったときの連絡先">
                  <div style={{ fontSize: 12, color: T.body, lineHeight: 1.8 }}>
                    <div><span style={{ color: T.muted }}>サポート時間</span>　平日 9:00 - 18:00</div>
                    <div><span style={{ color: T.muted }}>メール</span>　support@ise-lens.go.jp</div>
                    <div><span style={{ color: T.muted }}>電話</span>　0599-XX-XXXX (担当: 株式会社KIYONO)</div>
                    <div><span style={{ color: T.muted }}>稼働率</span>　月99.5%以上を保証</div>
                  </div>
                </Card>
                <div style={{
                  background: T.shuSoft, color: T.shu, borderRadius: 10, padding: 12,
                  border: `1px solid #eccfbf`, fontSize: 12, lineHeight: 1.7,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, fontWeight: 700 }}>
                    {Ico.warn} お願い
                  </div>
                  このシステムの結果は「仮説」です。施策にする前には、観光協会・現地の事業者の方と必ずご相談ください。
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenHelp });


