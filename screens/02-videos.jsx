// 02 — UGC 動画一覧 / 検索
function ScreenVideos() {
  const videos = [
    { ttl: '他では味わえない、伊勢神宮の特別な空気',          orig: 'Why Ise Jingu felt unlike any shrine in Japan', ch: '@WanderTales',  view: '1.42M', like: '64K', sent: 0.88, lang: 'EN', dur: '14:32', date: '2026-05-06', tags: ['伊勢神宮','神域の森','Vlog'], saved: true },
    { ttl: '伊勢志摩で食べた牡蠣がやばすぎた【海女小屋体験】',          orig: '',                                                ch: 'タビノオト',     view: '986K',  like: '38K', sent: 0.82, lang: 'JP', dur: '11:08', date: '2026-05-15', tags: ['海女','牡蠣','鳥羽'] },
    { ttl: '英虞湾サンセットクルーズ｜2泊3日リゾート',                  orig: '',                                                ch: 'タビ寿司',         view: '742K',  like: '29K', sent: 0.76, lang: 'JP', dur: '18:47', date: '2026-04-20', tags: ['英虞湾','クルーズ','リゾート'], saved: true },
    { ttl: '伊勢神宮 早朝参拝 vlog | 4K シネマティック',           orig: 'Ise Jingu early-morning visit vlog | 4K cinematic', ch: '@kyotomood',    view: '631K',  like: '24K', sent: 0.71, lang: 'EN', dur: '09:24', date: '2026-05-09', tags: ['伊勢神宮','シネマティック'] },
    { ttl: '松阪牛を初めて食べてみた',                            orig: 'Trying Matsusaka Beef for the first time',         ch: '@AbroadInJapan',view: '512K',  like: '21K', sent: 0.69, lang: 'EN', dur: '12:55', date: '2026-04-07', tags: ['松阪牛','食文化'] },
    { ttl: '海女さんと潜る伊勢志摩の真珠ダイビング',           orig: 'Diving with ama — Pearl diving in Ise-Shima',     ch: '@coastline.tv', view: '438K',  like: '19K', sent: 0.84, lang: 'EN', dur: '15:11', date: '2026-05-12', tags: ['海女','真珠','ドキュメンタリー'] },
    { ttl: 'おかげ横丁 食べ歩き11品｜伊勢',                       orig: '',                                                ch: 'うちごはん日和',  view: '312K',  like: '14K', sent: 0.74, lang: 'JP', dur: '08:46', date: '2026-05-02', tags: ['おかげ横丁','食べ歩き','街歩き'] },
    { ttl: '夫婦岩で日の出',                                  orig: 'Sunrise at Meoto Iwa',                            ch: '@dawnchasers',   view: '284K',  like: '12K', sent: 0.66, lang: 'EN', dur: '06:12', date: '2026-04-29', tags: ['夫婦岩','日の出'] },
    { ttl: '伊勢志摩 旅ブログ ｜ 東京から電車で',                  orig: 'Ise-Shima travel vlog from Tokyo by train',       ch: '@yumi.travels',  view: '198K',  like: '9K',  sent: 0.62, lang: 'EN', dur: '22:03', date: '2026-05-10', tags: ['旅程','電車旅'] },
  ];

  const filterGroups = [
    { ttl: 'いつの動画か', items: [['この1週間',0],['この1ヶ月',0],['この3ヶ月',1],['この1年',0]] },
    { ttl: '対象市場の言語', items: [['英語',1],['中国語(繁体)',1],['中国語(簡体)',1],['韓国語',1],['広東語表現',0]] },
    { ttl: 'どんな魅力が出てくるか', items: [['神社・神道',1],['食べ物',1],['自然・海',1],['宿泊・リゾート',0],['街歩き',0],['伝統工芸',0]] },
    { ttl: '動画の種類', items: [['旅ブログ',1],['ショート動画',1],['ドキュメンタリー',1],['紹介・レビュー',0]] },
    { ttl: '評価の色', items: [['ホメられている',1],['ふつう',1],['不満・課題',0]] },
    { ttl: '見られた回数', items: [['10万以上',1],['50万以上',0],['100万以上',0]] },
  ];

  return (
    <AppFrame>
      <Sidebar active="videos" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="旅行者の動画 一覧"
          subtitle="1,284 本の動画を集めています · この1年間"
          breadcrumbs={['見る', '旅行者の動画']}
          right={
            <div style={{ display: 'flex', gap: 6 }}>
              <button style={btn()}>{Ico.tag} タグの管理</button>
              <button style={btnDark()}>{Ico.download} Excelで保存</button>
            </div>
          }
        />
        <div style={{ flex: 1, display: 'flex', minHeight: 0, background: T.paper }}>
          {/* Filters rail */}
          <div style={{
            width: 220, flex: '0 0 auto', borderRight: `1px solid ${T.line}`,
            padding: '14px 16px', overflow: 'auto', background: T.card,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.ink }}>期間やテーマで絞る</span>
              <a style={{ fontSize: 11, color: T.shu, cursor: 'pointer' }}>全て解除</a>
            </div>
            {filterGroups.map(g => (
              <div key={g.ttl} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: T.muted, letterSpacing: 0.3, marginBottom: 6, fontWeight: 500 }}>{g.ttl}</div>
                {g.items.map(([label, on]) => (
                  <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '3px 0', fontSize: 12, color: T.body, cursor: 'pointer' }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: 3, border: `1.4px solid ${on ? T.navy2 : T.faint}`,
                      background: on ? T.navy2 : T.card, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}>{on ? Ico.check : null}</span>
                    {label}
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0, padding: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Search bar */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{
                flex: 1, height: 36, display: 'flex', alignItems: 'center', gap: 8,
                background: T.card, border: `1px solid ${T.line}`, borderRadius: 8, padding: '0 12px',
              }}>
                <span style={{ color: T.muted }}>{Ico.search}</span>
                <span style={{ fontSize: 13, color: T.ink2 }}>伊勢神宮 または 英虞湾</span>
                <span style={{ flex: 1 }} />
                <Chip tone="sea">英語字幕あり</Chip>
                <Chip tone="shu">ホメられているもののみ</Chip>
                <Chip tone="neutral">この3ヶ月</Chip>
              </div>
              <div style={{
                display: 'flex', background: T.card, border: `1px solid ${T.line}`, borderRadius: 8, padding: 3, fontSize: 12,
              }}>
                <div style={{ padding: '4px 10px', borderRadius: 5, background: T.ink, color: '#fff' }}>サムネイル</div>
                <div style={{ padding: '4px 10px', borderRadius: 5, color: T.body }}>一覧表</div>
                <div style={{ padding: '4px 10px', borderRadius: 5, color: T.body }}>地図上に</div>
              </div>
              <div style={{
                height: 36, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 10px',
                background: T.card, border: `1px solid ${T.line}`, borderRadius: 8, fontSize: 12, color: T.body,
              }}>並べ替え: 人気上昇順 {Ico.chev}</div>
            </div>

            {/* Result count */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 12, color: T.muted }}>
              <span><Num value="412" size={14} weight={600} /> 本を表示 / 全 1,284 本中</span>
              <span>·</span>
              <span>うち <span style={{ color: T.pine, fontWeight: 600 }}>よく見られている動画 18 本</span></span>
              <span style={{ flex: 1 }} />
              <span>1ページに 9 件表示</span>
            </div>

            {/* Grid */}
            <div style={{
              flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '1fr',
              gap: 12, overflow: 'hidden',
            }}>
              {videos.map((v, i) => (
                <div key={i} style={{
                  background: T.card, border: `1px solid ${T.line}`, borderRadius: 10,
                  display: 'flex', flexDirection: 'column', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'relative', aspectRatio: '16/8',
                    background: `linear-gradient(135deg, ${[T.navy, T.shu, T.sea, T.pine, T.gold, T.navy2, T.shu2, T.sea, T.navy][i]}, ${T.ink2})`,
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `repeating-linear-gradient(135deg, transparent 0 8px, rgba(255,255,255,0.04) 8px 16px)`,
                    }} />
                    <div style={{
                      position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.55)',
                      color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 3, fontFamily: T.mono,
                    }}>{v.lang}</div>
                    <div style={{
                      position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.65)',
                      color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 3, fontFamily: T.num,
                    }}>{v.dur}</div>
                    {v.saved && (
                      <div style={{
                        position: 'absolute', top: 6, right: 6, background: T.shu,
                        color: '#fff', width: 22, height: 22, borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}>{Ico.pin}</div>
                    )}
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 999, background: 'rgba(255,255,255,0.18)',
                        backdropFilter: 'blur(6px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                      }}>{Ico.play}</div>
                    </div>
                  </div>
                  <div style={{ padding: 11, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 12.5, color: T.ink, fontWeight: 500, lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{v.ttl}</div>
                    {v.orig && (
                      <div style={{ fontSize: 10.5, color: T.muted, marginTop: 3, lineHeight: 1.4,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>原題: {v.orig}</div>
                    )}
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{v.ch} · {v.date.slice(5)}</div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 7, flexWrap: 'wrap' }}>
                      {v.tags.slice(0, 3).map(t => <Chip key={t} tone="neutral">#{t}</Chip>)}
                    </div>
                    <div style={{ flex: 1 }} />
                    <div style={{
                      marginTop: 10, paddingTop: 9, borderTop: `1px solid ${T.line2}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: T.body,
                    }}>
                      <span style={{ fontFamily: T.num }}>{v.view} 回見られた</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: 999,
                          background: v.sent > 0.7 ? T.pine : v.sent > 0.4 ? T.gold : T.bad,
                        }} />
                        <span style={{ fontFamily: T.num, fontWeight: 600, color: T.ink2 }}>+{v.sent.toFixed(2)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

Object.assign(window, { ScreenVideos });
