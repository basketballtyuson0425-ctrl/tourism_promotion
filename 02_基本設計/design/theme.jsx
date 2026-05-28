// 伊勢観光分析 — common theme tokens, atoms, and tiny chart primitives.
// All exported to window for cross-script access.

const T = {
  // Palette — 伊勢志摩の海と森を想起させる深い藍 + 朱のアクセント
  ink:     '#15171c',
  ink2:    '#2a2f38',
  body:    '#4a5260',
  muted:   '#8b94a3',
  faint:   '#cfd3dc',
  line:    '#e6e4dd',
  line2:   '#f0ede4',
  paper:   '#faf7f0',
  card:    '#ffffff',
  navy:    '#1b3a5b',
  navy2:   '#2b5786',
  sea:     '#3b7ab0',
  seaSoft: '#dde7f1',
  pine:    '#2f6b54',
  pineSoft:'#dde8e1',
  shu:     '#c5432c',   // 朱
  shu2:    '#e36a4c',
  shuSoft: '#f6e0d8',
  gold:    '#b88a3a',
  warn:    '#c97a1b',
  goodBg:  '#e6efe7',
  good:    '#2f6b54',
  badBg:   '#f6e2dc',
  bad:     '#c5432c',
  // Type
  sans: '"Noto Sans JP", "Hiragino Sans", system-ui, -apple-system, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
  num:  '"Inter", "Helvetica Neue", system-ui, sans-serif',
};

// ---- Inline SVG icons (16px stroke) -------------------------------------
const Ico = {
  search: <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5 14 14"/></svg>,
  bell:   <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 11V7a4 4 0 1 1 8 0v4l1 1.5H3L4 11Z"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/></svg>,
  chev:   <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6.5 8 10.5 12 6.5"/></svg>,
  up:     <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 10 8 5l5 5"/></svg>,
  down:   <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6l5 5 5-5"/></svg>,
  play:   <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M5 3.5v9l8-4.5-8-4.5Z"/></svg>,
  spark:  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M12 4l-2 2M6 10l-2 2"/></svg>,
  pin:    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 14c2.5-3 4.5-5.4 4.5-8a4.5 4.5 0 0 0-9 0c0 2.6 2 5 4.5 8Z"/><circle cx="8" cy="6" r="1.6"/></svg>,
  tag:    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 3h5l5 5-5 5-5-5V3Z"/><circle cx="6" cy="6" r="1"/></svg>,
  globe:  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="8" cy="8" r="5.5"/><path d="M2.5 8h11M8 2.5c1.8 2 1.8 9 0 11M8 2.5c-1.8 2-1.8 9 0 11"/></svg>,
  filter: <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 4h12M4.5 8h7M7 12h3"/></svg>,
  download:<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v8M5 7l3 3 3-3M3 13h10"/></svg>,
  sparkle:<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M8 1.5l1.4 4.1 4.1 1.4-4.1 1.4L8 12.5 6.6 8.4 2.5 7l4.1-1.4L8 1.5Z"/></svg>,
  more:   <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/></svg>,
  ext:    <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M7 3H3v10h10V9M9 3h4v4M13 3 8 8"/></svg>,
  check:  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 8.5 3.5 3L13 5"/></svg>,
  warn:   <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2 14 13H2L8 2Z"/><path d="M8 6.5v3M8 11.5v.5"/></svg>,
};

