// 08 — レポートビルダー / 出力履歴
function ScreenReports() {
  const templates = [
    { name: '議会向け資料', desc: '表紙 + まとめ + グラフ + 提言', sec: 12, pages: 18, tag: '公式', tone: 'shu' },
    { name: '月次のまとめ',  desc: '主要な数字 / 人気動画 / 課題一覧',   sec:  8, pages:  6, tag: '毎月', tone: 'sea' },
    { name: '他地域との比べ', desc: '伊勢志摩 × 人気観光地 3エリア',     sec:  6, pages:  4, tag: '分析', tone: 'pine' },
    { name: '報道関係者向け',   desc: '英語版 / グラフを大きく',       sec:  9, pages:  8, tag: 'PR',  tone: 'neutral' },
  ];

  const history = [
    { dt: '2026-05-15 09:24', name: '2026年5月 月次のまとめ', tpl: '月次のまとめ', by: '清野', fmt: 'PDF',  pages: 6,  size: '1.8MB', st: 'completed' },
    { dt: '2026-05-12 16:08', name: '5月 議会報告 v2',  tpl: '議会向け資料', by: '清野', fmt: 'PPTX', pages: 18, size: '12.4MB', st: 'completed' },
    { dt: '2026-05-09 11:42', name: '台湾向けPR資料',    tpl: '報道関係者向け',     by: '佐々木', fmt: 'PDF',  pages: 10, size: '4.2MB', st: 'completed' },
    { dt: '2026-05-18 09:50', name: '5月 議会報告 v3 (作成中)', tpl: '議会向け資料', by: '清野', fmt: 'PPTX', pages: 18, size: '—',     st: 'running' },
    { dt: '2026-05-02 14:18', name: '白馬・ニセコと比べる',   tpl: '他地域との比べ',     by: '清野', fmt: 'PDF',  pages: 4,  size: '0.9MB', st: 'completed' },
  ];

  const sections = [
    { ttl: '表紙',                       inc: true,  src: '自動' },
    { ttl: '要点まとめ (3行)',           inc: true,  src: 'AIが自動作成 (確認推奨)' },
    { ttl: '主要な数字のハイライト',     inc: true,  src: '今週のあらまし画面' },
    { ttl: 'いま伸びている動画',         inc: true,  src: '旅行者の動画一覧' },
    { ttl: 'ホメられている魅力ポイント', inc: true,  src: '動画詳細 × 5本分' },
    { ttl: '他地域との比べ',             inc: true,  src: '他の観光地と比べる画面' },
    { ttl: 'スポットごとの言及マップ',   inc: false, src: '伊勢志摩の地図画面' },
    { ttl: 'これからの打ち手 (提言)',    inc: true,  src: '担当者が記入' },
    { ttl: '元データ (別添)',            inc: true,  src: 'Excelで自動添付' },
  ];

  return (
    <AppFrame>
      <Sidebar active="reports" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['つかう', '資料をつくる']}
          title="資料をつくる"
          subtitle="議会や関係者へ渡す資料が、ボタン1つで作れます"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.spark} 新しいひな型をつくる</button>
            <button style={btnDark()}>{Ico.download} これで作成</button>
          </div>}
        />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 14, padding: 16, background: T.paper, overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
            {/* Templates */}
            <Card title="ひな型を選ぶ">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {templates.map((t, i) => (
                  <div key={t.name} style={{
                    border: `1.5px solid ${i === 0 ? T.shu : T.line}`,
                    background: i === 0 ? T.shuSoft : T.paper,
                    borderRadius: 8, padding: 12, cursor: 'pointer',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <Chip tone={t.tone}>{t.tag}</Chip>
                      {i === 0 && <Chip tone="shu">✓ 選択中</Chip>}
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: T.body, marginTop: 5, lineHeight: 1.5, minHeight: 30 }}>{t.desc}</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 8, fontSize: 10.5, color: T.muted, fontFamily: T.num }}>

                      <span>·</span>
                      <span>~{t.pages} ページ</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section editor */}
            <Card title="資料に入るページの中身 — 議会向け資料" action={<a style={linkSm()}>並びを変える{Ico.chev}</a>}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {sections.map((s, i) => (
                  <div key={s.ttl} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '9px 4px',
                    borderTop: i ? `1px solid ${T.line2}` : 'none', opacity: s.inc ? 1 : 0.5,
                  }}>
                    <span style={{ fontFamily: T.num, fontSize: 11, color: T.muted, width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{
                      width: 16, height: 16, borderRadius: 4, flex: '0 0 auto',
                      background: s.inc ? T.pine : T.card, border: `1.4px solid ${s.inc ? T.pine : T.faint}`,
                      color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>{s.inc ? Ico.check : null}</span>
                    <span style={{ fontSize: 12, color: T.ink2, flex: 1 }}>{s.ttl}</span>
                    <Chip tone="neutral">{s.src}</Chip>
                    <span style={{ color: T.muted, cursor: 'grab' }}>⋮⋮</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Output history */}
            <Card title="これまで作った資料 (この30日)" padding={0}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: T.paper, color: T.muted, fontSize: 10.5 }}>
                    <th style={th(140)}>作成日時</th>
                    <th style={th()}>資料名</th>
                    <th style={th(140)}>ひな型</th>
                    <th style={th(60)}>担当</th>
                    <th style={th(80)}>形式</th>
                    <th style={th(80)}>状態</th>
                    <th style={th(40)} />
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${T.line2}` }}>
                      <td style={{ ...td(), fontFamily: T.num, color: T.muted, fontSize: 11 }}>{h.dt}</td>
                      <td style={td()}><span style={{ color: T.ink, fontWeight: 500 }}>{h.name}</span></td>
                      <td style={{ ...td(), color: T.muted }}>{h.tpl}</td>
                      <td style={td()}>{h.by}</td>
                      <td style={td()}>
                        <Chip tone={h.fmt === 'PDF' ? 'sea' : 'pine'}>{h.fmt} {h.pages}p · {h.size}</Chip>
                      </td>
                      <td style={td()}>
                        {h.st === 'completed'
                          ? <Chip tone="pine">✓ 作成済み</Chip>
                          : <Chip tone="shu">● 作成中 (62%)</Chip>}
                      </td>
                      <td style={{ ...td(), textAlign: 'right' }}><span style={{ color: T.muted }}>{Ico.more}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Right: Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
            <Card title="出来上がりイメージ (1 / 18ページ)" action={
              <div style={{ display: 'flex', gap: 4 }}>
                <button style={iconBtnSm()}>‹</button>
                <button style={iconBtnSm()}>›</button>
              </div>
            }>
              <div style={{
                aspectRatio: '1/1.414', background: '#fff', border: `1px solid ${T.line}`,
                borderRadius: 4, padding: '18px 18px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ fontSize: 9, color: T.muted, letterSpacing: 1 }}>三重県観光推進課 / 2026 年 5 月</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>
                  伊勢志摩 観光のあらまし<br />2026年5月レポート
                </div>
                <Placeholder label="表紙の写真" height={70} accent={T.navy2} />
                <div style={{ fontSize: 8.5, color: T.body, lineHeight: 1.6 }}>
                  YouTubeに投稿された海外からの旅行者の動画 1,284 本・コメント 38,910 件をまとめ、伊勢志摩への誘客の打ち手を整理しました。
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Placeholder label="主な数字" height={36} accent={T.shu} />
                  <Placeholder label="のびしろ" height={36} accent={T.pine} />
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 8, color: T.muted, borderTop: `1px solid ${T.line2}`, paddingTop: 6 }}>
                  伊勢観光分析 · 株式会社KIYONO · 2026年5月18日 9:50 作成
                </div>
              </div>
            </Card>

            <Card title="出し方の設定">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                {[
                  ['ファイル形式', ['PowerPoint', 'PDF', 'Word']],
                  ['期間', ['2026年5月1日 〜 5月31日']],
                  ['言語', ['日本語', '英語版も同時に作る']],
                  ['送り先', ['観光推進課 12 名']],
                ].map(([k, vs]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10.5, color: T.muted, marginBottom: 4 }}>{k}</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {vs.map((v, i) => (
                        <Chip key={v} tone={i === 0 ? 'ink' : 'neutral'} active={i === 0}>{v}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
                <button style={{ ...btnDark(), marginTop: 6, justifyContent: 'center', width: '100%', height: 36 }}>
                  {Ico.download} PowerPointで作成 (約 45秒)
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function iconBtnSm() {
  return {
    width: 24, height: 24, borderRadius: 4, border: `1px solid ${T.line}`,
    background: T.card, color: T.body, cursor: 'pointer', fontSize: 12,
  };
}

Object.assign(window, { ScreenReports, iconBtnSm });

