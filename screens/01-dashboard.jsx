// 01 — Dashboard: 概況
function ScreenDashboard() {
  const monthlyVid = [42, 48, 51, 58, 62, 71, 83, 78, 91, 104, 118, 132];
  const monthlyView = [12, 14, 13, 18, 22, 28, 33, 36, 41, 48, 56, 62];
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const kpis = [
  { label: '旅行者の投稿動画数', value: '1,284', delta: 18.4, unit: '本', sub: 'この30日間' },
  { label: '動画を見られた回数', value: '462万', delta: 31.2, unit: '回', sub: '海外からが 68%' },
  { label: 'コメントの数', value: '38,910', delta: 9.6, unit: '件', sub: '8言語のコメント' },
  { label: 'いい評価の割合', value: '71', delta: 8, unit: '%', sub: '100点満点で重み付け' }];


  const topVideos = [
  { ttl: '他では味わえない、伊勢神宮の特別な空気', orig: 'Why Ise Jingu felt unlike any shrine in Japan', ch: '@WanderTales', view: '1.42M', sent: 0.88, lang: 'EN', days: 12 },
  { ttl: '伊勢志摩で食べた牡蠣がやばすぎた【海女小屋体験】', orig: '', ch: 'タビノオト', view: '986K', sent: 0.82, lang: 'JP', days: 3 },
  { ttl: '英虞湾サンセットクルーズ｜2泊3日リゾート', orig: '', ch: 'タビ寿司', view: '742K', sent: 0.76, lang: 'JP', days: 28 },
  { ttl: '伊勢神宮 早朝参拝 vlog | 4K シネマティック', orig: 'Ise Jingu early-morning visit vlog | 4K cinematic', ch: '@kyotomood', view: '631K', sent: 0.71, lang: 'EN', days: 9 },
  { ttl: '松阪牛を初めて食べてみた', orig: 'Trying Matsusaka Beef for the first time', ch: '@AbroadInJapan', view: '512K', sent: 0.69, lang: 'EN', days: 41 }];


  const keywords = [
  { kw: '伊勢神宮', orig: 'Ise Jingu', cnt: 4820, delta: 24 },
  { kw: '伊勢海老', orig: '', cnt: 3140, delta: 18 },
  { kw: '英虞湾', orig: 'Ago Bay', cnt: 2680, delta: 42 },
  { kw: '海女ダイバー', orig: 'ama divers', cnt: 2330, delta: 61 },
  { kw: '神域の森', orig: 'sacred forest', cnt: 1980, delta: 12 },
  { kw: '真珠養殖場', orig: 'pearl farm', cnt: 1740, delta: 8 },
  { kw: '夫婦岩', orig: '', cnt: 1620, delta: -4 },
  { kw: 'おかげ横丁', orig: 'okage yokocho', cnt: 1480, delta: 31 }];


  const sentByTopic = [
  { t: '伊勢神宮の神区での体験', pos: 78, neu: 18, neg: 4 },
  { t: '英虞湾でのクルーズ', pos: 71, neu: 24, neg: 5 },
  { t: '海女体験・漁村の暮らし', pos: 84, neu: 13, neg: 3 },
  { t: '海産物・伊勢うどんなどの食', pos: 76, neu: 19, neg: 5 },
  { t: '名古屋・関西からの交通', pos: 32, neu: 35, neg: 33 },
  { t: '宿泊・価格', pos: 48, neu: 38, neg: 14 }];


  return (
    <AppFrame>
      <Sidebar active="dashboard" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="今週のあらまし — 伊勢志摩の手ごたえ"
          right={
          <div style={{ display: 'flex', gap: 6, fontSize: 12 }}>
              <button style={btn()}>{Ico.globe} 表示: 日本語</button>
              <button style={btn()}>{Ico.filter} 期間や言語で絞る</button>
              <button style={btnDark()}>{Ico.download} この画面を資料にする</button>
            </div>
          } />
        

        <div style={{ flex: 1, overflow: 'hidden', padding: 18, display: 'flex', flexDirection: 'column', gap: 14, background: T.paper }}>
          {/* Period selector + KPIs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: T.muted }}>いつの数字を見るか:</span>
            <div style={{ display: 'flex', background: T.card, border: `1px solid ${T.line}`, borderRadius: 8, padding: 3, fontSize: 12 }}>
              {['1週間', '1ヶ月', '3ヶ月', '1年', '自由に選ぶ'].map((p, i) =>
              <div key={i} style={{
                padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                background: i === 3 ? T.ink : 'transparent',
                color: i === 3 ? '#fff' : T.body
              }}>{p}</div>
              )}
            </div>
            <div style={{ flex: 1 }} />
            <Chip tone="pine">● 自動で取り込み中</Chip>
            <span style={{ fontSize: 11, color: T.muted }}>最終更新: 2026年5月18日 9:42</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {kpis.map((k) =>
            <div key={k.label} style={{
              background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 14
            }}>
                <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 6 }}>{k.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <Num value={k.value} unit={k.unit} size={24} />
                  <Delta value={k.delta} suffix={k.unit === '' ? '' : '%'} />
                </div>
                <div style={{ fontSize: 10.5, color: T.muted, marginTop: 6 }}>{k.sub}</div>
              </div>
            )}
          </div>

          {/* Trend chart + Topics column */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
            <Card title="動画の多さと見られている勢い" action={
            <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: T.body }}>
                  <span style={{ width: 10, height: 2, background: T.navy2 }} /> 投稿された動画の数
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: T.body }}>
                  <span style={{ width: 10, height: 2, background: T.shu }} /> 海外から見られた回数
                </span>
              </div>
            }>
              <LineChart
                width={560} height={210} xLabels={months}
                series={[
                { name: '動画の数', color: T.navy2, data: monthlyVid },
                { name: '海外視聴', color: T.shu, data: monthlyView.map((v) => v * 2.5), fill: false, dash: '4 3' }]
                }
                legend={false} />
              
              <div style={{ display: 'flex', gap: 8, marginTop: 8, paddingTop: 10, borderTop: `1px solid ${T.line2}` }}>
                <span style={{ fontSize: 11, color: T.muted, marginRight: 2 }}>人気上昇中の話題:</span>
                {['#伊勢神宮', '#海女体験', '#英虞湾', '#松阪牛', '#真珠をとりに潜る'].map((h, i) =>
                <Chip key={i} tone={i === 1 ? 'shu' : 'neutral'}>{h} <span style={{ color: T.muted, marginLeft: 2 }}>+{[12, 61, 42, 9, 8][i]}%</span></Chip>
                )}
              </div>
            </Card>

            <Card title="どんなことがよく話題になっているか" action={
            <div style={{ display: 'flex', gap: 8, fontSize: 10.5, color: T.muted }}>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, background: T.pine, borderRadius: 2, marginRight: 4 }} />ホメられている</span>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, background: T.faint, borderRadius: 2, marginRight: 4 }} />ふつう</span>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, background: T.shu, borderRadius: 2, marginRight: 4 }} />不満・課題</span>
              </div>
            }>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {sentByTopic.map((s) =>
                <div key={s.t}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: T.ink2 }}>{s.t}</span>
                      <span style={{ fontFamily: T.num, fontSize: 11, color: T.body }}>{s.pos}% / {s.neu}% / {s.neg}%</span>
                    </div>
                    <div style={{ display: 'flex', height: 6, borderRadius: 999, overflow: 'hidden', background: T.line2 }}>
                      <div style={{ width: s.pos + '%', background: T.pine }} />
                      <div style={{ width: s.neu + '%', background: T.faint }} />
                      <div style={{ width: s.neg + '%', background: T.shu }} />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Top videos + keywords */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 12 }}>
            <Card title="いま伸びている海外の動画" padding={0}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ color: T.muted, fontWeight: 500, background: T.paper, fontSize: 10.5 }}>
                    <th style={th()}>動画タイトル (日本語訳)</th>
                    <th style={th(60)}>言語</th>
                    <th style={th(80, 'right')}>見られた回数</th>
                    <th style={th(80, 'right')}>いい評価</th>
                    <th style={th(60, 'right')}>公開から</th>
                  </tr>
                </thead>
                <tbody>
                  {topVideos.map((v, i) =>
                  <tr key={i} style={{ borderTop: `1px solid ${T.line2}` }}>
                      <td style={td()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                          width: 42, height: 26, borderRadius: 3,
                          background: `linear-gradient(135deg, ${[T.navy, T.shu, T.sea, T.pine, T.gold][i]} 0%, ${T.ink2} 100%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                        }}>{Ico.play}</div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ color: T.ink, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 340 }}>{v.ttl}</div>
                            <div style={{ color: T.muted, fontSize: 10.5 }}>
                              {v.ch}{v.orig && <span style={{ color: T.faint }}> · 原題: {v.orig}</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={td()}><Chip tone={v.lang === 'EN' ? 'sea' : 'neutral'}>{v.lang}</Chip></td>
                      <td style={{ ...td(), textAlign: 'right', fontFamily: T.num }}>{v.view}</td>
                      <td style={{ ...td(), textAlign: 'right', fontFamily: T.num, color: T.pine, fontWeight: 600 }}>+{v.sent.toFixed(2)}</td>
                      <td style={{ ...td(), textAlign: 'right', color: T.muted, fontFamily: T.num }}>{v.days}日</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>

            <Card title="いま話題になっている言葉" action={<a style={linkSm()}>もっと見る{Ico.chev}</a>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {keywords.map((k) =>
                <div key={k.kw} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 12, color: T.ink2 }}>
                          {k.kw}{k.orig && <span style={{ color: T.muted, fontWeight: 400, marginLeft: 4 }}>· {k.orig}</span>}
                        </span>
                        <span style={{ fontSize: 11, fontFamily: T.num, color: T.muted }}>{k.cnt.toLocaleString()}</span>
                      </div>
                      <div style={{ marginTop: 3 }}>
                        <Bar value={k.cnt} max={5000} color={k.delta >= 0 ? T.navy2 : T.faint} />
                      </div>
                    </div>
                    <span style={{
                    fontSize: 10.5, fontFamily: T.num, fontWeight: 600, minWidth: 36, textAlign: 'right',
                    color: k.delta >= 0 ? T.pine : T.bad
                  }}>{k.delta >= 0 ? '+' : ''}{k.delta}%</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppFrame>);

}

function btn() {
  return {
    height: 32, padding: '0 12px', borderRadius: 6, border: `1px solid ${T.line}`,
    background: T.card, color: T.body, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: T.sans,
    whiteSpace: 'nowrap', flex: '0 0 auto'
  };
}
function btnDark() {
  return { ...btn(), background: T.ink, color: '#fff', border: `1px solid ${T.ink}` };
}
function th(w, align = 'left') {
  return { padding: '8px 14px', textAlign: align, width: w, fontWeight: 500 };
}
function td() {
  return { padding: '10px 14px', color: T.body, verticalAlign: 'middle' };
}
function linkSm() {
  return { color: T.body, fontSize: 11, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 2 };
}

Object.assign(window, { ScreenDashboard, btn, btnDark, th, td, linkSm });