// ---- Sidebar -------------------------------------------------------------
function Sidebar({ active }) {
  const items = [
    ['今週のあらまし', 'dashboard'],
    ['旅行者の動画', 'videos'],
    ['動画の中身を見る', 'video-detail'],
    ['他の観光地と比べる', 'compare'],
    ['伊勢志摩の地図で見る', 'map'],
    ['使い方を学ぶ', 'help'],
    ['資料をつくる', 'reports'],
    ['YouTubeデータ管理', 'ingestion'],
    ['設定', 'settings'],
  ];
  return (
    <aside style={{
      width: 220, background: T.ink, color: '#cfd3dc', flex: '0 0 auto',
      display: 'flex', flexDirection: 'column', fontSize: 13, fontFamily: T.sans,
    }}>
      <div style={{ padding: '20px 18px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, background: T.shu,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontFamily: T.num, fontSize: 14,
        }}>⛩</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, letterSpacing: 0.2 }}>伊勢観光分析</div>
          <div style={{ fontSize: 10.5, color: T.muted, marginTop: 1 }}>伊勢志摩 観光プロモーション支援システム</div>
        </div>
      </div>
      <div style={{ padding: '6px 12px 8px', fontSize: 10, color: T.muted, letterSpacing: 1 }}>みる</div>
      {items.slice(0, 5).map(([label, key]) => (
        <div key={key} style={{
          padding: '8px 18px', cursor: 'pointer',
          background: active === key ? 'rgba(255,255,255,0.06)' : 'transparent',
          color: active === key ? '#fff' : '#cfd3dc',
          borderLeft: active === key ? `2px solid ${T.shu2}` : '2px solid transparent',
          paddingLeft: active === key ? 16 : 18,
        }}>{label}</div>
      ))}
      <div style={{ padding: '14px 12px 8px', fontSize: 10, color: T.muted, letterSpacing: 1 }}>つかう</div>
      {items.slice(5).map(([label, key]) => (
        <div key={key} style={{
          padding: '8px 18px', cursor: 'pointer', color: '#cfd3dc',
          background: active === key ? 'rgba(255,255,255,0.06)' : 'transparent',
          borderLeft: active === key ? `2px solid ${T.shu2}` : '2px solid transparent',
          paddingLeft: active === key ? 16 : 18,
        }}>{label}</div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{
        margin: 12, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>データの新しさ</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#5bc28a', boxShadow: '0 0 6px #5bc28a' }} />
          2 分前に更新
        </div>
      </div>
    </aside>
  );
}

// ---- Topbar --------------------------------------------------------------
function Topbar({ title, subtitle, breadcrumbs, right }) {
  return (
    <div style={{
      height: 58, borderBottom: `1px solid ${T.line}`, background: T.card,
      display: 'flex', alignItems: 'center', padding: '0 22px', gap: 16, flex: '0 0 auto',
    }}>
      <div style={{ minWidth: 0 }}>
        {breadcrumbs && (
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 1 }}>
            {breadcrumbs.map((b, i) => (
              <span key={i}>{i > 0 && <span style={{ margin: '0 6px' }}>›</span>}{b}</span>
            ))}
          </div>
        )}
        <div style={{ fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: 0.2 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
        background: T.paper, borderRadius: 6, fontSize: 12, color: T.body, width: 280,
      }}>
        <span style={{ color: T.muted }}>{Ico.search}</span>
        <span style={{ color: T.muted }}>動画・コメント・言葉で探す</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: T.muted, fontFamily: T.mono }}>⌘K</span>
      </div>
      {right}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: T.body }}>
        <button style={iconBtn()}>{Ico.bell}</button>
      </div>
    </div>
  );
}

function iconBtn() {
  return {
    width: 32, height: 32, borderRadius: 6, border: `1px solid ${T.line}`,
    background: T.card, color: T.body, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}

// ---- Pills / chips -------------------------------------------------------
function Chip({ children, tone = 'neutral', active = false }) {
  const map = {
    neutral: { bg: T.paper, fg: T.body, bd: T.line },
    sea:     { bg: T.seaSoft, fg: T.navy2, bd: '#cfdbe8' },
    pine:    { bg: T.pineSoft, fg: T.pine, bd: '#cadccd' },
    shu:     { bg: T.shuSoft, fg: T.shu, bd: '#eccfbf' },
    ink:     { bg: T.ink, fg: '#fff', bd: T.ink },
  };
  const c = map[tone] || map.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 999, fontSize: 11,
      background: active ? T.ink : c.bg, color: active ? '#fff' : c.fg,
      border: `1px solid ${active ? T.ink : c.bd}`,
      whiteSpace: 'nowrap', fontFamily: T.sans,
    }}>{children}</span>
  );
}

function Delta({ value, suffix = '%', invert = false }) {
  const up = value > 0;
  const good = invert ? !up : up;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      color: good ? T.good : T.bad, fontSize: 11, fontFamily: T.num, fontWeight: 600,
    }}>
      {up ? Ico.up : Ico.down}{Math.abs(value)}{suffix}
    </span>
  );
}

