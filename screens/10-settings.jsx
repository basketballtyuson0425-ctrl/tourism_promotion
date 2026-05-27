// 10 — 設定: メンバー / 将来連携 / アラート / 表示
function ScreenSettings() {
  const members = [
    { name: '鈴木 春樹',   role: '管理者',     dept: '三重県観光推進課',         last: '2分前',    init: 'SH', col: T.navy2 },
    { name: '佐々木 みお', role: '編集できる',     dept: '三重県観光推進課',         last: '昨日',     init: 'SM', col: T.pine },
    { name: '田中 雅彦',   role: '編集できる',     dept: '伊勢市役所 観光振興課',    last: '3日前',    init: 'TM', col: T.shu },
    { name: '山口 茜',     role: '見るだけ',   dept: '志摩市役所',               last: '1週間前',  init: 'YA', col: T.gold },
    { name: '伊勢志摩 観光協会', role: '見るだけ', dept: '外部',                last: '5日前',    init: 'IK', col: T.sea },
  ];

  return (
    <AppFrame>
      <Sidebar active="settings" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['つかう', '設定']}
          title="設定"
          subtitle="メンバー / お知らせ / 連携 / 表示 / データ保管期間"
        />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0, background: T.paper, overflow: 'hidden' }}>
          {/* Sub-nav */}
          <div style={{ padding: '16px 12px', borderRight: `1px solid ${T.line}`, background: T.card, fontSize: 12.5 }}>
            {[
              ['組織・メンバー', true],
              ['お知らせ・通知', false],
              ['プログラム連携用のかぎ', false],
              ['他システムとの連携', false],
              ['画面の見せ方', false],
              ['データの保存期間', false],
              ['操作の記録 (監査)', false],
              ['請求・契約', false],
            ].map(([l, on]) => (
              <div key={l} style={{
                padding: '8px 12px', borderRadius: 6, cursor: 'pointer',
                background: on ? T.paper : 'transparent',
                color: on ? T.ink : T.body, fontWeight: on ? 600 : 400,
                borderLeft: on ? `2px solid ${T.shu}` : '2px solid transparent',
              }}>{l}</div>
            ))}
          </div>

          <div style={{ padding: 22, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Org card */}
            <div style={{
              background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 18,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, background: `linear-gradient(135deg, ${T.shu}, ${T.navy})`,
                color: '#fff', fontSize: 20, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>⛩</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>三重県観光推進課</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                  契約プラン: 自治体スタンダード · 12 名分を利用中 (上限 20 名)
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <Chip tone="pine">✓ シングルサインオン有効</Chip>
                  <Chip tone="sea">✓ 二段階認証必須</Chip>
                  <Chip tone="neutral">操作の記録 5 年保管</Chip>
                </div>
              </div>
              <button style={btn()}>組織情報を編集</button>
            </div>

            {/* Members */}
            <Card title="このシステムを使う人 (5名)" action={
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={btn()}>{Ico.search} 名前で探す</button>
                <button style={btnDark()}>+ 新しく招待する</button>
              </div>
            } padding={0}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: T.paper, color: T.muted, fontSize: 10.5 }}>
                    <th style={th()}>メンバー</th>
                    <th style={th(180)}>所属</th>
                    <th style={th(120)}>できること</th>
                    <th style={th(100)}>前回ログイン</th>
                    <th style={th(40)} />
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m.name} style={{ borderTop: `1px solid ${T.line2}` }}>
                      <td style={td()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 999, background: m.col, color: '#fff',
                            fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.num, fontWeight: 600,
                          }}>{m.init}</div>
                          <span style={{ color: T.ink, fontWeight: 500 }}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{ ...td(), color: T.body }}>{m.dept}</td>
                      <td style={td()}>
                        <Chip tone={m.role === '管理者' ? 'shu' : m.role === '編集者' ? 'sea' : 'neutral'}>{m.role}</Chip>
                      </td>
                      <td style={{ ...td(), color: T.muted, fontSize: 11 }}>{m.last}</td>
                      <td style={{ ...td(), textAlign: 'right', color: T.muted }}>{Ico.more}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Alerts preview + integrations grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card title="どんなときにお知らせするか">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                  {[
                    { l: 'ホメられている割合が急に下がったとき', on: true,  ch: 'メール + Slack' },
                    { l: '新しい不満・課題が出てきたとき', on: true,  ch: 'メール' },
                    { l: '10万回以上 見られた動画が出たとき',     on: true,  ch: 'メール + Slack + Teams' },
                    { l: '今日の使用量が 80% を超えたとき',     on: true,  ch: 'メール' },
                    { l: 'サンプルデータの更新確認が必要なとき',       on: false, ch: '—' },
                  ].map(a => (
                    <div key={a.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Toggle on={a.on} />
                      <span style={{ flex: 1, color: a.on ? T.ink : T.muted }}>{a.l}</span>
                      <span style={{ fontSize: 10.5, color: T.muted }}>{a.ch}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="他システムとの連携">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { name: 'YouTube API (今後の連携候補)', st: 'disconnected', meta: '本提出デモでは未接続' },
                    { name: 'Slack',           st: 'connected', meta: 'チャンネル: #観光推進_お知らせ' },
                    { name: 'Microsoft Teams',  st: 'connected', meta: '伊勢志摩観光チーム' },
                    { name: 'Google Drive',     st: 'connected', meta: '/レポート/2026' },
                    { name: 'Power BI',          st: 'disconnected', meta: '—' },
                    { name: 'BigQuery (データ基盤)',         st: 'disconnected', meta: '—' },
                  ].map(i => (
                    <div key={i.name} style={{
                      border: `1px solid ${T.line}`, borderRadius: 8, padding: 10,
                      background: i.st === 'connected' ? T.card : T.paper,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: T.ink, fontWeight: 500 }}>{i.name}</span>
                        {i.st === 'connected'
                          ? <Chip tone="pine">✓</Chip>
                          : <Chip tone="neutral">つながっていない</Chip>}
                      </div>
                      <div style={{ fontSize: 10.5, color: T.muted, marginTop: 4 }}>{i.meta}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Display + retention */}
            <Card title="画面の見せ方・運用ルール">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { l: '「ホメられている」と判定する基準', v: '70%', sub: 'これ以上を緑色で表示' },
                  { l: '1動画あたりのコメント確認目安', v: '500',   sub: '将来API連携する場合の想定値です' },
                  { l: 'データの保存期間',               v: '5 年',   sub: '監査の要件に合わせています' },
                  { l: '画面ひらいた時の初期期間',       v: '3 ヶ月',  sub: '画面ひらいた時に表示される期間' },
                  { l: '使っている翻訳サービス',       v: 'DeepL',  sub: 'うまくいかない時は Google で代替' },
                  { l: '時刻の表示',                     v: '日本時間',  sub: ''},
                ].map(s => (
                  <div key={s.l} style={{ padding: 12, border: `1px solid ${T.line}`, borderRadius: 8, background: T.paper }}>
                    <div style={{ fontSize: 11, color: T.muted }}>{s.l}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, fontFamily: T.num, marginTop: 4 }}>{s.v}</div>
                    <div style={{ fontSize: 10.5, color: T.muted, marginTop: 4 }}>{s.sub}</div>
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

function Toggle({ on }) {
  return (
    <span style={{
      width: 30, height: 18, borderRadius: 999, background: on ? T.pine : T.faint,
      display: 'inline-block', position: 'relative', flex: '0 0 auto',
    }}>
      <span style={{
        position: 'absolute', top: 2, left: on ? 14 : 2, width: 14, height: 14, borderRadius: 999, background: '#fff',
      }} />
    </span>
  );
}

Object.assign(window, { ScreenSettings, Toggle });
