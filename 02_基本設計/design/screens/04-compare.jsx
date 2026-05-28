// 04 — 地域比較: 伊勢志摩 vs 広島県（宮島）
function ScreenCompare() {
  const regions = [
    { name: '伊勢志摩', color: T.shu, tone: 'shu', active: true,
      kpi: { vid: 1284, overseas: 486, sent: 0.71, market: 5, growth: 18.4 } },
    { name: '広島県（宮島）', color: T.pine, tone: 'pine', active: true,
      kpi: { vid: 2460, overseas: 1380, sent: 0.79, market: 5, growth: 34.8 } },
  ];

  const axes = [
    { ax: '神社・文化観光', v: [78, 86] },
    { ax: '海景観の見せ方', v: [71, 82] },
    { ax: '海鮮・食文化', v: [76, 74] },
    { ax: '海外向け動画数', v: [42, 79] },
    { ax: 'アクセス情報', v: [45, 68] },
    { ax: 'いい評価の割合', v: [71, 79] },
  ];

  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  return (
    <AppFrame>
      <Sidebar active="compare" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['見る', '他の観光地と比べる']}
          title="宮島と比べて発信の伸びしろを見る"
          subtitle="伊勢志摩 / 広島県（宮島） · この1年間"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.globe} 比較条件を確認</button>
            <button style={btnDark()}>{Ico.download} この画面を資料にする</button>
          </div>}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 18, background: T.paper, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {regions.map(r => (
              <div key={r.name} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                background: T.card, border: `1.5px solid ${r.color}`, borderRadius: 999, fontSize: 12,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: r.color }} />
                <span style={{ color: T.ink, fontWeight: 500 }}>{r.name}</span>
                <span style={{ color: T.muted, fontFamily: T.num }}>{r.kpi.vid.toLocaleString()} 本</span>
              </div>
            ))}
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 11, color: T.muted }}>見ている項目: 動画数・海外向け動画発信数・対象市場・いい評価 / この1年間</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {[
              ['投稿された動画の数', regions.map(r => r.kpi.vid.toLocaleString() + ' 本')],
              ['海外向け動画発信数', regions.map(r => r.kpi.overseas.toLocaleString() + ' 本')],
              ['いい評価の割合', regions.map(r => Math.round(r.kpi.sent * 100) + '%')],
              ['対象市場', regions.map(r => r.kpi.market + ' 市場')],
              ['前年比のびしろ', regions.map(r => '+' + r.kpi.growth + '%')],
            ].map(([label, vals]) => (
              <div key={label} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>{label}</div>
                {vals.map((v, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: j ? 4 : 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: regions[j].color }} />
                    <span style={{ fontFamily: T.num, fontSize: j === 0 ? 18 : 13, fontWeight: j === 0 ? 700 : 500, color: j === 0 ? T.ink : T.body }}>
                      {v}
                    </span>
                    <span style={{ fontSize: 10.5, color: T.muted }}>{regions[j].name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 12, flex: 1, minHeight: 0 }}>
            <Card title="6つの視点で見た発信力の差" action={<span style={{ fontSize: 10.5, color: T.muted }}>それぞれ0～100点で表示</span>}>
              <Radar size={300} axes={axes} regions={regions} />
              <div style={{ marginTop: 10, fontSize: 11, color: T.body, lineHeight: 1.6 }}>
                伊勢志摩と宮島は <b style={{ color: T.shu }}>神社・海景観・食文化</b> が近い一方、
                <b style={{ color: T.shu }}>海外向け動画発信数</b> と <b style={{ color: T.shu }}>アクセス情報の見せ方</b> に差があります。
              </div>
            </Card>

            <Card title="海外向け動画発信数の推移" action={
              <div style={{ display: 'flex', gap: 10, fontSize: 11, color: T.body }}>
                {regions.map(r => (
                  <span key={r.name} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 10, height: 2, background: r.color }} /> {r.name}
                  </span>
                ))}
              </div>
            }>
              <LineChart
                width={560} height={250} xLabels={months}
                series={[
                  { name: '伊勢志摩', color: T.shu, data: [38,42,45,48,52,58,62,71,78,83,91,104] },
                  { name: '宮島', color: T.pine, data: [96,112,128,142,158,174,192,218,246,282,314,366] },
                ]}
                yMax={400} legend={false}
              />
            </Card>
          </div>

          <div style={{
            background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 14,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {[
              { tag: '課題', tone: 'shu', ttl: '海外向け動画発信数が少ない',
                d: '宮島は厳島神社や海上鳥居の動画が海外向けに広がりやすい。伊勢志摩も神宮・英虞湾・食文化を組み合わせた発信量を増やす余地があります。' },
              { tag: '課題', tone: 'shu', ttl: 'アクセス情報の見せ方に改善余地',
                d: '伊勢志摩も宮島も移動に手間がかかります。だからこそ、行き方や回り方を動画内で分かりやすく示す必要があります。' },
              { tag: '強み', tone: 'pine', ttl: '観光資源の類似性が高い',
                d: '神社・海景観・海鮮という共通点があるため、宮島の見せ方は伊勢志摩の海外向け発信を考える参考になります。' },
            ].map((b, i) => (
              <div key={i}>
                <Chip tone={b.tone}>{b.tag}</Chip>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.ink, marginTop: 6 }}>{b.ttl}</div>
                <div style={{ fontSize: 11.5, color: T.body, marginTop: 6, lineHeight: 1.55 }}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function Radar({ size = 280, axes, regions }) {
  const cx = size / 2, cy = size / 2, R = size / 2 - 30;
  const n = axes.length;
  const angle = i => -Math.PI / 2 + (i / n) * Math.PI * 2;
  const pt = (i, v) => [cx + Math.cos(angle(i)) * R * (v / 100), cy + Math.sin(angle(i)) * R * (v / 100)];
  const rings = [0.25, 0.5, 0.75, 1];
  return (
    <svg width={size} height={size} style={{ display: 'block', margin: '0 auto', fontFamily: T.sans }}>
      {rings.map((r, i) => {
        const poly = axes.map((_, k) => {
          const x = cx + Math.cos(angle(k)) * R * r;
          const y = cy + Math.sin(angle(k)) * R * r;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');
        return <polygon key={i} points={poly} fill="none" stroke={T.line} />;
      })}
      {axes.map((a, i) => {
        const [x, y] = [cx + Math.cos(angle(i)) * R, cy + Math.sin(angle(i)) * R];
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={T.line2} />;
      })}
      {regions.map((r, ri) => {
        const pts = axes.map((a, i) => pt(i, a.v[ri]).map(v => v.toFixed(1)).join(',')).join(' ');
        return <polygon key={r.name} points={pts} fill={r.color} fillOpacity="0.13" stroke={r.color} strokeWidth="1.6" />;
      })}
      {axes.map((a, i) => {
        const [x, y] = [cx + Math.cos(angle(i)) * (R + 18), cy + Math.sin(angle(i)) * (R + 18)];
        return (
          <text key={i} x={x} y={y} fontSize="10.5" fill={T.body} textAnchor="middle" dominantBaseline="middle">
            {a.ax}
          </text>
        );
      })}
    </svg>
  );
}

Object.assign(window, { ScreenCompare, Radar });
