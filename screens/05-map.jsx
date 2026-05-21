// 05 — 観光資源マップ: 伊勢志摩の魅力ヒートマップ
function ScreenMap() {
  const assets = [
    { id: 'jingu',  name: '伊勢神宮',      x: 28, y: 36, mentions: 4820, growth: 24, score: 0.86, lang: 'EN/JP/ZH', cat: '神社・神道' },
    { id: 'okage',  name: 'おかげ横丁',     x: 31, y: 41, mentions: 1480, growth: 31, score: 0.74, lang: 'EN/JP',    cat: '街歩き・食' },
    { id: 'meoto',  name: '夫婦岩',         x: 42, y: 28, mentions: 1620, growth: -4, score: 0.66, lang: 'EN/JP',    cat: '景観・神話' },
    { id: 'toba',   name: '鳥羽水族館',     x: 52, y: 32, mentions:  840, growth: 12, score: 0.62, lang: 'JP',       cat: 'ファミリー' },
    { id: 'ama',    name: '海女小屋(相差)', x: 64, y: 38, mentions: 2330, growth: 61, score: 0.84, lang: 'EN/ZH',    cat: '文化体験' },
    { id: 'ago',    name: '英虞湾 / 賢島',  x: 68, y: 64, mentions: 2680, growth: 42, score: 0.76, lang: 'EN/JP',    cat: '自然・宿泊' },
    { id: 'pearl',  name: '真珠養殖場',     x: 73, y: 58, mentions: 1740, growth:  8, score: 0.71, lang: 'EN/JP',    cat: '産業観光' },
    { id: 'beef',   name: '松阪牛 (松阪)',  x: 16, y: 22, mentions: 1980, growth: 12, score: 0.69, lang: 'EN/JP',    cat: '食文化' },
    { id: 'yokoyama', name: '横山展望台',   x: 58, y: 62, mentions:  640, growth: 26, score: 0.78, lang: 'EN/JP',    cat: '景観' },
  ];

  return (
    <AppFrame>
      <Sidebar active="map" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['見る', '地図で見る']}
          title="伊勢志摩のどこが話題になっているか、地図で見る"
          subtitle="スポットごとの言及量を地図上に表示 · この3ヶ月"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.filter} 見たい情報を選ぶ</button>
            <button style={btnDark()}>{Ico.download} 保存</button>
          </div>}
        />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: 0, background: T.paper }}>
          {/* Map */}
          <div style={{
            position: 'relative', overflow: 'hidden', margin: 14, marginRight: 0,
            borderRadius: 12, border: `1px solid ${T.line}`,
            background: 'linear-gradient(180deg, #e6eef5 0%, #d9e6ef 100%)',
          }}>
            {/* sea texture */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <pattern id="wave" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
                  <path d="M0 3 Q1.5 1.5 3 3 T 6 3" stroke="#b4c7d6" strokeWidth="0.2" fill="none" />
                </pattern>
                <pattern id="forest" width="2" height="2" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.3" fill="#a8b89c" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#wave)" />
              {/* Land masses — stylized Shima peninsula */}
              <path d="M0 0 L60 0 L62 8 L58 14 L54 18 L52 24 L44 26 L40 30 L36 32 L30 32 L24 36 L20 42 L18 46 L22 52 L28 56 L36 56 L42 54 L46 56 L50 60 L52 66 L46 72 L40 76 L34 80 L24 82 L14 82 L0 80 Z"
                fill="#eef0e4" stroke="#c5cbb6" strokeWidth="0.3" />
              <path d="M58 24 L72 22 L80 28 L84 36 L82 44 L86 50 L82 58 L76 62 L70 70 L62 74 L56 76 L50 72 L52 66 L58 60 L62 56 L66 50 L62 46 L58 42 L54 36 L56 30 Z"
                fill="#eef0e4" stroke="#c5cbb6" strokeWidth="0.3" />
              <rect x="0" y="0" width="100" height="100" fill="url(#forest)" opacity="0.4" style={{ mixBlendMode: 'multiply' }} />
            </svg>

            {/* Heat circles + pins */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} viewBox="0 0 100 100" preserveAspectRatio="none">
              {assets.map(a => (
                <g key={a.id}>
                  <circle cx={a.x} cy={a.y} r={Math.sqrt(a.mentions) / 7} fill={T.shu} opacity={0.15} />
                  <circle cx={a.x} cy={a.y} r={Math.sqrt(a.mentions) / 12} fill={T.shu} opacity={0.28} />
                </g>
              ))}
            </svg>

            {/* Pin labels — absolute % positioning */}
            {assets.map(a => (
              <div key={a.id} style={{
                position: 'absolute', left: a.x + '%', top: a.y + '%',
                transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 999, background: T.shu,
                  border: '2.5px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                }} />
                <div style={{
                  marginTop: 4, background: '#fff', padding: '3px 7px', borderRadius: 4,
                  fontSize: 10.5, color: T.ink, border: `1px solid ${T.line}`, whiteSpace: 'nowrap',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                  <span style={{ fontWeight: 600 }}>{a.name}</span>
                  <span style={{ color: T.muted, fontFamily: T.num, marginLeft: 6 }}>{a.mentions.toLocaleString()}</span>
                </div>
              </div>
            ))}

            {/* Map legend */}
            <div style={{
              position: 'absolute', left: 14, bottom: 14, background: 'rgba(255,255,255,0.92)',
              borderRadius: 8, padding: '10px 12px', fontSize: 11, color: T.body, border: `1px solid ${T.line}`,
              backdropFilter: 'blur(4px)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: T.ink, marginBottom: 6 }}>話題になった回数（円の大きさで表示）</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                {[500, 1500, 4000].map(v => (
                  <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{
                      width: Math.sqrt(v) / 4, height: Math.sqrt(v) / 4, borderRadius: 999,
                      background: T.shu, opacity: 0.28,
                    }} />
                    <span style={{ fontSize: 10, fontFamily: T.num, color: T.muted }}>{v.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layer toggle */}
            <div style={{
              position: 'absolute', right: 14, top: 14, background: '#fff',
              borderRadius: 8, padding: 6, fontSize: 11, border: `1px solid ${T.line}`,
              display: 'flex', flexDirection: 'column', gap: 2, minWidth: 130,
            }}>
              {['話題になっている量', 'いい評価の割合', '海外からの来訪経路', '宿泊の多さ'].map((l, i) => (
                <div key={l} style={{
                  padding: '5px 8px', borderRadius: 4,
                  background: i === 0 ? T.ink : 'transparent',
                  color: i === 0 ? '#fff' : T.body,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: 3, border: `1.4px solid ${i === 0 ? '#fff' : T.faint}`,
                    background: i === 0 ? '#fff' : 'transparent',
                  }} /> {l}
                </div>
              ))}
            </div>
          </div>

          {/* Side panel: ranking */}
          <div style={{
            padding: 14, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            <div style={{
              background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 14,
            }}>
              <div style={{ fontSize: 12, color: T.muted }}>選んでいるスポット</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.ink, marginTop: 4 }}>海女小屋 (相差)</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Chip tone="shu">人気上昇 +61%</Chip>
                <Chip tone="pine">いい評価の割合 84%</Chip>
              </div>
              <div style={{ marginTop: 12, fontSize: 11.5, color: T.body, lineHeight: 1.6 }}>
                「日本でしかできない体験」として、欧米の人気YouTuberによる投稿が急増しています。予約のしかた・英語予約を整えるとさらに伸びる見込みがあります。
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.line2}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10.5, color: T.muted }}>話題になった回数</div>
                  <Num value="2,330" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, color: T.muted }}>関連の動画本数</div>
                  <Num value="148" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, color: T.muted }}>主な言語 英/中</div>
                  <Num value="71/22" unit="%" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 10.5, color: T.muted }}>主な見ている人</div>
                  <span style={{ fontSize: 12, color: T.ink2, fontWeight: 500 }}>25–34歳 / 欧米</span>
                </div>
              </div>
            </div>

            <Card title="スポット別 話題になった回数 ランキング" padding={0}>
              <div style={{ maxHeight: 320, overflow: 'auto' }}>
                {[...assets].sort((a,b)=>b.mentions-a.mentions).map((a, i) => (
                  <div key={a.id} style={{
                    padding: '9px 14px', borderTop: i ? `1px solid ${T.line2}` : 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ fontFamily: T.num, fontSize: 11, color: T.muted, width: 18 }}>{String(i+1).padStart(2, '0')}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: T.ink2 }}>{a.name}</div>
                      <div style={{ fontSize: 10.5, color: T.muted, marginTop: 2 }}>{a.cat} · {a.lang}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: T.num, fontSize: 12, color: T.ink, fontWeight: 600 }}>{a.mentions.toLocaleString()}</div>
                      <div style={{
                        fontFamily: T.num, fontSize: 10.5, fontWeight: 600,
                        color: a.growth >= 0 ? T.pine : T.bad,
                      }}>{a.growth >= 0 ? '+' : ''}{a.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenMap });
