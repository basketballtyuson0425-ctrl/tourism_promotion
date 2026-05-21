// 04 — 地域比較: 伊勢志摩 vs 白馬・ニセコ
function ScreenCompare() {
  const regions = [
    { name: '伊勢志摩', color: T.shu,   tone: 'shu',  active: true,
      kpi: { vid: 1284, view: 4.62, sent: 0.71, foreign: 38, growth: 18.4 } },
    { name: '白馬',     color: T.sea,   tone: 'sea',  active: true,
      kpi: { vid: 2840, view: 14.2, sent: 0.78, foreign: 74, growth: 42.1 } },
    { name: 'ニセコ',    color: T.pine,  tone: 'pine', active: true,
      kpi: { vid: 3120, view: 22.8, sent: 0.81, foreign: 82, growth: 56.3 } },
  ];

  const axes = [
    { ax: '海外の言語での投稿割合',       v: [38, 74, 82] },
    { ax: '旅ブログの多さ',          v: [42, 78, 81] },
    { ax: 'ショート動画の多さ',         v: [28, 64, 71] },
    { ax: '有名YouTuberの投稿',         v: [18, 62, 84] },
    { ax: '体験型の動画',           v: [44, 71, 68] },
    { ax: 'いい評価の割合',             v: [71, 78, 81] },
  ];

  const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  return (
    <AppFrame>
      <Sidebar active="compare" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['見る', '他の観光地と比べる']}
          title="他の人気観光地と比べてみる"
          subtitle="伊勢志摩 / 白馬 / ニセコ · この1年間"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.globe} 比べる地域を追加</button>
            <button style={btnDark()}>{Ico.download} この画面を資料にする</button>
          </div>}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 18, background: T.paper, overflow: 'hidden' }}>
          {/* Region selector chips */}
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
            <span style={{ fontSize: 11, color: T.muted }}>見ている項目: 動画数・見られた回数・いい評価の割合・海外の割合 / この1年間</span>
          </div>

          {/* 比較する数字を一覧で */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
            {[
              ['投稿された動画の数', regions.map(r => r.kpi.vid.toLocaleString() + ' 本')],
              ['見られた回数',       regions.map(r => (r.kpi.view * 100).toFixed(0) + '万 回')],
              ['いい評価の割合',     regions.map(r => Math.round(r.kpi.sent * 100) + '%')],
              ['海外からの割合',     regions.map(r => r.kpi.foreign + '%')],
              ['前年比のびしろ',     regions.map(r => '+' + r.kpi.growth + '%')],
            ].map(([label, vals], i) => (
              <div key={label} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 8 }}>{label}</div>
                {vals.map((v, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'baseline', gap: 6, marginTop: j ? 4 : 0,
                    opacity: j === 0 ? 1 : 0.95,
                  }}>
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

          {/* Radar + Trend */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 12, flex: 1, minHeight: 0 }}>
            <Card title="6つの視点で見た「動画の出店力」の差" action={<span style={{ fontSize: 10.5, color: T.muted }}>それぞれ0～100点で表示</span>}>
              <Radar size={300} axes={axes} regions={regions} />
              <div style={{ marginTop: 10, fontSize: 11, color: T.body, lineHeight: 1.6 }}>
                伊勢志摩は <b style={{ color: T.shu }}>「体験型の動画」</b> で他地域と肩を並べる一方、
                <b style={{ color: T.shu }}>「ショート動画」「有名YouTuberの投稿」「海外の言語での投稿」</b> で
                40～60点の開きがあります。
              </div>
            </Card>

            <Card title="海外からの動画投稿数の推移" action={
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
                  { name: '伊勢志摩', color: T.shu,  data: [38,42,45,48,52,58,62,71,78,83,91,104] },
                  { name: '白馬',     color: T.sea,  data: [120,135,148,162,178,205,238,262,288,310,341,372] },
                  { name: 'ニセコ',   color: T.pine, data: [180,202,230,258,288,318,346,378,408,438,466,498] },
                ]}
                yMax={520} legend={false}
              />
            </Card>
          </div>

          {/* Key takeaways */}
          <div style={{
            background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 14,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {[
              { tag: 'さはさざん', tone: 'shu', ttl: 'ショート動画の活用がもっともも足りない',
                d: '伊勢志摩のショート動画の割合は 28%、ニセコは 71%。スマホでさっと見る欧米の若い世代に届いていません。' },
              { tag: 'さはさざん', tone: 'shu', ttl: '有名YouTuberとの連携が弱い',
                d: '白馬・ニセコは欧米の人気YouTuberがよく訪れています。伊勢志摩の他地域の 1/4 以下の言及数です。' },
              { tag: 'つよみ', tone: 'pine', ttl: '体験・文化体験は万難を雄しています',
                d: '海女体験・神宮参拝など「日本でしかできない」体験の評価は白馬・ニセコと同水準。見せ方を工夫すれば逆転も可能です。' },
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

// Radar chart — 3 series over N axes
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
