// 00 — 画面のつながり: 左→右の流れで整理した画面遷移図
function ScreenFlow() {
  // ───────────────────────────────────────────────────────────
  //  4 つのレーン × 番号付きステップで「左から右」に流れる構成
  //  Lane A (上段): メインの動線  Login → Dashboard → Videos → Video Detail
  //  Lane B (中段): 横展開          Compare / Map (Dashboard からの派生)
  //  Lane C (下段): アウトプット   Reports (全分析画面の合流先)
  //  Lane D (最下): サポート/運用 Help · Ingestion · Settings (矢印なし)
  // ───────────────────────────────────────────────────────────

  const screens = {
    login:     { no: '00', label: 'ログイン',           desc: 'SSO · 二段階認証',                     x: 60,   y: 220, w: 230, h: 140, group: 'entry' },
    dashboard: { no: '01', label: '今週のあらまし',     desc: '主な数字 · のびしろ · 話題',           x: 360,  y: 200, w: 280, h: 180, group: 'hub', hub: true },
    videos:    { no: '02', label: '旅行者の動画一覧',   desc: '言語や評価で絞り込む',                 x: 740,  y: 220, w: 230, h: 140, group: 'analysis' },
    video:     { no: '03', label: '動画の中身を見る',   desc: '評価 / 話題 / 出てきた場所',           x: 1070, y: 220, w: 230, h: 140, group: 'analysis' },
    compare:   { no: '04', label: '他の観光地と比べる', desc: '伊勢志摩 vs 広島県（宮島）',           x: 740,  y: 440, w: 230, h: 130, group: 'analysis' },
    map:       { no: '05', label: '地図で見る',         desc: '話題のあった場所を地図で',             x: 1070, y: 440, w: 230, h: 130, group: 'analysis' },
    reports:   { no: '06', label: '資料をつくる',       desc: '議会・関係者用の資料を作成',           x: 1400, y: 320, w: 240, h: 150, group: 'output' },
    help:      { no: '07', label: '使い方を学ぶ',       desc: 'はじめての人向け',                     x: 360,  y: 720, w: 230, h: 130, group: 'support' },
    ingestion: { no: '08', label: 'サンプルデータ管理', desc: '提出デモ用データの確認',             x: 740,  y: 720, w: 230, h: 130, group: 'support' },
    settings:  { no: '09', label: '設定',               desc: 'メンバー / 連携 / 表示',               x: 1070, y: 720, w: 230, h: 130, group: 'support' },
  };

  const groupStyle = {
    entry:    { bg: '#fff',   bd: T.muted, accent: T.muted, fg: T.ink },
    hub:      { bg: T.ink,    bd: T.ink,   accent: T.shu,   fg: '#fff'  },
    analysis: { bg: T.card,   bd: T.navy2, accent: T.navy2, fg: T.ink   },
    output:   { bg: T.card,   bd: T.shu,   accent: T.shu,   fg: T.ink   },
    support:  { bg: T.card,   bd: T.pine,  accent: T.pine,  fg: T.ink   },
  };

  // 「主動線」= 番号付きで強調する黒い矢印 / 「派生」= 細い navy / 「合流」= shu
  const edges = [
    // 主動線 (番号付きステップ)
    { from: 'login',     to: 'dashboard', step: 1, kind: 'main' },
    { from: 'dashboard', to: 'videos',    step: 2, kind: 'main' },
    { from: 'videos',    to: 'video',     step: 3, kind: 'main' },
    // 派生
    { from: 'dashboard', to: 'compare',   kind: 'branch' },
    { from: 'dashboard', to: 'map',       kind: 'branch' },
    // 合流 → Reports
    { from: 'video',     to: 'reports',   kind: 'collect' },
    { from: 'compare',   to: 'reports',   kind: 'collect' },
    { from: 'map',       to: 'reports',   kind: 'collect' },
  ];

  const edgeColor = { main: T.ink, branch: T.navy2, collect: T.shu };

  // 各画面の接続点を計算 (上下左右の中央のいずれか)
  function anchor(s, side) {
    if (side === 'r') return [s.x + s.w, s.y + s.h / 2];
    if (side === 'l') return [s.x,        s.y + s.h / 2];
    if (side === 't') return [s.x + s.w / 2, s.y];
    if (side === 'b') return [s.x + s.w / 2, s.y + s.h];
    return [s.x + s.w / 2, s.y + s.h / 2];
  }

  // 各エッジの始終点とパスタイプを明示的に決定 (自動推測ではなく)
  function edgePath(e) {
    const a = screens[e.from], b = screens[e.to];
    // login → dashboard / dashboard → videos / videos → video : 水平直線
    if (e.kind === 'main') {
      const [x1, y1] = anchor(a, 'r');
      const [x2, y2] = anchor(b, 'l');
      return { d: `M ${x1} ${y1} L ${x2} ${y2}`, mid: [(x1+x2)/2, (y1+y2)/2] };
    }
    // dashboard → compare / map : L字 (右側面から下方向)
    if (e.from === 'dashboard' && (e.to === 'compare' || e.to === 'map')) {
      const [x1, y1] = anchor(a, 'r');
      const [x2, y2] = anchor(b, 'l');
      // 縦に下がってから横に行くL字 (角丸)
      const r = 14;
      const turnX = a.x + a.w + 30;
      return {
        d: `M ${x1} ${y1} L ${turnX - r} ${y1} Q ${turnX} ${y1} ${turnX} ${y1 + Math.sign(y2 - y1) * r}
            L ${turnX} ${y2 - Math.sign(y2 - y1) * r} Q ${turnX} ${y2} ${turnX + r} ${y2} L ${x2} ${y2}`,
        mid: [turnX + (x2 - turnX) / 2, y2],
      };
    }
    // 各分析画面 → Reports : 右辺から右へ伸ばし、Reports の左辺へ合流
    if (e.to === 'reports') {
      const [x1, y1] = anchor(a, 'r');
      const [x2, y2] = anchor(b, 'l');
      const r = 12;
      const turnX = 1340;
      if (Math.abs(y1 - y2) < 4) {
        return { d: `M ${x1} ${y1} L ${x2} ${y2}`, mid: [(x1+x2)/2, y1] };
      }
      const dir = Math.sign(y2 - y1);
      return {
        d: `M ${x1} ${y1} L ${turnX - r} ${y1} Q ${turnX} ${y1} ${turnX} ${y1 + dir * r}
            L ${turnX} ${y2 - dir * r} Q ${turnX} ${y2} ${turnX + r} ${y2} L ${x2} ${y2}`,
        mid: [turnX + 4, y1 + (y2 - y1) * 0.4],
      };
    }
    return { d: '', mid: [0, 0] };
  }

  return (
    <div style={{
      width: 1800, height: 1040, background: T.paper, fontFamily: T.sans, color: T.body,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ── ヘッダー ──────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 60, top: 36, right: 60,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 11, color: T.shu, letterSpacing: 3 }}>SITEMAP · 全 10 画面</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: T.ink, marginTop: 6, lineHeight: 1.2, letterSpacing: 0.3 }}>
            伊勢観光分析 — 画面のつながり
          </div>
          <div style={{ fontSize: 13, color: T.body, marginTop: 6 }}>
            ログインから議会向け資料の作成まで、左から右に流れる 1 本の動線で確認できます
          </div>
        </div>
        {/* 凡例 */}
        <div style={{
          display: 'flex', gap: 18, fontSize: 11, color: T.body,
          background: T.card, border: `1px solid ${T.line}`, borderRadius: 8, padding: '10px 14px',
        }}>
          <Legend color={T.ink}   shape="line">主動線</Legend>
          <Legend color={T.navy2} shape="line">派生 (分析)</Legend>
          <Legend color={T.shu}   shape="line">資料へ合流</Legend>
          <div style={{ width: 1, background: T.line }} />
          <Legend color={T.muted} shape="dot">入り口</Legend>
          <Legend color={T.navy2} shape="dot">分析</Legend>
          <Legend color={T.shu}   shape="dot">資料</Legend>
          <Legend color={T.pine}  shape="dot">サポート</Legend>
        </div>
      </div>

      {/* ── スイムレーンのラベル & 区切り背景 ───────────────────── */}
      {[
        { y: 170, h: 410, label: '毎日見て · もっと知る',  sub: 'メインの分析ワークフロー', c: T.navy2 },
        { y: 690, h: 170, label: 'サポートと運用',         sub: '初期設定や使い方を確認するとき', c: T.pine },
      ].map((lane, i) => (
        <div key={i} style={{
          position: 'absolute', left: 60, top: lane.y, width: 1680, height: lane.h,
          borderRadius: 14, background: i === 0 ? 'rgba(43,87,134,0.035)' : 'rgba(47,107,84,0.04)',
          border: `1px dashed ${i === 0 ? '#c7d3e1' : '#cadccd'}`,
        }}>
          <div style={{
            position: 'absolute', left: 16, top: 14,
            fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: lane.c,
          }}>{lane.label}</div>
          <div style={{
            position: 'absolute', left: 16, top: 30, fontSize: 10.5, color: T.muted,
          }}>{lane.sub}</div>
        </div>
      ))}

      {/* ── エッジ (SVG) ──────────────────────────────────────── */}
      <svg width="1800" height="1040" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          {Object.entries(edgeColor).map(([k, c]) => (
            <marker key={k} id={`fa-${k}`} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={c} />
            </marker>
          ))}
        </defs>
        {edges.map((e, i) => {
          const { d } = edgePath(e);
          const c = edgeColor[e.kind];
          return (
            <path key={i} d={d} fill="none" stroke={c}
              strokeWidth={e.kind === 'main' ? 2.2 : 1.6}
              strokeLinejoin="round" strokeLinecap="round"
              strokeDasharray={e.kind === 'collect' ? '4 4' : ''}
              markerEnd={`url(#fa-${e.kind})`}
              opacity={e.kind === 'branch' ? 0.85 : 1}
            />
          );
        })}
        {/* 主動線のステップバッジ */}
        {edges.filter(e => e.kind === 'main').map((e, i) => {
          const { mid } = edgePath(e);
          return (
            <g key={'step-' + i} transform={`translate(${mid[0]}, ${mid[1] - 16})`}>
              <circle cx="0" cy="0" r="11" fill={T.ink} />
              <text x="0" y="3.5" fontSize="11" fontFamily={T.num} fontWeight="700"
                fill="#fff" textAnchor="middle">{e.step}</text>
            </g>
          );
        })}
      </svg>

      {/* ── 画面カード ────────────────────────────────────────── */}
      {Object.entries(screens).map(([id, s]) => {
        const g = groupStyle[s.group];
        return (
          <div key={id} style={{
            position: 'absolute', left: s.x, top: s.y, width: s.w, height: s.h,
            background: g.bg, border: `1.5px solid ${g.bd}`,
            borderRadius: 10, padding: '14px 16px',
            boxShadow: s.hub
              ? '0 14px 32px rgba(21, 23, 28, 0.22), 0 0 0 4px rgba(197,67,44,0.10)'
              : '0 2px 10px rgba(0,0,0,0.04)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                fontFamily: T.num, fontSize: 11, fontWeight: 700, color: '#fff',
                background: g.accent, padding: '2px 7px', borderRadius: 3, letterSpacing: 0.5,
              }}>{s.no}</span>
              {s.hub && (
                <span style={{
                  fontSize: 10, padding: '2px 6px', borderRadius: 999,
                  background: T.shu, color: '#fff', fontWeight: 600, letterSpacing: 0.5,
                }}>★ HUB</span>
              )}
              <span style={{ flex: 1 }} />
              <span style={{
                fontSize: 10, color: s.hub ? T.faint : T.muted, fontFamily: T.mono,
              }}>{s.group}</span>
            </div>
            <div style={{
              fontSize: 16, fontWeight: 700, color: g.fg, marginTop: 10, letterSpacing: 0.5,
              lineHeight: 1.3,
            }}>{s.label}</div>
            <div style={{
              fontSize: 11.5, color: s.hub ? T.faint : T.body, marginTop: 4, lineHeight: 1.5,
            }}>{s.desc}</div>
            <div style={{ flex: 1 }} />
            {/* mini preview bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 14 }}>
              {[0.5, 0.8, 0.4, 0.7, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: 3 + h * 11, background: s.hub ? T.shu2 : g.accent,
                  opacity: s.hub ? 0.5 : 0.22, borderRadius: 1.5,
                }} />
              ))}
            </div>
          </div>
        );
      })}

      {/* ── 下部: 3 つのユースケース ─────────────────────────── */}
      <div style={{
        position: 'absolute', left: 60, bottom: 36, right: 60,
        display: 'flex', gap: 14,
      }}>
        {[
          { ttl: '毎朝の確認',          steps: ['ログイン', '今週のあらまし', '話題の動画を見る'],          tone: T.navy2 },
          { ttl: '月末の振り返り',      steps: ['今週のあらまし', '他観光地と比較', '地図で見る', '資料をつくる'], tone: T.shu },
          { ttl: '新しい人が入ったとき', steps: ['使い方を学ぶ', '今週のあらまし', '取り込み / 設定を確認'],  tone: T.pine },
        ].map(c => (
          <div key={c.ttl} style={{
            flex: 1, background: T.card, border: `1px solid ${T.line}`, borderLeft: `4px solid ${c.tone}`,
            borderRadius: 8, padding: '12px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{
                fontSize: 10, padding: '1px 7px', borderRadius: 3,
                background: c.tone, color: '#fff', letterSpacing: 0.5, fontWeight: 600,
              }}>USE CASE</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{c.ttl}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', fontSize: 11.5, color: T.body }}>
              {c.steps.map((step, i) => (
                <React.Fragment key={i}>
                  <span style={{
                    padding: '3px 9px', background: T.paper, border: `1px solid ${T.line}`,
                    borderRadius: 999, whiteSpace: 'nowrap',
                  }}>{step}</span>
                  {i < c.steps.length - 1 && (
                    <span style={{ color: c.tone, fontSize: 13, fontWeight: 700 }}>›</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ color, shape, children }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {shape === 'line' ? (
        <span style={{ width: 18, height: 2, background: color, borderRadius: 1 }} />
      ) : (
        <span style={{ width: 9, height: 9, background: color, borderRadius: 2 }} />
      )}
      {children}
    </span>
  );
}

Object.assign(window, { ScreenFlow, Legend });