// ---- Card containers -----------------------------------------------------
function Card({ children, title, action, padding = 16, style }) {
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.line}`, borderRadius: 10,
      display: 'flex', flexDirection: 'column', overflow: 'hidden', ...style,
    }}>
      {title && (
        <div style={{
          padding: '12px 16px', borderBottom: `1px solid ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{title}</div>
          <div style={{ flex: 1 }} />
          {action}
        </div>
      )}
      <div style={{ padding, flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}

// ---- Tiny charts ---------------------------------------------------------
function Sparkline({ data, width = 100, height = 28, color = T.navy2, fill = true }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y];
  });
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.12" />}
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Multi-line chart
function LineChart({ series, width = 600, height = 200, xLabels = [], yMax, legend = true }) {
  const allVals = series.flatMap(s => s.data);
  const max = yMax || Math.max(...allVals);
  const min = 0;
  const pad = { l: 36, r: 12, t: 10, b: 22 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const n = series[0].data.length;
  const x = i => pad.l + (i / (n - 1)) * w;
  const y = v => pad.t + h - ((v - min) / (max - min)) * h;
  const grid = [0, 0.25, 0.5, 0.75, 1].map(t => min + (max - min) * t);
  return (
    <div>
      <svg width={width} height={height} style={{ display: 'block', fontFamily: T.num }}>
        {grid.map((g, i) => (
          <g key={i}>
            <line x1={pad.l} x2={width - pad.r} y1={y(g)} y2={y(g)} stroke={T.line2} />
            <text x={pad.l - 6} y={y(g) + 3} fontSize="10" fill={T.muted} textAnchor="end">{Math.round(g).toLocaleString()}</text>
          </g>
        ))}
        {xLabels.map((l, i) => i % Math.max(1, Math.floor(xLabels.length / 6)) === 0 && (
          <text key={i} x={x(i)} y={height - 6} fontSize="10" fill={T.muted} textAnchor="middle">{l}</text>
        ))}
        {series.map((s, si) => {
          const path = s.data.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
          return (
            <g key={si}>
              {s.fill !== false && <path d={path + ` L ${x(n-1)} ${y(0)} L ${x(0)} ${y(0)} Z`} fill={s.color} opacity="0.08" />}
              <path d={path} stroke={s.color} strokeWidth={s.width || 1.6} fill="none" strokeDasharray={s.dash || ''} />
            </g>
          );
        })}
      </svg>
      {legend && (
        <div style={{ display: 'flex', gap: 14, padding: '4px 0 0 36px', fontSize: 11, color: T.body }}>
          {series.map((s, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 2, background: s.color, borderRadius: 2 }} />{s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Horizontal bar
function Bar({ value, max, color = T.navy2, height = 6, bg = T.paper }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ background: bg, borderRadius: 999, height, overflow: 'hidden', minWidth: 24 }}>
      <div style={{ width: pct + '%', background: color, height: '100%', borderRadius: 999 }} />
    </div>
  );
}

// Number with monospace numerics
function Num({ value, unit, size = 22, weight = 600 }) {
  return (
    <span style={{ fontFamily: T.num, fontWeight: weight, fontSize: size, color: T.ink, letterSpacing: -0.4 }}>
      {value}{unit && <span style={{ fontSize: size * 0.55, color: T.muted, marginLeft: 2, fontWeight: 500 }}>{unit}</span>}
    </span>
  );
}

// Image placeholder — subtly striped, monospace label
function Placeholder({ label, height = 120, accent = T.sea }) {
  return (
    <div style={{
      height, width: '100%', borderRadius: 6,
      background: `repeating-linear-gradient(135deg, ${accent}22, ${accent}22 6px, ${accent}11 6px, ${accent}11 12px)`,
      border: `1px dashed ${accent}66`, color: accent,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.mono, fontSize: 10.5, letterSpacing: 0.5, textTransform: 'uppercase',
    }}>{label}</div>
  );
}

// ---- Artboard frame ------------------------------------------------------
// Wraps each screen in a uniform "browser window" so they look like real apps.
function AppFrame({ children, width = 1440, height = 900 }) {
  return (
    <div style={{
      width, height, background: T.paper, fontFamily: T.sans,
      color: T.body, display: 'flex', overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

Object.assign(window, {
  T, Ico, Sidebar, Topbar, Chip, Delta, Card, Sparkline, LineChart, Bar, Num, Placeholder, AppFrame,
});

