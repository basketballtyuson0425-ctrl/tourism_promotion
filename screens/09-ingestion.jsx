// 09 — データ収集: ジョブ管理 / 取得ステータス
function ScreenIngestion() {
  const jobs = [
    { id: 'JOB-001', name: '伊勢志摩 / 5市場対象言語', q: 'Ise Shima / 中国語・韓国語・英語', sched: '30分ごと', last: '2分14秒前', hits: 1284, st: 'running',  qta: 78 },
    { id: 'JOB-002', name: '伊勢神宮 / 多言語',       q: '伊勢神宮 / 多言語',        sched: '30分ごと', last: '2分14秒前', hits:  842, st: 'running',  qta: 78 },
    { id: 'JOB-003', name: '英虞湾 / 自然景観',       q: '英虞湾 / 賢島',               sched: '30分ごと', last: '2分14秒前', hits:  314, st: 'running',  qta: 78 },
    { id: 'JOB-004', name: '海女文化 / 体験',         q: '海女 / 真珠',       sched: '1時間ごと',last: '14分前',  hits:  148, st: 'running',  qta: 78 },
    { id: 'JOB-005', name: '松阪牛 / 食文化',         q: '松阪牛',                  sched: '1時間ごと',last: '14分前',  hits:  121, st: 'running',  qta: 78 },
    { id: 'JOB-006', name: '比較: 広島県（宮島）',    q: '比較: 宮島 / 厳島神社 / 海上鳥居',       sched: '1日1回',   last: '7時間前', hits: 2460, st: 'paused',   qta: 0  },
    { id: 'JOB-007', name: '比較: 海外向け動画発信数', q: '宮島 / 伊勢志摩 / 対象市場言語',         sched: '1日1回',   last: '7時間前', hits: 1380, st: 'paused',   qta: 0  },
    { id: 'JOB-008', name: '夫婦岩 / Short動画特化',  q: '夫婦岩 / 短い動画のみ',                    sched: '30分ごと', last: '2分14秒前', hits:   88, st: 'error',    qta: 78 },
  ];

  const usage = [
    { l: '将来のAPI利用想定', cur: 0, max: 10000, unit: 'ユニット/日' },
    { l: '翻訳の使用量',          cur: 412,  max: 1000,  unit: '千文字/日' },
    { l: 'AI評価の使用量',      cur: 38.9, max: 100,   unit: '千回/日' },
    { l: '保存しているデータ量',        cur: 142,  max: 500,   unit: 'GB' },
  ];

  const events = [
    { dt: '09:42:14', lvl: 'info',  msg: 'サンプルデータ「5市場対象言語」を画面に反映しました' },
    { dt: '09:42:09', lvl: 'info',  msg: 'サンプルデータ「伊勢神宮 / 多言語」を画面に反映しました' },
    { dt: '09:41:42', lvl: 'warn',  msg: 'YouTube API連携は将来の改善案として扱っています' },
    { dt: '09:38:01', lvl: 'info',  msg: 'コメントの評価が完了: 1,284 件 / 平均 71点 (ホメられている)' },
    { dt: '09:35:24', lvl: 'info', msg: '今回の提出デモでは外部APIへの接続は行いません' },
    { dt: '09:32:18', lvl: 'info',  msg: '翻訳が完了: 412 コメント (英語: 286, 中国語: 84, 韓国語: 42)' },
    { dt: '09:30:00', lvl: 'info',  msg: '画面確認用のサンプルデータを読み込みました (8 件)' },
  ];

  return (
    <AppFrame>
      <Sidebar active="ingestion" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['つかう', 'データ準備']}
          title="サンプルデータの管理"
          subtitle="提出デモ用のサンプルデータを表示しています · API連携は今後の改善案です"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.spark} サンプル条件を追加</button>
            <button style={btnDark()}>{Ico.play} すべて今すぐ動かす</button>
          </div>}
        />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: 18, background: T.paper, overflow: 'hidden' }}>
          {/* Status banner */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 12 }}>
            <div style={{
              background: T.ink, color: '#fff', borderRadius: 10, padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999, background: 'rgba(91, 194, 138, 0.18)', color: '#5bc28a',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>{Ico.check}</div>
              <div>
                <div style={{ fontSize: 11, color: T.muted }}>システム稼働</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>正常に動いています — 1 件だけ確認してください</div>
                <div style={{ fontSize: 10.5, color: T.muted, marginTop: 2 }}>
                  最後の更新 9:42 / 次回更新は手動
                </div>
              </div>
            </div>
            {[
              { l: '表示中のサンプル条件', v: '6', sub: '/ 8 中' },
              { l: '今日 取り込んだ件数',  v: '5,627', sub: '動画 + コメント' },
              { l: 'うまくいかなかった',  v: '1',     sub: 'この24時間' },
            ].map(c => (
              <div key={c.l} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 11, color: T.muted }}>{c.l}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                  <Num value={c.v} size={20} />
                  <span style={{ fontSize: 10.5, color: T.muted }}>{c.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 12, flex: 1, minHeight: 0 }}>
            {/* Jobs table */}
            <Card title="サンプル条件の一覧" padding={0} action={
              <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
                <Chip tone="pine">● 動作中 6</Chip>
                <Chip tone="neutral">⏸ 止めている 2</Chip>
                <Chip tone="shu">⚠ 要確認 1</Chip>
              </div>
            }>
              <div style={{ overflow: 'auto', height: '100%' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: T.paper, color: T.muted, fontSize: 10.5, position: 'sticky', top: 0 }}>
                      <th style={th()}>条件名</th>
                      <th style={th(120)}>検索する言葉</th>
                      <th style={th(70)}>動かす間隔</th>
                      <th style={th(80, 'right')}>累計</th>
                      <th style={th(70)}>いま</th>
                      <th style={th(40)} />
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(j => (
                      <tr key={j.id} style={{ borderTop: `1px solid ${T.line2}` }}>
                        <td style={td()}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              width: 6, height: 6, borderRadius: 999,
                              background: j.st === 'running' ? '#5bc28a' : j.st === 'error' ? T.shu : T.faint,
                              boxShadow: j.st === 'running' ? '0 0 5px #5bc28a' : 'none',
                            }} />
                            <div style={{ minWidth: 0 }}>
                              <div style={{ color: T.ink, fontWeight: 500 }}>{j.name}</div>
                              <div style={{ color: T.muted, fontSize: 10, fontFamily: T.mono }}>{j.id} · 前回 {j.last}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ ...td(), fontFamily: T.mono, fontSize: 10.5, color: T.body, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200, whiteSpace: 'nowrap' }}>{j.q}</td>
                        <td style={{ ...td(), color: T.muted, fontSize: 11 }}>{j.sched}</td>
                        <td style={{ ...td(), textAlign: 'right', fontFamily: T.num }}>{j.hits.toLocaleString()}</td>
                        <td style={td()}>
                          {j.st === 'running' && <Chip tone="pine">● 動作中</Chip>}
                          {j.st === 'paused'  && <Chip tone="neutral">⏸ 止めている</Chip>}
                          {j.st === 'error'   && <Chip tone="shu">⚠ 要確認</Chip>}
                        </td>
                        <td style={{ ...td(), textAlign: 'right', color: T.muted }}>{Ico.more}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Right: usage + events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
              <Card title="今日の使用量 (上限まで)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {usage.map(u => {
                    const pct = (u.cur / u.max) * 100;
                    const warn = pct > 75;
                    return (
                      <div key={u.l}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}>
                          <span style={{ color: T.ink2 }}>{u.l}</span>
                          <span style={{ fontFamily: T.num, color: T.body }}>
                            <span style={{ color: warn ? T.shu : T.ink, fontWeight: 600 }}>{u.cur.toLocaleString()}</span>
                            <span style={{ color: T.muted }}> / {u.max.toLocaleString()} {u.unit}</span>
                          </span>
                        </div>
                        <Bar value={u.cur} max={u.max} color={warn ? T.shu : T.navy2} />
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="動いた記録" action={<a style={linkSm()}>すべて{Ico.chev}</a>} padding={0} style={{ flex: 1, minHeight: 0 }}>
                <div style={{ overflow: 'auto', maxHeight: 280 }}>
                  {events.map((e, i) => (
                    <div key={i} style={{
                      padding: '8px 14px', borderTop: i ? `1px solid ${T.line2}` : 'none',
                      display: 'flex', gap: 10, fontSize: 11.5, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontFamily: T.mono, fontSize: 10.5, color: T.muted, flex: '0 0 auto', width: 56 }}>{e.dt}</span>
                      <span style={{
                        flex: '0 0 auto', width: 42,
                        color: e.lvl === 'error' ? T.shu : e.lvl === 'warn' ? T.warn : T.muted,
                        fontSize: 9.5, fontFamily: T.mono, textTransform: 'uppercase', fontWeight: 700, paddingTop: 2,
                      }}>{e.lvl}</span>
                      <span style={{ color: T.body, lineHeight: 1.5 }}>{e.msg}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenIngestion });
