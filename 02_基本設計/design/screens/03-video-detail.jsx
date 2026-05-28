// 03 — 動画詳細: コメント感情・地名抽出・キーフレーム
function ScreenVideoDetail() {
  const chapters = [
    { t: '00:00', label: 'オープニング — 鳥羽駅着' },
    { t: '01:42', label: '伊勢神宮 外宮' },
    { t: '04:18', label: '内宮 参道 / 五十鈴川' },
    { t: '07:55', label: 'おかげ横丁 食べ歩き' },
    { t: '10:32', label: '海女小屋 — 体験' },
    { t: '12:48', label: '英虞湾サンセット' },
  ];

  const comments = [
    { u: 'sara_k.', t: '伊勢の神域の森の静けさは、どこでも体験したことがないものでした。本当の静寂。', orig: 'The sacred forest at Ise is unlike anywhere I have been. Pure silence.', s: 0.92, loc: '伊勢神宮', lang: 'EN', flag: '🇬🇧', topic: '神域体験' },
    { u: 'kenji.travels', t: '海女小屋の体験、来年家族で行く予定です！情報ありがとうございます。', orig: '', s: 0.81, loc: '海女小屋', lang: 'JP', flag: '🇯🇵', topic: '海女体験' },
    { u: 'wanderlu_', t: '英虞湾クルーズはどう予約しました？英語の予約サイトがどこにも見つからず…', orig: 'How did you book the Ago Bay cruise? Couldn\'t find it in English anywhere…', s: 0.04, loc: '英虞湾', lang: 'EN', flag: '🇺🇸', issue: true, topic: '予約・英語対応' },
    { u: '林思婷', t: '英虞湾の夕日が本当に美しい。次のハネムーンは絶対伊勢志摩へ行きたい。', orig: '英虞灣的夕陽真的太美，下次蜜月一定要去伊勢志摩。', s: 0.88, loc: '英虞湾', lang: 'ZH', flag: '🇹🇼', topic: '英虞湾・夕景' },
    { u: 'mark.j', t: '名古屋からの電車は簡単だったけど、現地のバスの時刻表がとにかくわかりにくかった。', orig: 'Train from Nagoya was easy but the local bus schedule was confusing.', s: -0.32, loc: '交通', lang: 'EN', flag: '🇨🇦', issue: true, topic: '二次交通' },
    { u: 'matcha.lover', t: 'おかげ横丁で食べた赤福もち—人生が変わる美しさ。', orig: 'Akafuku mochi at Okage Yokocho — life changing.', s: 0.86, loc: 'おかげ横丁', lang: 'EN', flag: '🇦🇺', topic: '食べ歩き' },
  ];

  // YouTube風 コメントトピック — クラスタリング結果
  const topics = [
    { name: '神域体験・静けさ',     n: 412, pct: 64, tone: 'pine', sample: '「朝の内宮は周りの音が消えるような静寂」' },
    { name: '海女体験・もてなし',   n: 188, pct: 52, tone: 'shu',  sample: '「海女さんと話せたのが今回の旅のハイライト」' },
    { name: '食事・赤福・牡蠣',         n: 156, pct: 48, tone: 'sea',  sample: '「赤福もちを起きりて食べるためだけにも伊勢へ行く価値がある」' },
    { name: '英虞湾・クルーズや夜景',  n:  98, pct: 36, tone: 'sea',  sample: '「英虞湾のサンセットクルーズが完壁な一日の締めくくり」' },
    { name: '予約・英語対応の課題',   n:  41, pct: 12, tone: 'shu',  sample: '「予約サイトがどこにも見つからず電話した」', issue: true },
    { name: '交通・アクセス',         n:  68, pct: 18, tone: 'shu',  sample: '「バスの時刻表が読めなかった」', issue: true },
  ];

  const places = [
    { name: '伊勢神宮 内宮',      mentions: 142, lang: { EN: 88, JP: 41, ZH: 13 } },
    { name: 'おかげ横丁',         mentions:  96, lang: { EN: 52, JP: 38, ZH: 6  } },
    { name: '英虞湾 / 賢島',      mentions:  74, lang: { EN: 48, JP: 18, ZH: 8  } },
    { name: '海女小屋(相差)',     mentions:  41, lang: { EN: 33, JP: 5,  ZH: 3  } },
    { name: '夫婦岩',             mentions:  28, lang: { EN: 19, JP: 6,  ZH: 3  } },
  ];

  return (
    <AppFrame>
      <Sidebar active="video-detail" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          breadcrumbs={['旅行者の動画', '動画の中身を見る']}
          title="他では味わえない、伊勢神宮の特別な空気"
          subtitle="@WanderTales · 2026年5月6日公開 · 14分32秒 · 原題: Why Ise Jingu felt unlike any shrine in Japan"
          right={<div style={{ display: 'flex', gap: 6 }}>
            <button style={btn()}>{Ico.globe} 表示: 日本語</button>
            <button style={btn()}>{Ico.pin} あとで見るため保存</button>
            <button style={btn()}>{Ico.ext} YouTubeで開く</button>
            <button style={btnDark()}>{Ico.sparkle} この動画をサッと要約</button>
          </div>}
        />
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, padding: 16, background: T.paper, overflow: 'hidden' }}>
          {/* Left: player + timeline + chapters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <div style={{
              background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                position: 'relative', aspectRatio: '16/9',
                background: `linear-gradient(160deg, ${T.navy} 0%, ${T.shu2} 110%)`,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(135deg, transparent 0 10px, rgba(255,255,255,0.04) 10px 20px)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 999, background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.4)',
                  }}>{Ico.play}</div>
                </div>
                <div style={{
                  position: 'absolute', bottom: 10, left: 12, right: 12, color: '#fff',
                }}>
                  <div style={{ fontSize: 11, fontFamily: T.mono, opacity: 0.85 }}>CH 02 · 04:18 / 14:32</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>内宮 参道 / 五十鈴川</div>
                </div>
              </div>
              {/* Timeline w/ sentiment heatstrip */}
              <div style={{ padding: '10px 14px 12px' }}>
                <div style={{ fontSize: 10.5, color: T.muted, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                  <span>コメントと字幕を合わせた 「評価の色マップ」</span>
                  <span style={{ fontFamily: T.num }}>04:18 ▸ 14:32</span>
                </div>
                <div style={{ display: 'flex', height: 14, borderRadius: 4, overflow: 'hidden', border: `1px solid ${T.line}` }}>
                  {[0.7,0.8,0.6,0.9,0.85,0.5,-0.2,0.6,0.7,0.88,0.92,0.7,0.4,0.6,0.7,0.85,0.9,-0.1,0.7,0.88,0.92,0.7,0.8,0.9,0.85,0.6,0.5,0.7,0.88,0.92].map((v, i) => (
                    <div key={i} style={{
                      flex: 1,
                      background: v > 0.5 ? `oklch(0.55 0.12 ${150 + (1-v)*30})` : v > 0 ? `oklch(0.75 0.06 90)` : `oklch(0.55 0.16 30)`,
                    }} />
                  ))}
                </div>
                <div style={{
                  position: 'relative', height: 20, marginTop: 4, fontSize: 10, fontFamily: T.num, color: T.muted,
                }}>
                  {['00:00','03:00','06:00','09:00','12:00','14:32'].map((t, i, a) => (
                    <span key={t} style={{ position: 'absolute', left: (i/(a.length-1))*100 + '%', transform: 'translateX(-50%)' }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* Chapters */}
              <div style={{ borderTop: `1px solid ${T.line2}`, padding: '4px 0' }}>
                {chapters.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '7px 14px',
                    background: i === 2 ? T.paper : 'transparent', fontSize: 12,
                    borderLeft: i === 2 ? `2px solid ${T.shu}` : '2px solid transparent',
                  }}>
                    <span style={{ fontFamily: T.num, color: T.muted, width: 42 }}>{c.t}</span>
                    <span style={{ color: T.ink2, flex: 1 }}>{c.label}</span>
                    {i === 2 && <Chip tone="shu">▶ 再生中</Chip>}
                  </div>
                ))}
              </div>
            </div>

            {/* AI summary card */}
            <div style={{
              background: T.card, border: `1px solid ${T.line}`, borderRadius: 10, padding: 14,
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: T.shu }}>{Ico.sparkle}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>AI が見つけた 「この動画の魅力」</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 10.5, color: T.muted }}>字幕と音声を AI が分析</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { ttl: '神域の静寂と空気感', q: '「unlike anywhere I have been」', tone: 'pine' },
                  { ttl: '海女文化のドラマ性',  q: '「meeting real ama divers...」',  tone: 'sea'  },
                  { ttl: '英虞湾の夕景',        q: '「sunset over the bay was...」',  tone: 'shu'  },
                ].map(b => (
                  <div key={b.ttl} style={{
                    background: T.paper, borderRadius: 8, padding: 10, border: `1px solid ${T.line}`,
                  }}>
                    <Chip tone={b.tone}>魅力ポイント</Chip>
                    <div style={{ fontSize: 12, color: T.ink, fontWeight: 500, marginTop: 6 }}>{b.ttl}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 4, fontStyle: 'italic' }}>コメント例: {b.q}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: comments + places */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            <Card title="よく話されている話題トップ" action={<span style={{ fontSize: 10.5, color: T.muted }}>699 件のコメントを 6 つのテーマでグループ化</span>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {topics.map((tp, i) => (
                  <div key={tp.name} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                    borderRadius: 6, background: i === 0 ? T.paper : 'transparent',
                    border: i === 0 ? `1px solid ${T.line}` : '1px solid transparent', cursor: 'pointer',
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 5, flex: '0 0 auto',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: tp.issue ? T.shuSoft : T.seaSoft, color: tp.issue ? T.shu : T.navy2,
                      fontSize: 11, fontWeight: 700, fontFamily: T.num,
                    }}>{String(i + 1).padStart(2, '0')}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 12.5, color: T.ink, fontWeight: 500 }}>{tp.name}</span>
                        {tp.issue && <Chip tone="shu">⚠ 不満・課題</Chip>}
                        <span style={{ flex: 1 }} />
                        <span style={{ fontFamily: T.num, fontSize: 11, color: T.muted }}>{tp.n} 件 · {tp.pct}%</span>
                      </div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 2, lineHeight: 1.45,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{tp.sample}</div>
                      <div style={{ marginTop: 4 }}>
                        <Bar value={tp.pct} max={100} color={tp.issue ? T.shu : T.navy2} height={3} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="個別のコメント (自動で日本語に訳しています)" action={
              <div style={{ display: 'flex', gap: 4, fontSize: 11 }}>
                <Chip tone="ink" active>すべて</Chip>
                <Chip tone="pine">ホメられている 412</Chip>
                <Chip tone="neutral">ふつう 188</Chip>
                <Chip tone="shu">不満 41</Chip>
              </div>
            } padding={0}>
              <div style={{ overflow: 'auto', maxHeight: 220 }}>
                {comments.map((c, i) => (
                  <div key={i} style={{ padding: '11px 14px', borderTop: i ? `1px solid ${T.line2}` : 'none', display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 16, lineHeight: 1 }}>{c.flag}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.muted, flexWrap: 'wrap' }}>
                        <span style={{ color: T.ink2, fontWeight: 500 }}>{c.u}</span>
                        <Chip tone="neutral">{c.lang}</Chip>
                        <Chip tone={c.s > 0.5 ? 'pine' : c.s < 0 ? 'shu' : 'neutral'}>
                          {c.s > 0.5 ? 'ホメられている' : c.s < 0 ? '不満' : 'ふつう'}
                        </Chip>
                        <Chip tone="sea">📍 {c.loc}</Chip>
                        {c.issue && <Chip tone="shu">⚠ 要対応</Chip>}
                      </div>
                      <div style={{ fontSize: 12.5, color: T.ink2, marginTop: 5, lineHeight: 1.5 }}>{c.t}</div>
                      {c.orig && (
                        <div style={{ fontSize: 10.5, color: T.muted, marginTop: 3, lineHeight: 1.4, fontStyle: 'italic' }}>
                          原文: {c.orig}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="動画中で名前が出た場所">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {places.map(p => (
                  <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: T.shu }}>{Ico.pin}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, color: T.ink2 }}>{p.name}</span>
                        <span style={{ fontFamily: T.num, fontSize: 11, color: T.muted }}>{p.mentions} 回話題に</span>
                      </div>
                      <div style={{ display: 'flex', height: 4, marginTop: 4, borderRadius: 99, overflow: 'hidden', background: T.line2 }}>
                        <div style={{ flex: p.lang.EN, background: T.navy2 }} />
                        <div style={{ flex: p.lang.JP, background: T.shu }} />
                        <div style={{ flex: p.lang.ZH, background: T.pine }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{
                  display: 'flex', gap: 12, fontSize: 10.5, color: T.muted,
                  paddingTop: 8, marginTop: 4, borderTop: `1px solid ${T.line2}`,
                }}>
                  <span><span style={{ width: 8, height: 8, background: T.navy2, display: 'inline-block', borderRadius: 2, marginRight: 4 }} />英語</span>
                  <span><span style={{ width: 8, height: 8, background: T.shu,   display: 'inline-block', borderRadius: 2, marginRight: 4 }} />日本語</span>
                  <span><span style={{ width: 8, height: 8, background: T.pine,  display: 'inline-block', borderRadius: 2, marginRight: 4 }} />英語</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenVideoDetail });
